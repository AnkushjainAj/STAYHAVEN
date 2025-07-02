import React from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import Navbar from "./Navbar";
import { useAuth } from "../../context/UserContext";

const Details = () => {
  const [auth, setAuth] = useAuth();
  // console.log(auth, "auth");
  const users = {
    name: auth?.user?.name,
    email: auth?.user?.email,
  };

 return (
  <div className="flex bg-gray-50 min-h-screen">
    <Navbar />
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          👤 User Details
        </h2>

        <div className="flex items-center text-gray-800 mb-4">
          <FaUser className="mr-3 text-blue-600 text-lg" />
          <span>
            <strong>Name:</strong> {users.name}
          </span>
        </div>

        <div className="flex items-center text-gray-800">
          <FaEnvelope className="mr-3 text-blue-600 text-lg" />
          <span>
            <strong>Email:</strong> {users.email}
          </span>
        </div>
      </div>
    </div>
  </div>
);

};

export default Details;
