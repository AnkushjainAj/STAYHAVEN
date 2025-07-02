import React, { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState("");
  const [nearArea, setNearArea] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState([]);
  const [guest, setGuest] = useState("1");
  const [isAvailable, setIsAvailable] = useState(false);
  const [price, setPrice] = useState("");

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
      );
      setCategory(response.data.category);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.warn("You can only upload a maximum of 3 images.");
    } else {
      setImages(files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !title ||
      !hotelLocation ||
      !description ||
      !facilities ||
      !nearArea ||
      !selectedCategory ||
      !guest ||
      !price
    ) {
      return toast.error("All fields are required.");
    }

    if (images.length !== 3) {
      return toast.error("Please upload exactly 3 images.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("hotelLocation", hotelLocation);
    formData.append("description", description);
    formData.append("facilities", facilities);
    formData.append("nearArea", nearArea);
    formData.append("category", selectedCategory);
    formData.append("guest", guest);
    formData.append("isAvailable", isAvailable);
    formData.append("price", price);

    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/post/create-post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Post created successfully!");
      // Reset form
      setTitle("");
      setHotelLocation("");
      setDescription("");
      setFacilities("");
      setNearArea("");
      setSelectedCategory("");
      setImages([]);
      setGuest("1");
      setIsAvailable(false);
      setPrice("");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post.");
    }
  };

return (
  <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen">
    {/* Sidebar */}
    <div className="w-full lg:w-[250px] border-r border-gray-200">
      <Navbar />
    </div>

    {/* Form Section */}
    <div className="flex-1 p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">📝 Create Post</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 max-w-3xl w-full mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Hotel Location"
          value={hotelLocation}
          onChange={(e) => setHotelLocation(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Facilities */}
        <input
          type="text"
          placeholder="Facilities (comma separated)"
          value={facilities}
          onChange={(e) => setFacilities(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Near Area */}
        <input
          type="text"
          placeholder="Nearby Area"
          value={nearArea}
          onChange={(e) => setNearArea(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {category?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Guests</label>
          <select
            value={guest}
            onChange={(e) => setGuest(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[...Array(6)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Availability</label>
          <select
            value={isAvailable}
            onChange={(e) => setIsAvailable(e.target.value === "true")}
            className="w-full p-3 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="border border-gray-300 p-4 rounded">
          <label className="flex items-center cursor-pointer text-gray-700 font-semibold">
            <FaImage className="mr-2 text-gray-500" />
            Upload Images (max 3)
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <div className="flex mt-3 gap-3 flex-wrap">
            {images.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition duration-300"
        >
          Submit Post
        </button>
      </form>
    </div>
  </div>
);


};

export default CreatePost;
