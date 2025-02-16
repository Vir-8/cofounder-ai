"use client";
import React, { useState } from "react";

const NetworkHub: React.FC = () => {
  // Dummy data for connection recommendations with relevance scores
  const connections = [
    { name: "Jordan Smith", field: "Software Development", relevance: 85 },
    { name: "Casey Lee", field: "Marketing", relevance: 75 },
    { name: "Taylor Brown", field: "Product Management", relevance: 90 },
  ];

  // Dummy data for upcoming events
  const events = [
    { title: "Startup Networking Mixer", date: "March 20, 2025", time: "6:00 PM - 8:00 PM" },
    { title: "Tech Innovators Conference", date: "April 5, 2025", time: "9:00 AM - 5:00 PM" },
    { title: "Entrepreneur Q&A Session", date: "April 12, 2025", time: "3:00 PM - 4:00 PM" },
  ];

  // Dummy data for networking script generator
  const dummyScript = "Hi [Name], I noticed we share an interest in innovative tech solutions. I'd love to connect and learn more about your work.";
  const [networkingScript, setNetworkingScript] = useState(dummyScript);

  const generateScript = () => {
    // This would call an API in a real scenario
    setNetworkingScript(
      "Hi [Name], I’ve been following your work in [Field] and think our visions align well. Let's chat about potential collaboration!"
    );
  };

  // Dummy data for outreach message templates
  const outreachTemplates = [
    "Template 1: Introduction and Networking",
    "Template 2: Follow-up After Event",
    "Template 3: Request for Collaboration",
  ];

  // Dummy data for a relationship CRM-style tracker
  const relationships = [
    { name: "Alex", lastContact: "2 days ago", nextStep: "Schedule follow-up call" },
    { name: "Jamie", lastContact: "1 week ago", nextStep: "Send project update" },
    { name: "Morgan", lastContact: "3 days ago", nextStep: "Plan meeting" },
  ];

  // Dummy data for mentor/advisor matching
  const mentors = [
    { name: "Dr. Evelyn Carter", expertise: "Business Strategy", matchScore: 92 },
    { name: "Mr. Liam Johnson", expertise: "Product Development", matchScore: 88 },
  ];

  // Dummy data for co-founder compatibility assessment tools
  const coFounderAssessment = {
    name: "Potential Co-founder: Riley Davis",
    compatibility: 80,
    comments: "Strong technical skills and complementary experience in marketing.",
  };

  return (
    <div className="p-8 bg-[#16191c] border border-gray-500 mb-4 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Network Hub</h1>

      {/* Connection Recommendations */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Connection Recommendations</h2>
        <ul className="space-y-4">
          {connections.map((conn, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{conn.name}</h3>
                <p className="text-gray-300">{conn.field}</p>
              </div>
              <div className="text-sm">
                <span className="mr-2">Relevance:</span>
                <span className="font-bold">{conn.relevance}%</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Event Calendar */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Networking Events</h2>
        <ul className="list-disc ml-6">
          {events.map((event, index) => (
            <li key={index} className="mb-1 text-gray-300">
              <strong>{event.title}:</strong> {event.date} ({event.time})
            </li>
          ))}
        </ul>
      </section>

      {/* Networking Script Generator */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Networking Script Generator</h2>
        <p className="mb-4 text-gray-300">
          Use our AI tool to generate a custom script for your outreach.
        </p>
        <button
          onClick={generateScript}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mb-4"
        >
          Generate Script
        </button>
        <p className="bg-gray-800 p-4 rounded text-gray-300">{networkingScript}</p>
      </section>

      {/* Outreach Message Templates */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Outreach Message Templates</h2>
        <ul className="list-disc ml-6">
          {outreachTemplates.map((template, index) => (
            <li key={index} className="mb-1 text-gray-300">
              {template}
            </li>
          ))}
        </ul>
      </section>

      {/* Relationship CRM-style Tracker */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Relationship CRM</h2>
        <ul className="space-y-4">
          {relationships.map((rel, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded">
              <h3 className="font-semibold">{rel.name}</h3>
              <p className="text-gray-300">Last Contact: {rel.lastContact}</p>
              <p className="text-gray-300">Next Step: {rel.nextStep}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Community Forum Access */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Community Forum</h2>
        <p className="mb-4 text-gray-300">
          Join our forum to discuss ideas, share experiences, and connect with fellow entrepreneurs.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
          Access Forum
        </button>
      </section>

      {/* Mentor/Advisor Matching */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Mentor/Advisor Matching</h2>
        <ul className="space-y-4">
          {mentors.map((mentor, index) => (
            <li key={index} className="bg-gray-800 p-4 rounded">
              <h3 className="font-semibold">{mentor.name}</h3>
              <p className="text-gray-300">Expertise: {mentor.expertise}</p>
              <p className="text-gray-300">Match Score: {mentor.matchScore}%</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Co-founder Compatibility Assessment */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Co-founder Compatibility Assessment</h2>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-semibold">{coFounderAssessment.name}</h3>
          <p className="text-gray-300">Compatibility Score: {coFounderAssessment.compatibility}%</p>
          <p className="text-gray-300">Comments: {coFounderAssessment.comments}</p>
        </div>
      </section>
    </div>
  );
};

export default NetworkHub;
