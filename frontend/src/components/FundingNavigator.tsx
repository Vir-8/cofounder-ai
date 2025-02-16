"use client";
import React from "react";

const FundingNavigator: React.FC = () => {
  // Dummy data for fundraising readiness assessment
  const fundraisingReadiness = {
    score: 65,
    feedback:
      "Your startup is nearly ready for external funding. Consider refining your financial projections to boost confidence among investors.",
  };

  // Dummy data for funding options comparison
  const fundingOptions = [
    {
      type: "Venture Capital",
      pros: "Large funding amounts, strategic guidance",
      cons: "High dilution, strict oversight",
    },
    {
      type: "Angel Investors",
      pros: "Mentorship, flexible terms",
      cons: "Limited funds, varied expectations",
    },
    {
      type: "Crowdfunding",
      pros: "Market validation, community support",
      cons: "Time-intensive, uncertain outcome",
    },
    {
      type: "Bootstrapping",
      pros: "Full control, no dilution",
      cons: "Limited resources, slower growth",
    },
  ];

  // Dummy data for pitch deck builder with AI feedback
  const pitchDeckFeedback =
    "Your pitch deck is compelling. Consider adding more detailed market analysis to strengthen your case.";

  // Dummy data for investor research database
  const investorResearch = [
    {
      name: "Investor A",
      focus: "Tech Startups",
      previousInvestments: "Startup X, Y, Z",
    },
    {
      name: "Investor B",
      focus: "Healthcare Innovation",
      previousInvestments: "Startup Alpha, Beta",
    },
    {
      name: "Investor C",
      focus: "Green Technology",
      previousInvestments: "Startup Green, Eco",
    },
  ];

  // Dummy data for due diligence preparation checklist
  const dueDiligenceChecklist = [
    "Business plan and financial projections",
    "Team bios and resumes",
    "Legal documents and compliance certifications",
    "Customer testimonials and traction metrics",
  ];

  // Dummy data for valuation calculator
  const valuationCalculator = {
    revenue: "$2M",
    growthRate: "25%",
    estimatedValuation: "$10M",
  };

  // Dummy data for term sheet analyzer
  const termSheetAnalysis =
    "The term sheet proposes a 20% equity stake for a $2M investment. Some clauses may be negotiable upon further discussion.";

  // Dummy data for investor meeting preparation tools
  const investorMeetingTools = [
    "Pitch practice sessions",
    "Q&A preparation guidelines",
    "Follow-up email templates",
    "Meeting agenda checklist",
  ];

  return (
    <div className="p-8 bg-[#16191c] border border-gray-500 mb-4 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Funding Navigator</h1>

      {/* Fundraising Readiness Assessment */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Fundraising Readiness Assessment</h2>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-xl font-bold">Readiness Score: {fundraisingReadiness.score}%</p>
          <p className="text-gray-300">{fundraisingReadiness.feedback}</p>
        </div>
      </section>

      {/* Funding Options Comparison */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Funding Options Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fundingOptions.map((option, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded">
              <h3 className="font-bold text-xl">{option.type}</h3>
              <p>
                <strong>Pros:</strong> {option.pros}
              </p>
              <p>
                <strong>Cons:</strong> {option.cons}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pitch Deck Builder with AI Feedback */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Pitch Deck Builder</h2>
        <p className="mb-4 text-gray-300">
          Build your pitch deck and receive AI feedback to refine your presentation.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mb-4">
          Launch Pitch Deck Builder
        </button>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-300">
            <strong>AI Feedback:</strong> {pitchDeckFeedback}
          </p>
        </div>
      </section>

      {/* Investor Research Database */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Investor Research Database</h2>
        <ul className="list-disc ml-6">
          {investorResearch.map((investor, index) => (
            <li key={index} className="mb-2 text-gray-300">
              <strong>{investor.name}</strong> – Focus: {investor.focus}. Previous Investments: {investor.previousInvestments}.
            </li>
          ))}
        </ul>
      </section>

      {/* Due Diligence Preparation Checklist */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Due Diligence Preparation Checklist</h2>
        <ul className="list-disc ml-6">
          {dueDiligenceChecklist.map((item, index) => (
            <li key={index} className="mb-1 text-gray-300">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Valuation Calculator */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Valuation Calculator</h2>
        <div className="bg-gray-800 p-4 rounded">
          <p>
            <strong>Current Revenue:</strong> {valuationCalculator.revenue}
          </p>
          <p>
            <strong>Growth Rate:</strong> {valuationCalculator.growthRate}
          </p>
          <p className="font-bold">
            <strong>Estimated Valuation:</strong> {valuationCalculator.estimatedValuation}
          </p>
        </div>
      </section>

      {/* Term Sheet Analyzer */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Term Sheet Analyzer</h2>
        <div className="bg-gray-800 p-4 rounded">
          <p className="text-gray-300">{termSheetAnalysis}</p>
        </div>
      </section>

      {/* Investor Meeting Preparation Tools */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Investor Meeting Preparation Tools</h2>
        <ul className="list-disc ml-6">
          {investorMeetingTools.map((tool, index) => (
            <li key={index} className="mb-1 text-gray-300">
              {tool}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default FundingNavigator;
