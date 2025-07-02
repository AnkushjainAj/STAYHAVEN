import React from "react";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products }) => {
  const navigate = useNavigate();

  const handleClick = (post) => {
    const slug = slugify(post.title, { lower: true });
    navigate(`/product/${slug}`);
  };


 return (
  <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 relative bottom-7">
    <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 mt-6 sm:mt-9 text-center">
      {products.length < 1
        ? "No Products Found"
        : `Search Results Found: ${products.length}`}
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {products.map((post) => (
        <article
          key={post._id}
          onClick={() => handleClick(post)}
          className="cursor-pointer relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-6 pb-8 pt-40 w-full sm:w-[21rem] mx-auto shadow-lg transition-transform hover:scale-105"
        >
          <img
            src={post.images?.[0] || "https://via.placeholder.com/150"}
            alt={post.title || "Post Thumbnail"}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
          <h3 className="z-10 mt-3 text-2xl sm:text-3xl font-bold text-white">
            {post.hotelLocation || "Location not available"}
          </h3>
          <div className="z-10 text-sm leading-6 text-gray-300">
            {post.title || "Title not available"}
          </div>
        </article>
      ))}
    </div>
  </div>
);

};

export default ProductList;
