import React, { useEffect, useState } from "react";
import {
  FaBed,
  FaUser,
  FaRulerCombined,
  FaPlaneDeparture,
} from "react-icons/fa";
import frame from "../../assets/Frame.png";
import { useNavigate, useParams } from "react-router-dom";

const RelatedProduct = ({ relatedProducts }) => {
  const navigate = useNavigate();
  const { slug } = useParams(); // hotelId

  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [edit, setEdit] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL;

const loggedInUser = JSON.parse(localStorage.getItem("auth"));
const userEmail = loggedInUser?.user?.email;

// console.log("User Email:", userEmail); // ✅ should show: addy12@gmail.com
// 

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/reviews/${slug}`);
      const data = await res.json();
      setReviews(data.reviews);
      setAverageRating(data.averageRating);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    if (slug) fetchReviews();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { hotelId: slug, username, comment, rating: Number(rating), userEmail };

    try {
      const res = await fetch(`${BASE_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setUsername("");
        setRating(1);
        setComment("");
        fetchReviews();
      }
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

const handleUpdate = async (reviewId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        comment,
        rating: Number(rating),  // ✅ Ensure it's a number
        userEmail,
      }),
    });

    const data = await res.json();  // ✅ Parse response body

    console.log("🔁 Server response:", data);

    if (res.ok) {
      setEdit("");
      setComment("");
      setRating(1);
      fetchReviews();
    } else {
      alert(`❌ Update failed: ${data.message}`);
    }
  } catch (err) {
    console.error("❌ Update error:", err);
    alert("Something went wrong during update.");
  }
};

  const handleDelete = async (reviewId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail }),
      });

      if (res.ok) {
        fetchReviews();
      } else {
        alert("Unauthorized to delete");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="flex flex-wrap gap-6 p-6 ml-12">
      {/* Coupon Card */}
      <div className="flex flex-col items-center bg-blue-500 text-white p-6 rounded-lg shadow-lg w-[19rem]">
        <div className="flex items-center mb-4">
          <FaPlaneDeparture className="text-3xl mr-2" />
          <h3 className="text-2xl font-bold">my Dream Place</h3>
        </div>
        <p className="text-5xl font-extrabold mb-2">20% OFF</p>
        <p className="mb-1 text-lg">Use Promo Code:</p>
        <p className="bg-yellow-300 text-blue-800 font-extrabold text-3xl py-1 px-4 rounded-lg shadow-md">
          Orlando
        </p>
        <img src={frame} alt="Traveler Icon" className="w-24 h-24 mt-4" />
      </div>

      {/* Related Products */}
      {relatedProducts.map((related, index) => (
        <div
          className="bg-white shadow-md rounded-lg overflow-hidden w-[27rem]"
          key={related._id || index}
        >
          <img
            src={related.images[0]}
            alt={`Image of ${related.title}`}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{related.title}</h3>
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <FaRulerCombined className="mr-2" /> 300 sq ft
            </div>
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <FaUser className="mr-2" /> Sleeps 3
            </div>
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <FaBed className="mr-2" /> 1 double bed and 1 twin bed
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4"
              onClick={() => navigate(`/product/${related.slug}`)}
            >
              Try it
            </button>
          </div>
        </div>
      ))}

      {/* Review Section */}
      <div className="w-full mt-10 max-w-4xl">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Write a Review</h2>

       <form
  onSubmit={handleSubmit}
  className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6"
>
  <h2 className="text-2xl font-semibold text-gray-800 text-center">
    Submit a Review
  </h2>

  <div>
    <label className="block text-gray-600 mb-1">Your Name</label>
    <input
      type="text"
      placeholder="Enter your name"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />
  </div>

  <div>
    <label className="block text-gray-600 mb-1">Your Comment</label>
    <textarea
      placeholder="Write your feedback..."
      className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      required
    />
  </div>

  <div>
    <label className="block text-gray-600 mb-1">Rating</label>
    <select
      value={rating}
      onChange={(e) => setRating(Number(e.target.value))}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <option value={1}>⭐ 1 - Poor</option>
      <option value={2}>⭐⭐ 2 - Fair</option>
      <option value={3}>⭐⭐⭐ 3 - Good</option>
      <option value={4}>⭐⭐⭐⭐ 4 - Very Good</option>
      <option value={5}>⭐⭐⭐⭐⭐ 5 - Excellent</option>
    </select>
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
  >
    Submit Review
  </button>
</form>


        {/* Reviews */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            User Reviews (Avg: ⭐ {averageRating}/5)
          </h3>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white border border-gray-200 p-4 rounded-lg shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <strong>{review.username}</strong>
                    <span className="text-yellow-500 font-bold">
                      ⭐ {review.rating}/5
                    </span>
                  </div>

                  {edit === review._id ? (
                    <>
                      <textarea
                        className="w-full p-2 border bo-300 rounded mb-2"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                      >
                        <option value={1}>⭐ 1</option>
                        <option value={2}>⭐⭐ 2</option>
                        <option value={3}>⭐⭐⭐ 3</option>
                        <option value={4}>⭐⭐⭐⭐ 4</option>
                        <option value={5}>⭐⭐⭐⭐⭐ 5</option>
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(review._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEdit("")}
                          className="bg-gray-400 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-700">{review.comment}</p>
                      <small className="text-gray-400 block mb-2">
                        {new Date(review.date).toLocaleString()}
                      </small>
                      {review.userEmail === userEmail && (
                        <div className="flex gap-4">
                          <button
                            className="text-blue-600 underline"
                            onClick={() => {
                              setEdit(review._id);
                              setComment(review.comment);
                              setRating(review.rating);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 underline"
                            onClick={() => handleDelete(review._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
