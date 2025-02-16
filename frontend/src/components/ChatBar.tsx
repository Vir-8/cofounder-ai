"use client";

import React, { useState } from "react";
import { MessageSquare } from "lucide-react"; // Install via: npm install lucide-react
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Initialize the generative AI client using your API key.
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY as string
);

// Create the generative model with the desired configuration.
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "text/plain",
    temperature: 0.8,
    maxOutputTokens: 3000,
  },
});

type Message = {
  role: "user" | "assistant";
  text: string;
};

const Chatbar: React.FC = () => {
  const [chatbarOpen, setChatbarOpen] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = { role: "user", text: inputText.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      // Modify the prompt to orient the response toward detailed business advice.
      const prompt = `You are a seasoned business consultant. Keep response a maximum of 10 lines to the following query: ${userMessage.text}`;
      const response = await model.generateContent(prompt);
      
      // Extract the generated text from the response.
      let text = response.response.text().trim();

      // If the text is wrapped in quotes, remove them.
      if (text.startsWith('"') && text.endsWith('"')) {
        text = text.substring(1, text.length - 1).trim();
      }

      // If the response appears to be a JSON string, try to parse and extract the "response" property.
      if (text.startsWith("{") && text.endsWith("}")) {
        try {
          const parsed = JSON.parse(text);
          if (parsed.response) {
            text = parsed.response.trim();
          }
        } catch (err) {
          console.error("Error parsing response JSON:", err);
        }
      }

      const assistantMessage: Message = { role: "assistant", text };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error generating message:", error);
      const errorMessage: Message = {
        role: "assistant",
        text: "Sorry, I encountered an error.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className={`transition-all duration-300 ${
        chatbarOpen ? "w-96" : "w-16"
      } bg-[#1e2228] border-l border-gray-800 flex flex-col`}
    >
      {chatbarOpen ? (
        <>
          <div className="flex-shrink-0 p-4 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Gemini Chatbot</h2>
            <button
              onClick={() => setChatbarOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              X
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.length === 0 && (
              <div
              className={`p-2 rounded ${
                "bg-blue-600"
              }`}
            >
              <p className="text-sm text-gray-100">Hello! I'm Gemini, your AI assistant. How can I help you today?</p>
            </div>
            )}
            {messages.map((msg, index) => (
              <div key={index}>
                <p className="text-xs text-gray-400">
                  {msg.role === "user" ? "You" : "Gemini"}
                </p>
                <div
                  className={`p-2 rounded ${
                    msg.role === "user" ? "bg-gray-700" : "bg-blue-600"
                  }`}
                >
                  <p className="text-sm text-gray-100">{msg.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div>
                <p className="text-xs text-gray-400">Gemini is typing...</p>
              </div>
            )}
          </div>
          <div className="flex-shrink-0 p-4 border-t border-gray-700">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-2 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      ) : (
        <div className="flex h-full items-start justify-center pt-4">
          <button
            onClick={() => setChatbarOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <MessageSquare className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbar;
