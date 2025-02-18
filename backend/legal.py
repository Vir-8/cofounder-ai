import os
import logging
import re
from datetime import datetime
from typing import List, Dict, Optional, Any
from dataclasses import dataclass
from flask import Flask, request, jsonify, send_from_directory, session
from fpdf import FPDF
from pathlib import Path
import unicodedata
from difflib import SequenceMatcher
import google.generativeai as genai
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)  # Allows cross-origin requests from your NextJS frontend
app.secret_key = os.urandom(24)  # Required for session management

# Define base directory and necessary folders
BASE_DIR = Path(__file__).resolve().parent
DIRS = ['output', 'legal_templates']
for directory in DIRS:
    Path(BASE_DIR / directory).mkdir(exist_ok=True)

EXTERNAL_TEMPLATE_FOLDER = BASE_DIR / 'legal_templates'

# Configure Gemini API
GEMINI_API_KEY = "gemini_key"
genai.configure(api_key=GEMINI_API_KEY)

GENERATION_CONFIG = {
    "temperature": 0.3,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
}

@dataclass
class UserDetails:
    name: str
    company: str
    role: str
    email: str
    jurisdiction: str

class LegalDocumentDrafter:
    def __init__(self, external_template_folder: Path):
        self.external_template_folder = external_template_folder
        self.templates = self.load_templates()
        self.model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",  # Using Flash model
            generation_config=GENERATION_CONFIG
        )
        self.chat_session = self.model.start_chat(history=[])
        self.document_versions = {}
        
        # Enhanced legal phrases with context
        self.legal_phrases = {
            "conf": {
                "text": "Confidentiality clause",
                "context": "Standard NDA confidentiality provisions"
            },
            "term": {
                "text": "Termination clause",
                "context": "Contract termination conditions"
            },
            "gov": {
                "text": "Governing law clause",
                "context": "Jurisdiction and applicable law"
            },
            "def": {
                "text": "Definitions section",
                "context": "Key terms and interpretations"
            },
            "ip": {
                "text": "Intellectual property clause",
                "context": "IP rights and ownership"
            }
        }

        # Predefined legal clauses
        self.legal_clauses = {
            "confidentiality": """
                CONFIDENTIALITY CLAUSE
                The Receiving Party agrees to maintain strict confidentiality of all Confidential Information 
                disclosed by the Disclosing Party and shall not disclose such information to any third party 
                without prior written consent.
            """,
            "termination": """
                TERMINATION CLAUSE
                Either party may terminate this Agreement with thirty (30) days written notice. 
                All confidentiality obligations survive termination.
            """,
            "ip_rights": """
                INTELLECTUAL PROPERTY RIGHTS
                All intellectual property rights, including but not limited to patents, copyrights, 
                and trade secrets, remain the exclusive property of the Disclosing Party.
            """,
            "jurisdiction": """
                GOVERNING LAW
                This Agreement shall be governed by and construed in accordance with the laws of [jurisdiction]. 
                Any disputes shall be resolved in the courts of [jurisdiction].
            """
        }

    def clean_text(self, text: str) -> str:
        """Remove special characters and normalize text"""
        cleaned = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode()
        cleaned = re.sub(r'[^\x00-\x7F]+', '', cleaned)
        return cleaned.strip()

    def load_templates(self) -> Dict[str, Dict]:
        templates = {}
        try:
            if self.external_template_folder.exists():
                for file_path in self.external_template_folder.glob('*.txt'):
                    try:
                        content = file_path.read_text(encoding='utf-8')
                        template_id = file_path.stem
                        parsed = self.parse_template(content)
                        templates[template_id] = {
                            'id': template_id,
                            'name': template_id.replace('_', ' ').title(),
                            'content': content,
                            'locked_html': parsed['locked_html'],
                            'placeholders': parsed['placeholders']
                        }
                    except Exception as e:
                        logger.error(f"Error loading template {file_path}: {e}")
        except Exception as e:
            logger.error(f"Error accessing template directory: {e}")
        return templates

    def parse_template(self, content: str) -> Dict:
        placeholders = re.findall(r'\[(.*?)\]|_{5,}', content)
        locked_html = re.sub(r'\[(.*?)\]', 
                           r'<span class="editable" data-ph="\1">[\1]</span>', 
                           content)
        locked_html = re.sub(r'_{5,}', 
                           r'<span class="editable" data-ph="blank">__________</span>', 
                           locked_html)
        return {
            'locked_html': locked_html,
            'placeholders': list(set(placeholder for placeholder in placeholders if placeholder))
        }

    def get_user_additions(self, original: str, current: str) -> str:
        """Identify text added by user compared to original template"""
        matcher = SequenceMatcher(None, original, current)
        additions = []
        for tag, i1, i2, j1, j2 in matcher.get_opcodes():
            if tag == "insert":
                additions.append(current[j1:j2])
        return "".join(additions)

    def get_suggestions(self, text: str, cursor_pos: int) -> List[Dict]:
        """Generate suggestions based on text context"""
        try:
            cleaned_text = self.clean_text(text)
            start = max(0, cursor_pos - 50)
            end = min(len(cleaned_text), cursor_pos + 50)
            context = cleaned_text[start:end]
            suggestion_prompt = (
                f"Based on the text context: '{context}', "
                "suggest three improvements or completions as short phrases."
            )
            response = self.model.generate_content(suggestion_prompt)
            suggestions = [line.strip() for line in response.text.splitlines() if line.strip()]
            return [{
                'type': 'Suggestion',
                'content': suggestion,
                'display': f"💡 {suggestion}"
            } for suggestion in suggestions[:3]]
        except Exception as e:
            logger.error(f"Suggestion error: {e}")
            return []

    def fill_placeholders(self, text: str, user_details: str) -> Dict[str, Any]:
        """Fill in placeholders using Gemini AI and provide analysis"""
        try:
            prompt = f"""
            Using the following user information:
            {user_details}

            Fill in ALL placeholders (marked with [Placeholder] or _____) in this document with appropriate, realistic content.
            Also analyze the document for any potential issues.

            Document:
            {text}

            Respond in this exact format:
            FILLED_DOCUMENT:
            (document with all placeholders filled)

            ANALYSIS:
            1. Missing Elements:
            2. Legal Concerns:
            3. Suggestions:
            """
            
            response = self.model.generate_content(prompt)
            parts = response.text.split('ANALYSIS:')
            
            filled_document = parts[0].replace('FILLED_DOCUMENT:', '').strip()
            analysis = parts[1].strip() if len(parts) > 1 else "No analysis available"
            
            return {
                'filled_content': filled_document,
                'analysis': analysis
            }
        except Exception as e:
            logger.error(f"Error filling placeholders: {e}")
            return {'filled_content': text, 'analysis': str(e)}

    def analyze_document(self, text: str, user_details: Optional[str] = None, 
                         original_template: str = "") -> Dict:
        """
        Analyze document by filling in placeholders using provided user details.
        """
        filled_content = self.fill_placeholders(text, user_details)
        return {"filled_content": filled_content}

    def generate_analysis_summary(self, categories: Dict[str, List[str]]) -> str:
        """Create a combined summary from the categories"""
        summary = ""
        if categories.get('critical'):
            summary += "🔴 Missing Critical Clauses:\n" + "\n".join(categories['critical']) + "\n\n"
        if categories.get('jurisdiction'):
            summary += "⚖️ Jurisdiction Issues:\n" + "\n".join(categories['jurisdiction']) + "\n\n"
        if categories.get('clarity'):
            summary += "📝 Clarity Issues:\n" + "\n".join(categories['clarity']) + "\n\n"
        if categories.get('risk'):
            summary += "⚠️ Risk Factors:\n" + "\n".join(categories['risk']) + "\n\n"
        if categories.get('formatting'):
            summary += "🖼️ Formatting Issues:\n" + "\n".join(categories['formatting']) + "\n\n"
        return summary.strip() if summary else "No significant issues detected."

    def save_version(self, text: str, user_details: Optional[UserDetails] = None) -> str:
        """Save document version with metadata"""
        version_id = datetime.now().strftime('%Y%m%d_%H%M%S')
        self.document_versions[version_id] = {
            'content': text,
            'timestamp': datetime.now().isoformat(),
            'user': user_details.__dict__ if user_details else {},
            'changes': self.get_user_additions(
                self.document_versions[max(self.document_versions.keys())]['content'] 
                if self.document_versions else "",
                text
            )
        }
        return version_id

# ---------------------- API Endpoints ----------------------

@app.route('/template/<id>', methods=['GET'])
def get_template(id):
    template = drafter.templates.get(id)
    if not template:
        return jsonify({'error': 'Template not found'}), 404
    return jsonify({
        'locked_html': template['locked_html'],
        'placeholders': template['placeholders']
    })

@app.route('/suggest', methods=['POST'])
def suggest():
    data = request.get_json()
    suggestions = drafter.get_suggestions(data['text'], data['cursorPos'])
    return jsonify(suggestions)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    template = drafter.templates.get(data.get('templateId', ''))
    original = template['content'] if template else data['text']
    result = drafter.fill_placeholders(original, "")
    return jsonify(result)

@app.route('/generate-pdf', methods=['POST'])
def generate_pdf():
    try:
        text = request.json['text']
        cleaned_text = drafter.clean_text(text)
        
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.multi_cell(0, 10, cleaned_text)
        
        filename = f"document_{datetime.now().strftime('%Y%m%d%H%M%S')}.pdf"
        output_path = BASE_DIR / 'output' / filename
        pdf.output(output_path)
        
        return jsonify({'url': f'/download-pdf/{filename}'})
    except Exception as e:
        logger.error(f"PDF generation error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/download-pdf/<filename>', methods=['GET'])
def download_pdf(filename):
    return send_from_directory(BASE_DIR / 'output', filename)

@app.route('/save-user-details', methods=['POST'])
def save_user_details():
    try:
        data = request.get_json()
        details = data.get('details', '')
        session['user_details'] = details
        return jsonify({'status': 'success'})
    except Exception as e:
        logger.error(f"Error saving user details: {e}")
        return jsonify({'error': str(e)}), 400

@app.route('/get-versions', methods=['GET'])
def get_versions():
    versions = [
        {
            'id': vid,
            'timestamp': data['timestamp'],
            'user': data['user'],
            'changes': data['changes']
        }
        for vid, data in drafter.document_versions.items()
    ]
    return jsonify(versions)

@app.route('/get-version/<version_id>', methods=['GET'])
def get_version(version_id):
    if version_id in drafter.document_versions:
        return jsonify(drafter.document_versions[version_id])
    return jsonify({'error': 'Version not found'}), 404

# ------------------ Initialize Drafter & Default Template ------------------

# Initialize the drafter instance
drafter = LegalDocumentDrafter(EXTERNAL_TEMPLATE_FOLDER)

# Create a default template if none exist
if not list(EXTERNAL_TEMPLATE_FOLDER.glob('*.txt')):
    default_template = EXTERNAL_TEMPLATE_FOLDER / 'nda.txt'
    default_template.write_text("""NON-DISCLOSURE AGREEMENT
Between [Company Name]_____ ("Disclosing Party") and [Recipient Name]_____ ("Receiving Party")

1. [Confidentiality]_____: The Receiving Party agrees to maintain the confidentiality of all disclosed information.
2. [Term]_____: This agreement shall remain in effect for [Number]_____ years.
3. [Governing Law]_____: This agreement shall be governed by the laws of [State/Country]_____. 
4. [IP Rights]_____: All intellectual property rights remain with the Disclosing Party.
5. [Termination]_____: Either party may terminate this agreement with [Notice Period]_____ written notice.
""")

if __name__ == '__main__':
    # Run the backend service on port 5000
    app.run(debug=True, host='0.0.0.0', port=5000)
