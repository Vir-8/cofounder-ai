"use client";

import React, { useEffect, useState } from "react";
import Papa from "papaparse";

type Conference = {
  "Event Name": string;
  "Start Date": string;
  "End Date": string;
  "Location": string;
  "Category": string;
  "URL": string;
  "Description": string;
};

const Conferences: React.FC = () => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the CSV file from the public folder
    fetch("/conference.csv")
      .then((response) => response.text())
      .then((csvText) => {
        // Parse the CSV text into a JSON object using PapaParse
        const parsed = Papa.parse(csvText, { header: true });
        setConferences(parsed.data as Conference[]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading CSV:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#131619] text-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Upcoming Conferences</h1>
        <p className="text-gray-400">
          Curated events and conferences tailored for startup founders.
        </p>
      </header>

      {loading ? (
        <p>Loading conferences...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1e2228] rounded-lg">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-2 border-b border-gray-700 text-left">
                  Event Name
                </th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">
                  Start Date
                </th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">
                  End Date
                </th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">
                  Location
                </th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">
                  Category
                </th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">
                  URL
                </th>
                <th className="px-4 py-2 border-b border-gray-700 text-left">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {conferences.map((conf, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-700 transition-colors border-b border-gray-700"
                >
                  <td className="px-4 py-2">{conf["Event Name"]}</td>
                  <td className="px-4 py-2">{conf["Start Date"]}</td>
                  <td className="px-4 py-2">{conf["End Date"]}</td>
                  <td className="px-4 py-2">{conf["Location"]}</td>
                  <td className="px-4 py-2">{conf["Category"]}</td>
                  <td className="px-4 py-2">
                    <a
                      href={conf["URL"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      Visit
                    </a>
                  </td>
                  <td className="px-4 py-2">{conf["Description"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Conferences;
