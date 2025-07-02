import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-all-post`
      );
      setPosts(data.posts);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch posts");
    }
  };

  const handleDelete = async (postId) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/post/delete-post/${postId}`
      );
      toast.success("Post deleted successfully!");
      setPosts(posts.filter((p) => p._id !== postId));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete post");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((i) => (i + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

 return (
  <div className="flex flex-col lg:flex-row min-h-screen bg-[#f4f6f9]">
    <Navbar />

    <div className="flex-1 p-4 sm:p-6 lg:p-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
        📋 Your All Posts
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg sm:text-xl">
          No posts found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1"
            >
              {/* Post Image */}
              <img
                src={
                  post.images?.[currentImageIndex] ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt="Hotel"
                className="h-48 w-full object-cover"
              />

              {/* Post Info */}
              <div className="p-5">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                  📍 {post.hotelLocation}
                </h3>
                <p
                  onClick={() => navigate(`/admin/post/${post.slug}`)}
                  className="text-gray-600 mt-1 mb-4 hover:underline cursor-pointer"
                >
                  {post.title}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => navigate(`/admin/post/${post.slug}`)}
                    className="text-blue-600 hover:underline font-medium text-sm"
                  >
                    View Post
                  </button>

                  <button
                    onClick={() => handleDelete(post._id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium transition"
                  >
                    <FaTrash size={14} />
                    Delete
                  </button>
                </div>
              </div>

              {/* Animated Top Border */}
              <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-1 w-full animate-pulse" />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

};

export default AllPost;
