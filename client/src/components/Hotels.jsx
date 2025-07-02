import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Hotels = () => {
  const [posts, setPosts] = useState([]);

  // Fetch all posts
  const getAllPosts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-all-post`
      );
      setPosts(res.data.posts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // Image rotation logic
  const [imageIndexes, setImageIndexes] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };
        posts.forEach((post) => {
          const currentIndex = newIndexes[post._id] || 0;
          newIndexes[post._id] = (currentIndex + 1) % post.images.length;
        });
        return newIndexes;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [posts]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
return (
  <div className="max-w-7xl mx-auto mt-16 px-4">
    <h2 className="text-3xl font-semibold mb-8 text-left sm:ml-0 md:ml-12">
      Popular Hotels
    </h2>

    <Carousel
      responsive={responsive}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      itemClass="px-2"
    >
      {posts.map((hotel) => (
        <div
          key={hotel._id}
          className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 w-[16rem] mx-auto"
        >
          <img
            src={
              hotel.images?.[imageIndexes[hotel._id] || 0] ||
              "https://via.placeholder.com/300x200?text=No+Image"
            }
            alt={hotel.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <Link
              to={`product/${hotel.slug}`}
              className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
            >
              {hotel.title}
            </Link>
          </div>
        </div>
      ))}
    </Carousel>
  </div>
);

};

export default Hotels;
