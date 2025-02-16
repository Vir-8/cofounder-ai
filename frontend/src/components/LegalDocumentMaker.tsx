"use client";

import React, { useState, useEffect, useRef } from "react";

type Template = {
  locked_html: string;
  placeholders: string[];
};

type Suggestion = {
  type: string;
  content: string;
  display: string;
};

const LegalDocumentMaker: React.FC = () => {
  const [templates, setTemplates] = useState<{ id: string; name: string }[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [templateContent, setTemplateContent] = useState<string>("");
  const [editorContent, setEditorContent] = useState<string>("");
  const [userDetails, setUserDetails] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [analysis, setAnalysis] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const editorRef = useRef<HTMLDivElement>(null);

  // Dummy templates for demonstration; replace with a backend fetch if desired.
  useEffect(() => {
    const dummyTemplates = [
      { id: "nda", name: "Non-Disclosure Agreement" },
      { id: "loan", name: "Loan Template" },
      { id: "leave_and_license", name: "Leave and License Template" },
      { id: "employment", name: "Employment Template" },
      { id: "consultancy", name: "Consultancy Template" },
    ];
    setTemplates(dummyTemplates);
  }, []);

  // Fetch a template from the backend when one is selected.
  const handleTemplateChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id = e.target.value;
    setSelectedTemplateId(id);
    if (id) {
      try {
        const res = await fetch(`http://localhost:5000/template/${id}`);
        if (!res.ok) throw new Error("Failed to fetch template");
        const data: Template = await res.json();
        setTemplateContent(data.locked_html);
        setEditorContent(data.locked_html);
        if (editorRef.current) {
          editorRef.current.innerHTML = data.locked_html;
        }
      } catch (error) {
        console.error("Error fetching template", error);
      }
    }
  };

  // Handle editor changes and fetch suggestions.
  const handleEditorInput = async () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText;
      setEditorContent(text);
      const cursorPos = text.length; // Simplified approach
      try {
        const res = await fetch("http://localhost:5000/suggest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, cursorPos }),
        });
        if (!res.ok) throw new Error("Failed to fetch suggestions");
        const data: Suggestion[] = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    }
  };

  // Analyze the document via the backend.
  const handleAnalyzeDocument = async () => {
    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: editorContent,
          templateId: selectedTemplateId,
          // Optionally, include userDetails if needed.
        }),
      });
      if (!res.ok) throw new Error("Failed to analyze document");
      const data = await res.json();
      setEditorContent(data.filled_content);
      if (editorRef.current) {
        editorRef.current.innerHTML = data.filled_content;
      }
      setAnalysis(data.analysis);
    } catch (error) {
      console.error("Error analyzing document", error);
    }
  };

  // Generate a PDF via the backend.
  const handleGeneratePDF = async () => {
    try {
      const res = await fetch("http://localhost:5000/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: editorContent }),
      });
      if (!res.ok) throw new Error("Failed to generate PDF");
      const data = await res.json();
      setPdfUrl(`http://localhost:5000${data.url}`);
    } catch (error) {
      console.error("Error generating PDF", error);
    }
  };

  // Append suggestion text to the editor.
  const applySuggestion = (suggestion: string) => {
    if (editorRef.current) {
      editorRef.current.innerText += suggestion;
      handleEditorInput();
    }
  };

  return (
    <div className="w-full h-screen p-8 bg-[#131619] text-gray-100">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Legal Document Maker</h1>
      </header>

      <div className="mb-4">
        <select
          value={selectedTemplateId}
          onChange={handleTemplateChange}
          className="w-full p-3 rounded border border-gray-700 bg-[#16191c] text-gray-200 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Template</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Enter your details here..."
          value={userDetails}
          onChange={(e) => setUserDetails(e.target.value)}
          className="w-full p-3 rounded border border-gray-700 bg-[#16191c] text-gray-200 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>

      {/* Main container with fixed height */}
      <div className="flex flex-col h-[calc(100vh-300px)]">
        <div className="flex h-full gap-4">
          {/* Document Editor Column */}
          <div className="flex-1 flex flex-col border border-gray-700 bg-[#1e2228]">
            <div className="flex-1 overflow-y-auto p-4">
              <div
                className="outline-none"
                contentEditable
                ref={editorRef}
                onInput={handleEditorInput}
              ></div>
            </div>
          </div>

          {/* Sidebar for Suggestions and Analysis */}
          <div className="w-1/3 flex flex-col gap-4 h-full">
            <div className="flex-1 overflow-y-auto bg-[#1e2228] p-4 rounded border border-gray-700">
              <h2 className="text-xl font-semibold mb-2">Suggestions</h2>
              {suggestions.length > 0 ? (
                suggestions.map((sug, index) => (
                  <div
                    key={index}
                    className="cursor-pointer p-2 bg-[#16191c] rounded hover:bg-gray-700 mb-2"
                    onClick={() => applySuggestion(sug.content)}
                  >
                    {sug.display}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No suggestions yet.</p>
              )}
            </div>
            <div className="flex-1 overflow-y-auto bg-[#1e2228] p-4 rounded border border-gray-700">
              <h2 className="text-xl font-semibold mb-2">Analysis</h2>
              {analysis ? (
                analysis.split("\n").map((line, index) => (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No analysis available.</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleAnalyzeDocument}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Analyze Document
          </button>
          <button
            onClick={handleGeneratePDF}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Generate PDF
          </button>
        </div>
      </div>

      {pdfUrl && (
        <div className="mt-4">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default LegalDocumentMaker;
