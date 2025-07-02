import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
      );
      setCategories(response.data.category);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle form submission for adding/updating category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoryName.trim() === "") return;

    try {
      if (editId) {
        // Update category
        await axios.put(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/category/update-category/${editId}`,
          { name: categoryName }
        );
      } else {
        // Create new category
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/category/create-category`,
          { name: categoryName }
        );
      }
      setCategoryName("");
      setEditId(null);
      fetchCategories(); // Refresh categories after adding/updating
    } catch (error) {
      console.error("Error adding/updating category:", error);
    }
  };

  // Handle deleting a category
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/category/delete-category/${id}`
      );
      fetchCategories(); // Refresh categories after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle edit button click
  const handleEdit = (id, name) => {
    setEditId(id);
    setCategoryName(name);
  };

 return (
  <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
    <Navbar />
    
    <div className="flex flex-col items-center p-6 w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📂 Manage Categories
      </h1>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md bg-white p-4 shadow rounded-md mb-8"
      >
        <input
          type="text"
          placeholder="Enter Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded transition"
        >
          {editId ? "Update" : "Submit"}
        </button>
      </form>

      {/* List Section */}
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">📋 Categories</h2>
        {categories.length === 0 ? (
          <p className="text-gray-500 text-sm">No categories yet.</p>
        ) : (
          <ul className="bg-white shadow rounded-md divide-y divide-gray-200">
            {categories.map((category) => (
              <li
                key={category._id}
                className="flex justify-between items-center p-3"
              >
                <span className="text-gray-800">{category.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category._id, category.name)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);

};

export default CreateCategory;
  