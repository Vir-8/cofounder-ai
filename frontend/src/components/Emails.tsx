"use client";
import React, { useState } from "react";
import { RefreshCw } from "lucide-react";

interface EmailContent {
  subject?: string;
  body?: string;
}

interface EmailsProps {
  email?: EmailContent;
  regen: (type: string, keywords: string[]) => Promise<void>;
}

export default function Emails({ email, regen }: EmailsProps) {
  const [showEmail, setShowEmail] = useState(false); // Toggle to show the generated email
  const [userInput, setUserInput] = useState(""); // Input for keywords
  const [isRegenerating, setIsRegenerating] = useState(false); // Regenerate loading state

  // When the user clicks "Generate Email"
  const handleGenerateClick = () => {
    setShowEmail(true);
  };

  // Regenerate action with provided keywords
  const handleRegenerateClick = async () => {
    setIsRegenerating(true); // Set loading state
    try {
      const keywords = userInput.split(",").map((word) => word.trim()); // Convert user input into a keywords array
      await regen("email", keywords); // Call regen with type and keywords
    } catch (error) {
      console.error("Error during regeneration:", error);
    } finally {
      setIsRegenerating(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center bg-[#131619] text-white p-6">
      {!showEmail ? (
        // HERO-STYLE SECTION: prompt user for input + proceed
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            AI Email Creation
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Enter a few keywords or phrases and let our AI craft a compelling
            email for you.
          </p>

          {/* User input box */}
          <div className="mb-6">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter keywords (e.g., marketing, growth, engagement)"
              className="w-full md:w-96 px-4 py-2 bg-[#2E3238] text-white rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-600
                         placeholder-gray-400 text-base"
            />
          </div>

          {/* Button to proceed */}
          <button
            onClick={handleGenerateClick}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold
                       px-6 py-3 rounded-md transition-colors shadow-md"
          >
            Generate Email
          </button>
        </div>
      ) : (
        // AFTER CLICK: show generated email (subject & body) + “Regenerate” button
        <div className="w-full max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-4 text-center">
            Your AI-Generated Email
          </h1>

          {/* Subject Block */}
          <div className="mb-4 bg-[#2E3238] p-4 rounded-md transition-colors hover:bg-[#383C43] focus-within:bg-[#383C43]">
            <h4 className="text-sm font-semibold text-gray-200 mb-1">
              Subject
            </h4>
            <p className="text-sm text-gray-300">
              {email?.subject || "Subject not available"}
            </p>
          </div>

          {/* Body Block */}
          <div className="bg-[#2E3238] p-4 rounded-md transition-colors hover:bg-[#383C43] focus-within:bg-[#383C43]">
            <h4 className="text-sm font-semibold text-gray-200 mb-1">Body</h4>
            <p
              className="text-sm text-gray-300 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: email?.body || "Body not available",
              }}
            ></p>
          </div>

          {/* Regenerate Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleRegenerateClick}
              disabled={isRegenerating}
              className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700
                         text-white text-lg font-semibold px-5 py-3 rounded-md
                         transition-colors shadow-md ${
                           isRegenerating ? "opacity-50 cursor-not-allowed" : ""
                         }`}
            >
              <RefreshCw
                className={`h-5 w-5 ${isRegenerating ? "animate-spin" : ""}`}
              />
              {isRegenerating ? "Regenerating..." : "Regenerate"}
            </button>
          </div>

          {/* Keywords Input (Optional, for re-entering keywords) */}
          <div className="mt-6 text-center">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter new keywords (optional)"
              className="w-full md:w-96 px-4 py-2 bg-[#2E3238] text-white rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-600
                         placeholder-gray-400 text-base"
            />
          </div>
        </div>
      )}
    </div>
  );
}
