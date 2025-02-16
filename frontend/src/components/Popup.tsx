import React, { useState, useEffect, useRef } from "react";
import { X, ChevronDown, Loader2 } from "lucide-react";

interface CompanyDetails {
  companyName: string;
  targetAudience: string;
  demographic: {
    ageGroup: string;
    location: string;
    interests: string;
  };
  challenges: string[];
}

interface PopupProps {
  onClose: () => void;
  onSubmit: () => Promise<void>;
  companyDetails: CompanyDetails;
  setCompanyDetails: React.Dispatch<React.SetStateAction<CompanyDetails>>;
  loading: boolean;
}

const Popup: React.FC<PopupProps> = ({
  onClose,
  onSubmit,
  companyDetails,
  setCompanyDetails,
  loading,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCompanyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDemographicChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setCompanyDetails((prev) => ({
      ...prev,
      demographic: { ...prev.demographic, [name]: value },
    }));
  };

  const handleChallengeToggle = (challenge: string) => {
    setCompanyDetails((prev) => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter((c) => c !== challenge)
        : [...prev.challenges, challenge],
    }));
  };

  const inputClassName =
    "w-full px-4 py-2.5 bg-[#1e2023] text-white rounded-lg border border-[#2a2d31] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 text-sm placeholder:text-gray-500";
  const labelClassName = "block text-gray-400 text-sm font-medium mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#131619] rounded-xl shadow-2xl max-w-2xl w-full relative border border-[#1e2023]">
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">
              Maximize Your Brand Impact
            </h3>
            <p className="text-gray-400 text-sm">
              Provide essential details and let our AI revolutionize your
              marketing approach.
            </p>
          </div>

          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="companyName" className={labelClassName}>
                  Company Name & Product Description
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={companyDetails.companyName}
                  onChange={handleInputChange}
                  className={inputClassName}
                  placeholder="Enter company name and short product description"
                />
              </div>

              <div>
                <label htmlFor="targetAudience" className={labelClassName}>
                  Target Audience
                </label>
                <select
                  id="targetAudience"
                  name="targetAudience"
                  value={companyDetails.targetAudience}
                  onChange={handleInputChange}
                  className={inputClassName}
                >
                  <option value="">Select target audience</option>
                  <option value="B2B">B2B (Business-to-Business)</option>
                  <option value="B2C">B2C (Business-to-Consumer)</option>
                  <option value="Both">Both B2B and B2C</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="ageGroup" className={labelClassName}>
                  Age Group
                </label>
                <select
                  id="ageGroup"
                  name="ageGroup"
                  value={companyDetails.demographic.ageGroup}
                  onChange={handleDemographicChange}
                  className={inputClassName}
                >
                  <option value="">Select age group</option>
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55+">55+</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className={labelClassName}>
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={companyDetails.demographic.location}
                  onChange={handleDemographicChange}
                  className={inputClassName}
                  placeholder="Enter geographic region"
                />
              </div>
            </div>

            <div>
              <label htmlFor="interests" className={labelClassName}>
                Interests
              </label>
              <input
                type="text"
                id="interests"
                name="interests"
                value={companyDetails.demographic.interests}
                onChange={handleDemographicChange}
                className={inputClassName}
                placeholder="Enter audience interests (separated by commas)"
              />
            </div>

            <div className="relative" ref={dropdownRef}>
              <label className={labelClassName}>Challenges</label>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full px-4 py-2.5 bg-[#1e2023] text-white rounded-lg border border-[#2a2d31] hover:border-[#3a3d41] flex items-center justify-between text-sm"
              >
                <span className="truncate">
                  {companyDetails.challenges.length > 0
                    ? companyDetails.challenges.join(", ")
                    : "Select challenges"}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute z-10 mt-2 w-full bg-[#1e2023] border border-[#2a2d31] rounded-lg shadow-xl">
                  {[
                    "Low Brand Visibility",
                    "Poor Audience Engagement",
                    "Low Conversion Rates",
                    "Other",
                  ].map((challenge) => (
                    <label
                      key={challenge}
                      className="flex items-center px-4 py-2.5 hover:bg-[#2a2d31] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-[#3a3d41] text-blue-500 focus:ring-blue-500 focus:ring-offset-[#1e2023]"
                        checked={companyDetails.challenges.includes(challenge)}
                        onChange={() => handleChallengeToggle(challenge)}
                      />
                      <span className="ml-3 text-sm text-gray-200">
                        {challenge}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onSubmit}
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Generate My Content</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup;
