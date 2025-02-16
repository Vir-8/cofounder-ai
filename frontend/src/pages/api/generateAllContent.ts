import { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);

// Define a more elaborate response schema
// so Gemini returns a single JSON object with
// advertisement, email, and blog content.
const contentSchema = {
  type: SchemaType.OBJECT,
  description:
    "Contains advertisement, email, and blog content for product marketing",
  properties: {
    advertisement: {
      type: SchemaType.ARRAY,
      description: "Array of 4 long, creative advertisements for the product",
      items: {
        type: SchemaType.STRING,
      },
      nullable: false,
    },
    email: {
      type: SchemaType.OBJECT,
      description: "Object containing the email subject and body",
      properties: {
        subject: {
          type: SchemaType.STRING,
          description: "Subject line of the email",
        },
        body: {
          type: SchemaType.STRING,
          description: "Lengthy, detailed content of the email",
        },
      },
      required: ["subject", "body"],
    },
    blog: {
      type: SchemaType.ARRAY,
      description:
        "An array of 3 thorough, lengthy, and complete blogs on a given topic.",
      items: {
        type: SchemaType.OBJECT,
        description:
          "Contains a thorough, lengthy, complete blog on a given topic.",
        properties: {
          idea: {
            type: SchemaType.STRING,
            description: "The blog topic or idea",
          },
          content: {
            type: SchemaType.STRING,
            description: "The blog post content",
          },
        },
        required: ["idea", "content"], // Ensure the required properties are correctly defined
      },
    },
  },
  required: ["advertisement", "email", "blog"],
};

const blogSchema = {
  type: SchemaType.ARRAY,
  description:
    "An array of 3 thorough, lengthy, and complete blogs on a given topic.",
  items: {
    type: SchemaType.OBJECT,
    description:
      "Contains a thorough, lengthy, complete blog on a given topic.",
    properties: {
      idea: {
        type: SchemaType.STRING,
        description: "The blog topic or idea",
      },
      content: {
        type: SchemaType.STRING,
        description: "The blog post content",
      },
    },
    required: ["idea", "content"], // Ensure the required properties are correctly defined
  },
};

const emailSchema = {
  type: SchemaType.OBJECT,
  description: "Contains an email subject and body",
  properties: {
    email: {
      type: SchemaType.OBJECT,
      description: "Object containing the email subject and body",
      properties: {
        subject: {
          type: SchemaType.STRING,
          description: "Subject line of the email",
        },
        body: {
          type: SchemaType.STRING,
          description: "Lengthy, detailed content of the email",
        },
      },
      required: ["subject", "body"],
    },
  },
  required: ["email"],
};

// API Route handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { keywords, company, type } = req.body;

  // Basic validation
  if (!company) {
    return res
      .status(400)
      .json({ error: "Missing required field: 'company'." });
  }

  try {
    // 1) Create your generative model instance with
    //    the new responseSchema and JSON response format
    const schema =
      type === "combined"
        ? contentSchema
        : type === "blog"
          ? blogSchema
          : emailSchema;
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.8,
        maxOutputTokens: 3000,
      },
    });

    // 2) Create a single prompt that explains exactly
    //    what JSON structure you want from Gemini:
    const combinedPrompt = `
    Generate a JSON object with promotional content for our company: ${company.companyName}.
    The target audience is ${company.targetAudience}.

    The company's target demographic is ${company.demographic.ageGroup} years old.
    The target audience is based in ${company.demographic.location}, and is interested in ${company.demographic.interests}.

    It should include:
    - "advertisement": array of 4 long, creative advertisement texts
    - "email": an object with "subject" and lengthy, detailed "body"
    - "blog": an object with "blogIdeas" as an array of 3 ideas

    Only output valid JSON in the exact shape described by the schema. 
    Do not include any extra commentary or explanations.
    `;

    const blogPrompt = `
    Generate 3 thorough, lengthy, complete blog for a company called ${company.companyName}.
    The target audience is ${company.targetAudience}.
    The company's target demographic is ${company.demographic.ageGroup} years old.
    The target audience is based in ${company.demographic.location}, and is interested in ${company.demographic.interests}.

    The specific, important keywords for this blog are: ${keywords}.
    `;

    const emailPrompt = `
    Generate an email for a company called ${company.companyName}.
    The target audience is ${company.targetAudience}.
    The company's target demographic is ${company.demographic.ageGroup} years old.
    The target audience is based in ${company.demographic.location}, and is interested in ${company.demographic.interests}.

    Add spacing between paragraphs and make the email easy to read. Don't add bullet points using asterisks.
    Make it very thorough and complete.

    The specific, very important keywords for this email are: ${keywords}.
    `;

    // 3) Call model.generateContent with that single prompt
    let prompt =
      type === "combined"
        ? combinedPrompt
        : type === "blog"
          ? blogPrompt
          : emailPrompt;
    const result = await model.generateContent(prompt);

    // 4) Parse the returned JSON object
    //    result.response.text() would return a JSON string,
    //    but we can also do result.response.json():
    const contentJSON = JSON.parse(result.response.text());

    return res.status(200).json({
      success: true,
      content: contentJSON,
    });
  } catch (error) {
    console.error("Error generating content:", (error as Error).message);
    return res.status(500).json({
      error: "Failed to generate content. See logs for details.",
    });
  }
}
