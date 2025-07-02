import React from "react";
import { useAuth } from "../../context/UserContext";

const UserDetails = () => {
  const [auth] = useAuth();
  const user = {
    name: auth?.user?.name || "N/A",
    email: auth?.user?.email || "N/A",
  };

return (
  <div className="w-full px-4 sm:px-6 md:px-8 py-6 bg-white">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      User Details
    </h2>
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <span className="font-semibold text-gray-800 w-24 mb-1 sm:mb-0">Name:</span>
        <span className="text-gray-600">{user.name}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center">
        <span className="font-semibold text-gray-800 w-24 mb-1 sm:mb-0">Email:</span>
        <span className="text-gray-600">{user.email}</span>
      </div>
    </div>
  </div>
);

};

export default UserDetails;
