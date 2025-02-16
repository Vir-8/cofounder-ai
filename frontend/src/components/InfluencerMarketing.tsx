"use client";
import React, { useState } from "react";
import axios from "axios";
import { ExternalLink, Users, Eye, DollarSign, Percent } from 'lucide-react';

const InfluencerMarketing: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [ageGroup, setAgeGroup] = useState<string>("");
  const [channels, setChannels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchProductInfo = async (statement: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://ace-hackathon.onrender.com/gemini/generate",
        new URLSearchParams({ statement }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const categoriesData = response.data.Categories;
      const ageGroupData = response.data.AgeGroup;
      const channelsData = response.data.Channels;

      // Handle the data formats
      setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData.split(", "));
      setAgeGroup(ageGroupData || "Unknown");
      setChannels(Array.isArray(channelsData) ? channelsData : []);
    } catch (err) {
      console.error("Error fetching product info:", err);
      setError("Failed to fetch influencer marketing data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-1 flex-col items-center justify-center text-center px-6 md:px-8">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
        Influencer Marketing
      </h1>
      <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed mb-6">
        Collaborate with top-tier influencers using next-gen AI insights.
        Elevate brand awareness and drive conversions at scale.
      </p>

      <div className="w-full max-w-6xl bg-[#2E3238] p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Discover Insights</h2>
        <input
          type="text"
          placeholder="Enter your product description"
          className="w-full p-3 mb-4 text-black rounded-md"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchProductInfo((e.target as HTMLInputElement).value);
            }
          }}
        />

        {loading && <p className="text-yellow-500">Fetching data...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && categories.length > 0 && (
          <div className="text-left mt-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Categories:</h3>
            <ul className="list-disc list-inside">
              {categories.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2">Target Age Group:</h3>
            <p>{ageGroup}</p>

            <h3 className="text-xl font-semibold mt-4 mb-2">Recommended YouTube Channels:</h3>
    <div className="space-y-6">
      {channels.map((channel, index) => (
        <div key={index} className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-102 transition-transform duration-300">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Channel Name and Link */}
              <div className="flex items-center justify-between md:w-1/5">
                <h3 className="text-xl font-bold text-white">{channel["Account Name"]}</h3>
                <a
                  href={`https://youtube.com/channel/${channel["Channel ID"]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              </div>

              {/* Stats Grid */}
              <div className="flex flex-wrap md:flex-nowrap gap-6 md:gap-8 flex-1 justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="text-purple-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Subscribers</p>
                    <p className="text-lg font-semibold text-white">
                      {Number(channel["Subscribers"]).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Eye className="text-green-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Total Views</p>
                    <p className="text-lg font-semibold text-white">
                      {Number(channel["Total Views"]).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Percent className="text-yellow-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">View/Sub Ratio</p>
                    <p className="text-lg font-semibold text-white">
                      {Number(channel["View to Subscriber Ratio"]).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <DollarSign className="text-emerald-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">ROI</p>
                    <p className="text-lg font-semibold text-white">
                      ${Number(channel["ROI (Dollars)"]).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InfluencerMarketing;
