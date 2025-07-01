import React from "react";

const About = () => {
  return (
    <div id="about" className="min-h-screen bg-white text-gray-800 px-6 py-16 md:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-blue-700">
          About StayHaven
        </h1>

        {/* Intro Paragraph */}
        <p className="text-lg md:text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          StayHaven is your trusted partner in discovering the perfect stay experience—whether you’re planning a luxurious vacation, a weekend getaway, or a business trip. We connect you to handpicked accommodations that blend comfort, style, and convenience.
        </p>

        {/* 3 Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-3">🏨 Curated Hotels</h3>
            <p className="text-gray-600">
              We list only verified and high-quality hotels, villas, and homestays with real reviews and exceptional services.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-3">🌍 Seamless Experience</h3>
            <p className="text-gray-600">
              From browsing to booking, we ensure a smooth and secure experience tailored to your preferences.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-3">💼 For Every Traveler</h3>
            <p className="text-gray-600">
              Whether you're a solo traveler, couple, or family—we offer personalized options to suit every type of journey.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto">
            At StayHaven, our mission is to redefine how people discover and experience travel accommodations. We are committed to providing a platform that prioritizes authenticity, affordability, and trust—ensuring every trip starts and ends with comfort and satisfaction.
          </p>
        </div>

        {/* Vision Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Our Vision</h2>
          <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto">
            To become the most customer-centric hospitality platform globally—empowering travelers with smart tools, genuine insights, and the freedom to travel their way.
          </p>
        </div>

        {/* Call to Action */}
      
      </div>
    </div>
  );
};

export default About;
