import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const SearchBar = () => {
  return (
  <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch justify-center gap-3 sm:gap-4 bg-white mt-8 p-4 rounded-md shadow-md">
    {/* Location Input */}
    <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full sm:w-auto flex-1 min-w-[200px]">
      <FaMapMarkerAlt className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Melbourne"
        className="bg-transparent outline-none text-gray-700 w-full"
      />
    </div>

    {/* Check-in Date */}
    <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full sm:w-auto flex-1 min-w-[200px]">
      <FaCalendarAlt className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Mar 18, 2022"
        className="bg-transparent outline-none text-gray-700 w-full"
      />
    </div>

    {/* Check-out Date */}
    <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full sm:w-auto flex-1 min-w-[200px]">
      <FaCalendarAlt className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Mar 20, 2022"
        className="bg-transparent outline-none text-gray-700 w-full"
      />
    </div>

    {/* Guests */}
    <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full sm:w-auto flex-1 min-w-[200px]">
      <FaUser className="text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="2 adults, 1 room"
        className="bg-transparent outline-none text-gray-700 w-full"
      />
    </div>

    {/* Search Button */}
    <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition w-full sm:w-auto">
      Search
    </button>
  </div>
);

};

export default SearchBar;
