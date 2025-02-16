import { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);

// Define a more elaborate response schema
// so Gemini returns a single JSON object with
// advertisement, email, and blog content.

const adSchema = {
  type: SchemaType.ARRAY,
  description:
    "An array of 5 engaging, persuasive, and effective advertisements for a given product or service.",
  items: {
    type: SchemaType.OBJECT,
    description:
      "Contains a single advertisement tailored to a specific product or service.",
    properties: {
      headline: {
        type: SchemaType.STRING,
        description:
          "The catchy headline of the advertisement designed to grab attention.",
      },
      body: {
        type: SchemaType.STRING,
        description:
          "The main content or body of the advertisement, providing details about the product or service.",
      },
      callToAction: {
        type: SchemaType.STRING,
        description:
          "A compelling call-to-action encouraging the audience to take a specific action.",
      },
      targetAudience: {
        type: SchemaType.STRING,
        description: "The intended target audience for the advertisement.",
      },
    },
    required: ["headline", "body", "callToAction"], // Ensure these properties are mandatory
  },
};

// API Route handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { company } = req.body;

  // Basic validation
  if (!company) {
    return res
      .status(400)
      .json({ error: "Missing required field: 'company'." });
  }

  try {
    // 1) Create your generative model instance with
    //    the new responseSchema and JSON response format
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: adSchema,
        temperature: 0.8,
        maxOutputTokens: 3000,
      },
    });

    // 2) Create a single prompt that explains exactly
    //    what JSON structure you want from Gemini:

    const adPrompt = `
    Generate 5 engaging, persuasive, and effective advertisements for a company called ${company.companyName}.
    The target audience is ${company.targetAudience}.
    The company's target demographic is ${company.demographic.ageGroup} years old.
    The target audience is based in ${company.demographic.location}, and is interested in ${company.demographic.interests}.
    Each advertisement should include a catchy headline, a persuasive body, and a compelling call-to-action.
    Tailor the advertisements to appeal to the specified audience and encourage engagement.
`;

    // 3) Call model.generateContent with that single prompt
    const result = await model.generateContent(adPrompt);

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
