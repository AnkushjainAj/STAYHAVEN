import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterSidebar from "../components/Serach/FilterSidebar";
import ProductList from "../components/Serach/ProductList";
import { useSearch } from "../context/Serach";

const SearchPage = () => {
  const [search, setSearch] = useSearch();
  const [filteredResults, setFilteredResults] = useState([]);

  const applyFilters = async (filters) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/post/product-filters`,
        filters
      );
      if (response.data.success) {
        setFilteredResults(response.data.products);
      }
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  return (
    <div className="px-4 md:px-36 mt-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar will be full width on mobile, fixed width on desktop */}
        <div className="w-full lg:w-1/4">
          <FilterSidebar applyFilters={applyFilters} />
        </div>

        {/* Product list takes full width on mobile, remaining space on desktop */}
        <div className="w-full lg:w-3/4">
          <ProductList
            products={
              filteredResults.length > 0 ? filteredResults : search.results
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
