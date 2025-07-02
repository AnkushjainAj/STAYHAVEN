import React, { useState } from "react";
import { FaUser, FaPlus, FaList, FaFolder, FaMap, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const navbarMenu = [
  { id: 1, name: "Admin Details", link: "/admin/details", icon: <FaUser /> },
  { id: 2, name: "Create Post", link: "/admin/create-post", icon: <FaPlus /> },
  { id: 3, name: "All Posts", link: "/admin/all-post", icon: <FaList /> },
  {
    id: 4,
    name: "Create Category",
    link: "/admin/create-category",
    icon: <FaFolder />,
  },
  { id: 5, name: "All Orders", link: "/admin/all-booking", icon: <FaMap /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Bar (Mobile Only) */}
      <div className="bg-gray-800 text-white flex items-center justify-between px-4 py-3 md:hidden">
        <span className="text-lg font-bold">StayHaven</span>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          <FaBars size={22} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-[15rem] md:block min-h-screen border-r border-gray-700 shadow-md 
        ${isOpen ? "block" : "hidden"} md:relative fixed z-40 md:z-auto`}
      >
        <nav className="flex flex-col p-5 space-y-4">
          {navbarMenu.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              onClick={() => setIsOpen(false)} // Auto close on link click
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span className="text-md">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
