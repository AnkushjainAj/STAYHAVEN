import React, { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const redirectDashboard = (e) => {
    e.stopPropagation();
    if (auth?.user?.role === "admin") {
      navigate("/admin/details");
    } else {
      navigate("/user");
    }
  };

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <span className="text-xl font-bold text-gray-800">StayHaven</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-gray-600 font-medium">
          <a href="/" className="hover:text-blue-600 transition">Home</a>
          {/* <a href="#discover" className="hover:text-blue-600 transition">Discover</a> */}
          <a href="#activities" className="hover:text-blue-600 transition">Activities</a>
          <a href="#about" className="hover:text-blue-600 transition">About</a>

          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-4 md:gap-6 relative">
          <IoIosHeartEmpty
            size={22}
            className="text-gray-600 cursor-pointer hover:text-blue-600 transition"
            onClick={() => navigate("/cart")}
          />

          <div className="relative hidden md:block">
            <FaUser
              size={20}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-600 cursor-pointer hover:text-blue-600 transition"
            />
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <ul className="text-sm text-gray-700 font-medium">
                  <li
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={redirectDashboard}
                  >
                    Your Profile
                  </li>
                  {auth?.user ? (
                    <li
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </li>
                  ) : (
                    <li
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate("/login")}
                    >
                      Sign In
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Hamburger Icon */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden focus:outline-none"
          >
            <FaBars size={20} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-50">
          <div className="bg-white w-[70%] h-full p-6 shadow-lg relative">
            {/* Close Icon */}
            <FaTimes
              size={24}
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar Links */}
            <nav className="flex flex-col gap-6 text-gray-700 font-semibold mt-8">
              <a href="/" onClick={() => setIsSidebarOpen(false)}>Home</a>
              {/* <a href="#discover" onClick={() => setIsSidebarOpen(false)}>Discover</a> */}
              <a href="#activities" onClick={() => setIsSidebarOpen(false)}>Activities</a>
              <a href="#about" onClick={() => setIsSidebarOpen(false)}>About</a>
              <a href="#contact" onClick={() => setIsSidebarOpen(false)}>Contact</a>
              <hr className="my-2" />
              {auth?.user ? (
                <>
                  <button onClick={redirectDashboard}>Your Profile</button>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <button onClick={() => navigate("/login")}>Sign In</button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
