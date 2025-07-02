import React from "react";
import backgroundImage from "../assets/Rectangle 18.png";
import smartphoneImage from "../assets/Isolated_right_hand_with_smartphone 2.png";

const Advertisement = () => {
  return (
  <div
    className="relative w-full max-w-7xl mx-auto h-auto md:h-[16rem] flex items-center justify-center mt-14 px-4 py-10 md:py-0"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="flex flex-col md:flex-row items-center justify-between w-full">
      {/* Text Section */}
      <div className="flex flex-col space-y-4 text-center md:text-left">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
          Download the mobile application for bonus <br className="hidden sm:block" />
          coupons and travel codes
        </h2>
        <button className="w-full sm:w-[14rem] py-2 px-6 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition">
          Download mobile app
        </button>
      </div>

      {/* Image Section */}
      <img
        src={smartphoneImage}
        alt="Smartphone"
        className="hidden md:block w-[18rem] lg:w-[22rem] xl:w-[28rem] object-contain"
      />
    </div>
  </div>
);
}
export default Advertisement;
