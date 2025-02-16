"use client";
import React from "react";

const StrategicAdvisor: React.FC = () => {
  // Dummy data for demonstration
  const strategyHealth = 75; // in percentage
  const goals = [
    { name: "Increase User Base", progress: 60 },
    { name: "Enhance Product Features", progress: 40 },
    { name: "Expand Market Reach", progress: 80 },
  ];

  const marketAnalysis = {
    competitorInsights: [
      "Competitor A is focusing on mobile-first strategies.",
      "Competitor B has a strong customer service reputation.",
      "Competitor C is investing heavily in R&D.",
    ],
  };

  const businessModelCanvas = {
    keyPartners: "Tech providers, strategic investors, and distributors",
    valuePropositions: "Innovative product features with seamless integration",
    customerSegments: "Tech-savvy startups and SMEs",
    revenueStreams: "Subscriptions, licensing, and consulting fees",
  };

  const swotAnalysis = {
    strengths: ["Innovative technology", "Agile team"],
    weaknesses: ["Limited market presence", "Resource constraints"],
    opportunities: ["Growing market trends", "Potential strategic partnerships"],
    threats: ["Competitor advancements", "Economic fluctuations"],
  };

  const strategyDocs = [
    "5-Year Business Strategy Template",
    "Quarterly Roadmap Outline",
    "Market Analysis Report Template",
    "SWOT Analysis Worksheet",
  ];

  const aiRecommendations = [
    "Consider expanding into emerging markets in Southeast Asia.",
    "Evaluate potential partnerships with AI startups.",
    "Invest in customer feedback tools to drive product innovation.",
  ];

  const pivotFramework = [
    "Assess current market trends and customer feedback.",
    "Identify underperforming areas.",
    "Brainstorm new value propositions.",
    "Prototype and test alternative strategies.",
  ];

  const roadmap = [
    { phase: "Q1", milestone: "Launch Beta Version" },
    { phase: "Q2", milestone: "Secure First 100 Customers" },
    { phase: "Q3", milestone: "Expand to New Markets" },
    { phase: "Q4", milestone: "Refine Product and Scale" },
  ];

  return (
    <div className="p-8 bg-[#16191c] border border-gray-500 mb-4 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Strategic Advisor Dashboard</h1>

      {/* Strategy Health Score */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Strategy Health Score</h2>
        <div className="flex items-center">
          <div className="w-32 h-32 rounded-full border-4 border-blue-600 flex items-center justify-center">
            <span className="text-3xl font-bold">{strategyHealth}%</span>
          </div>
          <p className="ml-4">
            Overall business strategy health as evaluated by our AI.
          </p>
        </div>
      </section>

      {/* Current Goal Tracking */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Current Goal Tracking</h2>
        {goals.map((goal, index) => (
          <div key={index} className="mb-4">
            <p className="mb-1">{goal.name}</p>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-300">
              {goal.progress}% complete
            </span>
          </div>
        ))}
      </section>

      {/* Market Analysis Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          Market Analysis & Competitive Insights
        </h2>
        <ul className="list-disc ml-6">
          {marketAnalysis.competitorInsights.map((insight, index) => (
            <li key={index} className="mb-1 text-gray-300">
              {insight}
            </li>
          ))}
        </ul>
      </section>

      {/* Business Model Canvas */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Business Model Canvas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold">Key Partners</h3>
            <p className="text-gray-300">{businessModelCanvas.keyPartners}</p>
          </div>
          <div>
            <h3 className="font-bold">Value Propositions</h3>
            <p className="text-gray-300">
              {businessModelCanvas.valuePropositions}
            </p>
          </div>
          <div>
            <h3 className="font-bold">Customer Segments</h3>
            <p className="text-gray-300">
              {businessModelCanvas.customerSegments}
            </p>
          </div>
          <div>
            <h3 className="font-bold">Revenue Streams</h3>
            <p className="text-gray-300">
              {businessModelCanvas.revenueStreams}
            </p>
          </div>
        </div>
      </section>

      {/* SWOT Analysis Tool */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">SWOT Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="font-bold">Strengths</h3>
            <ul className="list-disc ml-6">
              {swotAnalysis.strengths.map((item, index) => (
                <li key={index} className="text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="font-bold">Weaknesses</h3>
            <ul className="list-disc ml-6">
              {swotAnalysis.weaknesses.map((item, index) => (
                <li key={index} className="text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="font-bold">Opportunities</h3>
            <ul className="list-disc ml-6">
              {swotAnalysis.opportunities.map((item, index) => (
                <li key={index} className="text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="font-bold">Threats</h3>
            <ul className="list-disc ml-6">
              {swotAnalysis.threats.map((item, index) => (
                <li key={index} className="text-gray-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Strategy Document Templates */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          Strategy Document Templates
        </h2>
        <ul className="list-disc ml-6">
          {strategyDocs.map((doc, index) => (
            <li key={index} className="text-gray-300">
              {doc}
            </li>
          ))}
        </ul>
      </section>

      {/* AI Recommendation Feed */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">AI Recommendation Feed</h2>
        <ul className="list-disc ml-6">
          {aiRecommendations.map((rec, index) => (
            <li key={index} className="text-gray-300">
              {rec}
            </li>
          ))}
        </ul>
      </section>

      {/* Pivot Consideration Framework */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          Pivot Consideration Framework
        </h2>
        <ol className="list-decimal ml-6">
          {pivotFramework.map((step, index) => (
            <li key={index} className="text-gray-300">
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* Long-term Roadmap Visualization */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Long-term Roadmap</h2>
        <ul className="list-disc ml-6">
          {roadmap.map((item, index) => (
            <li key={index} className="text-gray-300">
              <strong>{item.phase}:</strong> {item.milestone}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default StrategicAdvisor;
