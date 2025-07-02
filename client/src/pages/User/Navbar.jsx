import React from "react";
import { FaUser, FaPlus, FaList, FaFolder, FaMap } from "react-icons/fa";
import { Link } from "react-router-dom";

const navbarMenu = [
  { id: 1, name: "User Details", link: "/user", icon: <FaUser /> },
  { id: 2, name: "Your Order", link: "/user/your-order", icon: <FaPlus /> },
  // { id: 3, name: "Contribute", link: "/user/create-post", icon: <FaList /> },
];

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // For hamburger toggle icons
import { navbarMenu } from "./menu"; // adjust path if needed

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button for mobile */}
      <div className="lg:hidden bg-gray-800 text-white p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white lg:w-[15rem] w-[14rem] h-full min-h-[100vh] lg:min-h-[28rem] 
          border-r border-gray-700 p-5 space-y-4 transition-transform duration-300
          fixed lg:static z-50 top-0 ${
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <nav className="flex flex-col space-y-4 mt-14 lg:mt-0">
          {navbarMenu.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              onClick={() => setIsOpen(false)} // close on mobile click
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span className="text-md">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;



