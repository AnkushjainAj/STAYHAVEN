import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import {
  FaRegCalendarAlt,
  FaRegMoneyBillAlt,
  FaUserAlt,
} from "react-icons/fa";

const AllTrip = () => {
  const [bookingList, setAllBookingList] = useState([]);

  const getAllTrip = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/booking/get-all-bookings`
      );
      setAllBookingList(response.data.bookings || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error.message);
    }
  };

  useEffect(() => {
    getAllTrip();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row p-4 bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex-1 px-2 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4 mb-6 text-center lg:text-left">
          All Bookings
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookingList
            .filter(
              (booking) =>
                booking &&
                typeof booking === "object" &&
                booking.post &&
                booking.user
            )
            .map((booking) => (
              <div
                key={booking._id}
                className="w-full bg-white rounded-lg shadow-md border border-gray-200"
              >
                <div className="p-5">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                    🏨 {booking.post.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-1">
                    <FaRegCalendarAlt className="inline-block mr-2" />
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>

                  <p className="text-gray-600 text-sm mb-1">
                    <FaRegMoneyBillAlt className="inline-block mr-2" />
                    Payment Status:{" "}
                    <span className="font-medium capitalize">
                      {booking.paymentStatus}
                    </span>
                  </p>

                  <p className="text-gray-600 text-sm mb-1">
                    <FaUserAlt className="inline-block mr-2" />
                    User: {booking.user.name}
                  </p>

                  <p className="text-sm font-medium mt-2">
                    Status:{" "}
                    <span
                      className={`${
                        booking.status === "pending"
                          ? "text-yellow-500"
                          : "text-green-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllTrip;
