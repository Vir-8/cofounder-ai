"use client";
import React from "react";

const ProgressTracker: React.FC = () => {
  // Dummy data for milestone timeline
  const milestones = [
    { title: "Idea Validation", date: "Jan 2025", status: 100 },
    { title: "MVP Launch", date: "Feb 2025", status: 80 },
    { title: "Beta Testing", date: "Mar 2025", status: 50 },
    { title: "Public Launch", date: "Apr 2025", status: 20 },
  ];

  // Dummy data for metrics dashboard
  const metrics = [
    { label: "Monthly Revenue", value: "$50K" },
    { label: "New Users", value: "1,200" },
    { label: "Customer Retention", value: "85%" },
    { label: "Churn Rate", value: "5%" },
  ];

  // Dummy data for skills development progress
  const skills = [
    { skill: "Leadership", progress: 70 },
    { skill: "Technical", progress: 80 },
    { skill: "Marketing", progress: 60 },
    { skill: "Sales", progress: 50 },
  ];

  // Dummy data for comparative benchmarks
  const benchmarks = [
    { metric: "Monthly Revenue", yourValue: "$50K", industryAvg: "$45K" },
    { metric: "New Users", yourValue: "1,200", industryAvg: "1,000" },
    { metric: "Customer Retention", yourValue: "85%", industryAvg: "80%" },
    { metric: "Churn Rate", yourValue: "5%", industryAvg: "7%" },
  ];

  // Dummy data for achievement badges
  const badges = [
    { name: "Early Adopter", description: "Awarded for early product adoption" },
    { name: "Innovator", description: "Awarded for breakthrough innovations" },
    { name: "Milestone Master", description: "Awarded for achieving key milestones" },
  ];

  // Dummy periodic review text
  const review =
    "Weekly Review: Your startup has made significant strides this week. The MVP launch is nearly complete, and user engagement is rising. Focus on refining the user experience to drive retention.";

  // Dummy growth prediction text
  const growthPrediction =
    "Based on current trends, revenue is predicted to grow by 25% next quarter while user acquisition improves by 20%.";

  // Dummy export function
  const exportReport = () => {
    alert("Exporting report for stakeholders...");
  };

  return (
    <div className="w-full h-screen p-8 bg-[#131619] text-gray-100">
      <header className="px-8 py-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold">Progress Tracker</h1>
        <p className="mt-2 text-gray-500">Monitor your startup’s growth and achievements.</p>
      </header>
      
      <main className="px-8 py-6 space-y-12">
        {/* Milestone Timeline */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Milestone Timeline</h2>
          <ul className="space-y-6">
            {milestones.map((milestone, index) => (
              <li key={index} className="flex items-center">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="ml-6 flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{milestone.title}</p>
                    <p className="text-sm text-gray-500">{milestone.date}</p>
                  </div>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: `${milestone.status}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{milestone.status}% complete</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Metrics Dashboard */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Metrics Dashboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="p-6 bg-[#1e2228] rounded shadow">
                <p className="text-sm text-gray-500">{metric.label}</p>
                <p className="mt-2 text-2xl font-bold">{metric.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Development */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Skills Development</h2>
          <div className="space-y-6">
            {skills.map((item, index) => (
              <div key={index}>
                <p className="font-semibold">{item.skill}</p>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.progress}% complete</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparative Benchmarks */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Comparative Benchmarks</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#1e2228] rounded">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-2 text-left text-sm text-gray-500">Metric</th>
                  <th className="px-4 py-2 text-left text-sm text-gray-500">Your Value</th>
                  <th className="px-4 py-2 text-left text-sm text-gray-500">Industry Avg</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((benchmark, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-sm">{benchmark.metric}</td>
                    <td className="px-4 py-2 text-sm">{benchmark.yourValue}</td>
                    <td className="px-4 py-2 text-sm">{benchmark.industryAvg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Achievement Badges */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Achievement Badges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="p-6 bg-[#1e2228] rounded flex flex-col items-center text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold mb-2">
                  🏆
                </div>
                <p className="font-semibold">{badge.name}</p>
                <p className="mt-1 text-sm text-gray-500">{badge.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Periodic Review */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Periodic Review</h2>
          <div className="p-6 bg-[#1e2228] rounded shadow">
            <p className="text-gray-300">{review}</p>
          </div>
        </section>

        {/* Growth Prediction */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Growth Prediction</h2>
          <div className="p-6 bg-[#1e2228] rounded shadow">
            <p className="text-gray-300">{growthPrediction}</p>
          </div>
        </section>

        {/* Export Report */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Export Report</h2>
          <button
            onClick={exportReport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold transition-colors"
          >
            Export Report
          </button>
        </section>
      </main>
    </div>
  );
};

export default ProgressTracker;
