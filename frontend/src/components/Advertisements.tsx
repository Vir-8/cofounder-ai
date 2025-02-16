"use client";
import React, { useState } from "react";
import { FileText, BarChart2, Calendar, Users } from "lucide-react";
import SchedulingTaskManagement from "./SchedulingTaskManagement";
import LegalDocumentMaker from "./LegalDocumentMaker";

// Dummy components for each feature

const LegalDocuments: React.FC = () => (
  <div className="p-6 bg-[#2E3238] rounded-lg shadow-lg">
    <LegalDocumentMaker />
  </div>
);

const BusinessStrategyAnalyzer: React.FC = () => (
  <div className="p-6 bg-[#2E3238] rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-white mb-4">Business Strategy Analyzer</h2>
    <p className="text-gray-300 mb-4">
      Provide your product description and the challenges you’re facing, and receive a market analysis along with strategic insights.
    </p>
    <p className="text-gray-300">[Dummy analysis results]</p>
  </div>
);

const SchedulingTaskManagementContent: React.FC = () => (
  <SchedulingTaskManagement />
);

const NetworkHub: React.FC = () => (
  <div className="p-6 bg-[#2E3238] rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-white mb-4">Network Hub</h2>
    <p className="text-gray-300 mb-4">
      Discover upcoming conferences, events, and networking opportunities tailored for your startup journey.
    </p>
    <p className="text-gray-300">[Dummy networking content]</p>
  </div>
);

const Dashboard: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  // Array to define each quadrant in the main dashboard grid for new features
  const features = [
    {
      id: "legal",
      title: "Legal Documents",
      icon: FileText,
      description: "Access and manage legal contracts, NDAs, and more.",
    },
    {
      id: "strategy",
      title: "Business Strategy Analyzer",
      icon: BarChart2,
      description: "Analyze your product, challenges, and market for strategic insights.",
    },
    {
      id: "scheduling",
      title: "Scheduling & Task Management",
      icon: Calendar,
      description: "Manage your tasks and schedule seamlessly with integrated tools.",
    },
    {
      id: "network",
      title: "Network Hub",
      icon: Users,
      description: "Discover conferences, events, and networking opportunities.",
    },
  ];

  // Render selected feature or grid of features
  const renderContent = () => {
    switch (selectedOption) {
      case "legal":
        return (
          <div className="space-y-6">
            <LegalDocuments />
            <button
              onClick={() => setSelectedOption("")}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
            >
              Back
            </button>
          </div>
        );
      case "strategy":
        return (
          <div className="space-y-6">
            <BusinessStrategyAnalyzer />
            <button
              onClick={() => setSelectedOption("")}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
            >
              Back
            </button>
          </div>
        );
      case "scheduling":
        return (
          <div className="space-y-6">
            <SchedulingTaskManagementContent />
            <button
              onClick={() => setSelectedOption("")}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
            >
              Back
            </button>
          </div>
        );
      case "network":
        return (
          <div className="space-y-6">
            <NetworkHub />
            <button
              onClick={() => setSelectedOption("")}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
            >
              Back
            </button>
          </div>
        );
      default:
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center">
              Startup Dashboard
            </h1>
            <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
              Empower your startup journey with AI-powered insights and tools.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <button
                    key={feature.id}
                    onClick={() => setSelectedOption(feature.id)}
                    className="p-6 bg-[#2E3238] rounded-lg hover:bg-[#383C43] transition-colors duration-200 text-left group"
                  >
                    <Icon className="w-6 h-6 mb-3 text-blue-600" />
                    <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
                    <p className="text-gray-400">{feature.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen p-8 bg-[#131619] text-white overflow-auto">
      {selectedOption === "" ? (
        renderContent()
      ) : (
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      )}
    </div>
  );
};

export default Dashboard;
