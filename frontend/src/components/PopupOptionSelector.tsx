"use client";
import React from "react";

interface PopupOptionSelectorProps {
  onSelect: (option: string) => void; // Callback when an option is selected
}

const PopupOptionSelector: React.FC<PopupOptionSelectorProps> = ({
  onSelect,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1c1f22] text-white p-6">
      {/* Main Content Container */}
      <div className="max-w-3xl text-center space-y-8">
        {/* Headline */}
        <h3 className="text-4xl md:text-5xl font-extrabold">
          Ready to Amplify Your Brand?
        </h3>

        {/* Sub-Headline */}
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mx-auto max-w-2xl">
          We’ve captured your business details. Now, tap into AI-driven
          strategies to supercharge your marketing. Choose where you'd like to
          focus first:
        </p>

        {/* Two Big Buttons in the Center */}
        <div className="flex flex-col sm:flex-row gap-6 mt-4 mx-auto w-full max-w-xl">
          <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-xl font-semibold
                       px-6 py-4 rounded-md transition-colors shadow-lg"
            onClick={() => onSelect("content-generator")}
          >
            Content Generator
          </button>
          <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-xl font-semibold
                       px-6 py-4 rounded-md transition-colors shadow-lg"
            onClick={() => onSelect("influencer-marketing")}
          >
            Influencer Marketing
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupOptionSelector;
