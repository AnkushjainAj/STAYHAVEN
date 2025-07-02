import React from "react";
import Navbar from "./Navbar";
import UserDetails from "./UserDetails";

import React from "react";
import Navbar from "./Navbar";
import UserDetails from "./UserDetails";

const UserDashboard = () => {
  return (
    <div className="flex justify-center items-start p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden bg-white w-full max-w-[82rem]">
        <Navbar />
        <div className="flex-1">
          <UserDetails />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;


export default UserDashboard;
