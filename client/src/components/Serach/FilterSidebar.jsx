import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const FilterSidebar = ({ applyFilters }) => {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedGuests, setSelectedGuests] = useState([]);

  const budgetOptions = [
    { label: "$0 - $200", range: [0, 200] },
    { label: "$200 - $500", range: [200, 500] },
    { label: "$500 - $1,000", range: [500, 1000] },
    { label: "$1,000 - $2,000", range: [1000, 2000] },
    { label: "$2,000 - $5,000", range: [2000, 5000] },
  ];

  const handleApplyFilters = () => {
    const filters = {
      checked: selectedGuests,
      radio: selectedBudget
        ? budgetOptions.find((b) => b.label === selectedBudget).range
        : [],
    };
    applyFilters(filters);
  };

  rreturn (
  <div className="p-4 space-y-6 w-full sm:w-[14rem] mt-6 sm:mt-[5rem]">
    {/* Budget Filter */}
    <div className="p-4 border rounded-md bg-white shadow-sm">
      <h3 className="font-semibold mb-2 text-gray-800 text-lg">
        Your budget per day
      </h3>
      <div className="space-y-2">
        {budgetOptions.map((option, index) => (
          <label
            key={index}
            className="flex items-center justify-between text-gray-700"
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="budget"
                checked={selectedBudget === option.label}
                onChange={() => setSelectedBudget(option.label)}
                className="mr-2 accent-blue-500"
              />
              <span className="text-sm">{option.label}</span>
            </div>
          </label>
        ))}
      </div>
    </div>

    {/* Guest Filter */}
    <div className="p-4 border rounded-md bg-white shadow-sm mt-8">
      <h3 className="font-semibold mb-2 text-gray-800 text-lg">Guest Filter</h3>
      <div className="space-y-2">
        {[1, 2, 3, 4, 5, 6].map((guest, index) => (
          <label
            key={index}
            className="flex items-center justify-between text-gray-700"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedGuests.includes(guest)}
                onChange={(e) =>
                  setSelectedGuests((prev) =>
                    e.target.checked
                      ? [...prev, guest]
                      : prev.filter((g) => g !== guest)
                  )
                }
                className="mr-2 accent-blue-500"
              />
              <span className="text-sm">{guest} Guest</span>
            </div>
          </label>
        ))}
      </div>
    </div>

    {/* Apply Filters Button */}
    <button
      onClick={handleApplyFilters}
      className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      Apply Filters
    </button>
  </div>
);

};

export default FilterSidebar;
