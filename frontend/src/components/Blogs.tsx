"use client";
import React, { useState, useEffect } from "react";

// The shape of your blog data
interface Blog {
  idea: string; // The blog topic or idea
  content: string; // The detailed content for the blog
}

type BlogArray = Blog[];

// Props for our Blogs component
interface BlogsProps {
  blog?: BlogArray;
  gen?: (keywords?: string[]) => Promise<BlogArray>;
}

export default function Blogs({ blog, gen }: BlogsProps) {
  const [showBlogs, setShowBlogs] = useState(false); // Toggle for showing blog ideas
  const [userInput, setUserInput] = useState(""); // Keywords input
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null); // Selected blog
  const [loading, setLoading] = useState(false); // Loader state
  const [generatedBlogs, setGeneratedBlogs] = useState<BlogArray | null>(null); // Generated blog content

  // Automatically select the first blog by default
  useEffect(() => {
    if (generatedBlogs && generatedBlogs.length > 0 && !selectedBlog) {
      setSelectedBlog(generatedBlogs[0]);
    }
  }, [generatedBlogs, selectedBlog]);

  // Handle Generate Blogs button click
  const handleGenerateClick = async () => {
    if (!gen) return;
    setLoading(true); // Show loader
    try {
      const result = await gen(userInput.split(",").map((kw) => kw.trim())); // Call gen with parsed keywords
      setGeneratedBlogs(result); // Set generated blogs
      setShowBlogs(true); // Show the blog ideas section
    } catch (error) {
      console.error("Error generating blogs:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Handle blog selection
  const handleSelectBlog = (blog: Blog) => {
    setSelectedBlog(blog);
  };

  return (
    <div className="flex flex-col w-full bg-[#131619] text-white p-6">
      {!showBlogs ? (
        // HERO SECTION
        <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            AI Blog Topic Ideas
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Enter a few keywords or phrases, and our AI will propose engaging
            blog topics.
          </p>

          {/* Input for keywords */}
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter your keywords here..."
            className="w-full md:w-96 px-4 py-2 bg-[#2E3238] text-white rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-600
                       placeholder-gray-400 text-base mb-6"
          />

          {/* Generate Blogs Button */}
          <button
            onClick={handleGenerateClick}
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold
                       px-6 py-3 rounded-md transition-colors shadow-md ${
                         loading ? "opacity-50 cursor-not-allowed" : ""
                       }`}
          >
            {loading ? "Generating..." : "Generate Blogs"}
          </button>
        </div>
      ) : (
        // BLOG IDEAS AND CONTENT SECTION
        <div className="flex flex-1 flex-col">
          {/* Title / Instructions */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-1">
              Your AI-Generated Blog Topics
            </h1>
            <p className="text-gray-300 text-sm md:text-base">
              Pick a topic on the left to see details on the right.
            </p>
          </div>

          <div className="flex flex-1 gap-6">
            {/* LEFT COLUMN: BLOG IDEAS LIST */}
            <div className="w-[280px] border-r border-[#2E3238] pr-4 flex flex-col gap-3">
              <h2 className="text-lg font-bold text-gray-200">Blog Ideas</h2>
              {generatedBlogs?.map((blogItem, index) => {
                const isSelected = selectedBlog?.idea === blogItem.idea;
                return (
                  <div
                    key={index}
                    onClick={() => handleSelectBlog(blogItem)}
                    className={`
                      cursor-pointer rounded-md p-3 transition-all
                      ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-[#2E3238] hover:bg-[#383C43] text-gray-300"
                      }
                    `}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {blogItem.idea}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: BLOG CONTENT */}
            <div
              className={`
                flex-1 rounded-md shadow-md p-6 relative
                bg-[#1c1f22] 
                ${selectedBlog ? "border-l-4 border-blue-600 pl-5" : "pl-5 border-l-4 border-transparent"}
              `}
            >
              <h2 className="text-xl font-bold mb-2">Blog Idea</h2>
              {selectedBlog ? (
                <>
                  <p className="text-lg text-gray-300 font-semibold mb-4">
                    {selectedBlog.idea}
                  </p>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {selectedBlog.content}
                  </p>
                </>
              ) : (
                <p className="text-gray-400 italic">
                  No topic selected. Pick one from the list to view details.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
