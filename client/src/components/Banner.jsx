import React from "react";
import axios from "axios";
import { useSearch } from "../context/Serach";
import { useNavigate } from "react-router-dom";
import BannerImage from "../assets/Rectangle 2.png";

const Banner = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearch();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.keyword?.trim()) {
      return console.error("Search keyword is missing");
    }

    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/booking/search/${search.keyword}`;
      const { data } = await axios.get(url);
      setSearch({ ...search, results: data });
      navigate("/search");
    } catch (error) {
      console.error("Error during search API call:", error);
    }
  };

  return (
<div
  className="relative w-full min-h-[28rem] md:min-h-[32rem] bg-cover bg-center flex items-center justify-center"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Centered Content */}
  <div className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4 w-full max-w-4xl">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
      Enjoy Your Dream Vacation
    </h1>
    <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-200">
      Plan and book your perfect trip with expert advice, travel tips, and destination inspiration from us.
    </p>

    {/* Search Box */}
    <form
      onSubmit={handleSearch}
      className="mt-8 w-full bg-white rounded-xl shadow-lg p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-2xl"
    >
      <input
        type="text"
        placeholder="Search destinations..."
        className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-500"
        value={search.keyword}
        onChange={(e) =>
          setSearch({ ...search, keyword: e.target.value })
        }
      />
      <button
        type="submit"
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition font-semibold"
      >
        Search
      </button>
    </form>
  </div>
</div>


  );
};

export default Banner;

