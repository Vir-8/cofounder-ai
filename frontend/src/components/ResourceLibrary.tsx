"use client";
import React, { useState } from "react";

type VideoTutorial = {
  topic: string;
  title: string;
  videoUrl: string;
};

type Playbook = {
  stage: string;
  playbook: string;
};

type NicheResource = {
  niche: string;
  resource: string;
};

type CaseStudy = {
  title: string;
  summary: string;
};

type CommunityResource = {
  contributor: string;
  resource: string;
};

type ToolRecommendation = {
  tool: string;
  review: string;
};

const ResourceLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("templates");
  const [templateSearch, setTemplateSearch] = useState<string>("");

  // Content tailored for solo founders
  const documentTemplates: string[] = [
    "Solo Founder Business Plan",
    "Personal Branding Guide",
    "One-Person Pitch Deck",
    "Freelance Contract Template",
    "Budget & Financial Planner",
    "Time Management Cheat Sheet",
  ];
  const filteredTemplates = documentTemplates.filter((template) =>
    template.toLowerCase().includes(templateSearch.toLowerCase())
  );

  const videoTutorials: VideoTutorial[] = [
    {
      topic: "Entrepreneurship",
      title: "Hustle Smart: Solo Founder Edition",
      videoUrl: "#",
    },
    {
      topic: "Bootstrapping",
      title: "How to Bootstrap Your Startup on a Shoestring",
      videoUrl: "#",
    },
    {
      topic: "Productivity",
      title: "Time Mastery for One-Person Teams",
      videoUrl: "#",
    },
  ];

  const startupPlaybooks: Playbook[] = [
    { stage: "Getting Started", playbook: "The Solo Survival Playbook" },
    { stage: "Marketing", playbook: "Minimalist Marketing for One-Person Ops" },
    { stage: "Scaling", playbook: "Scaling Strategies Without a Team" },
  ];

  const nicheResources: NicheResource[] = [
    { niche: "Tech & SaaS", resource: "Lean Launch Tactics for Developers" },
    { niche: "Creative", resource: "Building a Personal Brand as a Designer" },
    { niche: "Consulting", resource: "Monetize Your Expertise as a Solo Consultant" },
  ];

  const caseStudies: CaseStudy[] = [
    {
      title: "Solo Success: Jane’s Journey",
      summary:
        "How Jane turned a one-woman show into a thriving consultancy with smart bootstrapping.",
    },
    {
      title: "Bootstrap to Breakthrough",
      summary:
        "Discover how John built a profitable startup with minimal resources.",
    },
  ];

  const recommendedReadings: string[] = [
    "The $100 Startup by Chris Guillebeau",
    "Rework by Jason Fried & David Heinemeier Hansson",
    "Company of One by Paul Jarvis",
  ];

  const communityResources: CommunityResource[] = [
    {
      contributor: "Alex Doe",
      resource: "How I Master My Schedule as a Solo Founder",
    },
    {
      contributor: "Sam Smith",
      resource: "Essential Tools for One-Person Startups",
    },
  ];

  const toolRecommendations: ToolRecommendation[] = [
    {
      tool: "Notion",
      review:
        "An all-in-one workspace that keeps your ideas, tasks, and docs organized.",
    },
    {
      tool: "Buffer",
      review:
        "Makes social media scheduling a breeze—ideal when you're flying solo.",
    },
    {
      tool: "Zapier",
      review:
        "Automate repetitive tasks and free up time for creative work.",
    },
  ];

  // Top navigation tabs
  const tabs = [
    { key: "templates", label: "Templates" },
    { key: "videos", label: "Videos" },
    { key: "playbooks", label: "Playbooks" },
    { key: "niche", label: "Niche" },
    { key: "casestudies", label: "Case Studies" },
    { key: "reading", label: "Reading" },
    { key: "community", label: "Community" },
    { key: "tools", label: "Tools" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "templates":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Document Templates</h2>
            <input
              type="text"
              placeholder="Search templates..."
              value={templateSearch}
              onChange={(e) => setTemplateSearch(e.target.value)}
              className="w-full p-3 rounded border border-gray-700 bg-[#16191c] text-gray-200 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTemplates.map((template, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#1e2228] rounded shadow hover:shadow-md transition-shadow"
                  >
                    {template}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No templates found.</p>
            )}
          </div>
        );
      case "videos":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Video Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videoTutorials.map((video, index) => (
                <div
                  key={index}
                  className="p-5 bg-[#1e2228] rounded shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg">{video.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">Topic: {video.topic}</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Watch Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case "playbooks":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Solo Founder Playbooks</h2>
            <div className="space-y-4">
              {startupPlaybooks.map((playbook, index) => (
                <div
                  key={index}
                  className="p-5 bg-[#1e2228] rounded shadow hover:shadow-md transition-shadow"
                >
                  <span className="font-bold">{playbook.stage}:</span>{" "}
                  {playbook.playbook}
                </div>
              ))}
            </div>
          </div>
        );
      case "niche":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Niche Strategies</h2>
            <div className="space-y-4">
              {nicheResources.map((item, index) => (
                <div
                  key={index}
                  className="p-5 bg-[#1e2228] rounded shadow hover:shadow-md transition-shadow"
                >
                  <span className="font-bold">{item.niche}:</span> {item.resource}
                </div>
              ))}
            </div>
          </div>
        );
      case "casestudies":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Case Studies & Success Stories</h2>
            <div className="space-y-4">
              {caseStudies.map((caseStudy, index) => (
                <div
                  key={index}
                  className="p-5 bg-[#1e2228] rounded shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-lg">{caseStudy.title}</h3>
                  <p className="text-gray-500">{caseStudy.summary}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "reading":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Recommended Reading</h2>
            <ul className="list-disc ml-6 space-y-2">
              {recommendedReadings.map((reading, index) => (
                <li key={index} className="text-gray-400">
                  {reading}
                </li>
              ))}
            </ul>
          </div>
        );
      case "community":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Community Insights</h2>
            <div className="space-y-4">
              {communityResources.map((resource, index) => (
                <div
                  key={index}
                  className="p-5 bg-[#1e2228] rounded shadow hover:shadow-md transition-shadow"
                >
                  <span className="font-bold">{resource.contributor}:</span> {resource.resource}
                </div>
              ))}
            </div>
          </div>
        );
      case "tools":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Tool Recommendations</h2>
            <div className="space-y-4">
              {toolRecommendations.map((tool, index) => (
                <div
                  key={index}
                  className="p-5 bg-[#1e2228] rounded shadow hover:shadow-md transition-shadow"
                >
                  <span className="font-bold">{tool.tool}:</span> {tool.review}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen p-8 bg-[#131619] text-gray-100">
      <header className="px-8 py-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold">Resource Library for Solo Founders</h1>
        <p className="mt-2 text-gray-400">
          Curated tools, guides, and insights to empower your solo journey.
        </p>
      </header>
      <nav className="flex flex-wrap gap-4 px-8 py-4 border-b border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md border transition-colors ${
              activeTab === tab.key
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-[#16191c] text-gray-300 hover:bg-gray-700 border-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <main className="px-8 py-6">{renderContent()}</main>
    </div>
  );
};

export default ResourceLibrary;
