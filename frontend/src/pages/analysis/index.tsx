"use client";
import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  FileText,
  Mail,
  PenTool,
  MessageSquare,
} from "lucide-react";
import Popup from "@/components/Popup";
import Advertisements from "@/components/Advertisements";
import Emails from "@/components/Emails";
import Blogs from "@/components/Blogs";
import InfluencerMarketing from "@/components/InfluencerMarketing";
import PopupOptionSelector from "@/components/PopupOptionSelector";
import Dashboard from "@/components/Advertisements";
import ResourceLibrary from "@/components/ResourceLibrary";
import ProgressTracker from "@/components/ProgressTracker";

// Types for generated content
interface GeneratedContent {
  advertisement?: string[];
  email?: { subject?: string; body?: string };
  blog?: { idea: string; content: string }[];
}

export default function EngagementPage() {
  // Popup states
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [fadeOutSecond, setFadeOutSecond] = useState(false);
  const [done, setDone] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Tab and Sidebar state
  const [activeTab, setActiveTab] = useState("content-generator");
  const [sidebarOption, setSidebarOption] = useState("advertisements");

  // Loading state for popup submit
  const [loading, setLoading] = useState(false);

  // Generated content states
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
  const [emailContent, setEmailContent] = useState({ subject: "", body: "" });
  const [blogContent, setBlogContent] = useState<{ idea: string; content: string }[]>([]);

  // Company details from the popup
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    targetAudience: "",
    demographic: {
      ageGroup: "",
      location: "",
      interests: "",
    },
    challenges: [] as string[],
  });

  // Chatbar state (expanded/collapsed)
  const [chatbarOpen, setChatbarOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const generateContent = async (type: string, keywords?: string[]) => {
    try {
      let finalKeywords = keywords ? keywords : ["bold", "catchy"];
      const response = await fetch("/api/generateAllContent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: companyDetails,
          keywords: finalKeywords,
          type,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate content.");
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error("Error in API response: " + (result.error || ""));
      }
      if (type === "combined") {
        setGeneratedContent(result.content);
      } else if (type === "email") {
        setEmailContent(result.content.email);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const generateBlogContent = async (keywords?: string[]) => {
    try {
      let finalKeywords = keywords ? keywords : ["bold", "catchy"];
      const response = await fetch("/api/generateAllContent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: companyDetails,
          keywords: finalKeywords,
          type: "blog",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate content.");
      }
      const result = await response.json();
      return result.content;
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log("Submitted Details:", companyDetails);
    await generateContent("combined");
    setShowSecond(true);
    setShowFirst(false);
    setLoading(false);
  };

  const handleOptionSelect = (option: string) => {
    console.log("User selected:", option);
    setFadeOutSecond(true);
    setTimeout(() => {
      setShowSecond(false);
      setFadeOutSecond(false);
      setActiveTab(option);
      setTimeout(() => setDone(true), 300);
    }, 300);
  };

  const navItems = [
    { id: "advertisements", label: "Dashboard", icon: <FileText className="h-4 w-4" /> },
    { id: "emails", label: "Resource Library", icon: <Mail className="h-4 w-4" /> },
    { id: "blogs", label: "Progress Tracker", icon: <PenTool className="h-4 w-4" /> },
  ];

  return (
    <>
      <Head>
        <title>AI Engagement Platform</title>
        <meta
          name="description"
          content="Enhance audience engagement and conversions using our AI-driven platform."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* OVERLAY POPUPS */}
      {!done && (
        <div className="fixed inset-0 z-50">
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              showFirst ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="bg-[#1c1f22] p-8 rounded-md shadow-2xl">
              <Popup
                onSubmit={handleSubmit}
                companyDetails={companyDetails}
                setCompanyDetails={setCompanyDetails}
                loading={loading}
                onClose={() => setShowFirst(false)}
              />
            </div>
          </div>

          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              showSecond
                ? "opacity-100 scale-100"
                : fadeOutSecond
                ? "opacity-0 scale-95 pointer-events-none"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="bg-[#2E3238]/90 p-8 rounded-md shadow-2xl">
              <PopupOptionSelector onSelect={handleOptionSelect} />
            </div>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT: Two Columns */}
      <div className="flex h-screen bg-[#131619] text-white">
        {/* Left Column: Main Content */}
        <div className="flex-1 flex flex-col">
          {/* NAVBAR */}
          <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-20 py-4 bg-[#111315] shadow-md">
            <div className="flex gap-2 items-center text-xl font-medium">
              <a className="flex gap-2" href="/">
                <Sparkles className="h-8 w-8 text-blue-600" />
                <span className="font-semibold text-white">Co-Founder AI</span>
              </a>
            </div>
            <div className="flex gap-6">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "content-generator"
                    ? "bg-blue-600 text-white"
                    : "bg-transparent hover:bg-[#2E3238] text-gray-200"
                }`}
                onClick={() => setActiveTab("content-generator")}
              >
                Content Generator
              </button>
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "influencer-marketing"
                    ? "bg-blue-600 text-white"
                    : "bg-transparent hover:bg-[#2E3238] text-gray-200"
                }`}
                onClick={() => setActiveTab("influencer-marketing")}
              >
                Influencer Marketing
              </button>
            </div>
          </nav>

          {/* Main content area set as a flex column that fills available space */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            <main className="flex flex-1">
              {activeTab === "content-generator" && (
                <div className="flex w-full">
                  {/* Sidebar + Content Area */}
                  <div className="flex flex-1">
                    {/* Sidebar */}
                    <aside className="min-w-[30vh] bg-[#16191c] h-full border-r border-gray-800">
                      <nav className="p-3">
                        <ul className="space-y-1">
                          {navItems.map((item) => (
                            <li key={item.id}>
                              <button
                                onClick={() => setSidebarOption(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                                  sidebarOption === item.id
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-400 hover:bg-[#1e2023] hover:text-white"
                                }`}
                              >
                                <span
                                  className={`${
                                    sidebarOption === item.id
                                      ? "text-white"
                                      : "text-gray-400 group-hover:text-white"
                                  }`}
                                >
                                  {item.icon}
                                </span>
                                <span className="text-base font-medium">
                                  {item.label}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </aside>

                    {/* Content Section */}
                    <section className="p-6 md:p-8 w-full h-full flex flex-col justify-center">
                      <div className="flex mt-6">
                        {sidebarOption === "advertisements" && <Dashboard />}
                        {sidebarOption === "emails" && <ResourceLibrary />}
                        {sidebarOption === "blogs" && <ProgressTracker />}
                      </div>
                    </section>
                  </div>
                </div>
              )}
              {activeTab === "influencer-marketing" && <InfluencerMarketing />}
            </main>

            {/* Footer fixed at bottom of left column */}
            <footer className="py-4 text-center text-gray-500 text-xs md:text-sm">
              © {new Date().getFullYear()} Co-Founder AI. All rights reserved.
            </footer>
          </div>
        </div>

        {/* Right Column: Chat Panel */}
        <div className={`transition-all duration-300 ${chatbarOpen ? "w-96" : "w-16"} bg-[#1e2228] border-l border-gray-800 flex flex-col`}>
          {chatbarOpen ? (
            <>
              <div className="flex-shrink-0 p-4 border-b border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Gemini Chatbot</h2>
                <button onClick={() => setChatbarOpen(false)} className="text-gray-400 hover:text-white">
                  X
                </button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <p className="text-sm text-gray-300">
                  Hello! I'm Gemini, your AI assistant. How can I help you today?
                </p>
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-400">You</p>
                    <div className="bg-gray-700 p-2 rounded">
                      <p className="text-sm">
                        I'm looking for advice on bootstrapping my startup.
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Gemini</p>
                    <div className="bg-blue-600 p-2 rounded">
                      <p className="text-sm">
                        Try focusing on low-cost marketing strategies and building a community around your product.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 p-4 border-t border-gray-700">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full p-2 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          ) : (
            <div className="flex h-full items-start justify-center pt-4">
              <button onClick={() => setChatbarOpen(true)} className="text-gray-400 hover:text-white">
                <MessageSquare className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
