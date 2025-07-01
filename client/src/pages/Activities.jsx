import React from "react";

const activities = [
  {
    title: "Luxury Spa & Wellness",
    description:
      "Relax and rejuvenate at our premium spa and wellness centers. Enjoy massages, saunas, and yoga sessions tailored for your comfort.",
    image:
      "https://1.bp.blogspot.com/-nCdsG89GEuc/WD9pfr004-I/AAAAAAAAAPg/OuSDCMNUFl8-ci9QsVhoY0MA9GYTuBfuQCEw/s1600/ireland.jpg",
  },
  {
    title: "Adventure Sports",
    description:
      "For the thrill seekers, we offer activities like parasailing, river rafting, mountain biking, and much more.",
    image:
      "https://wallpaperbat.com/img/20358-sports-hd-wallpaper-hd-wallpaper-depot-pro.jpg",
  },
  {
    title: "Cultural Tours",
    description:
      "Explore the local heritage, museums, and cultural performances that bring the destination to life.",
    image:
      "https://target-tours.com/heigh_lights/bada-bagh-cenotaph-in-Jaisalmer.jpg",
  },
  {
    title: "Water Fun & Pools",
    description:
      "Dive into fun with our exclusive pools, slides, and water rides available in selected properties.",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Bonfire & Live Music",
    description:
      "Enjoy evenings with warm bonfires, live acoustic music, and stargazing for a magical experience.",
    image:
      "https://img.budgettravel.com/_contentHero/ph2011010603569-08201420-130006_original.jpg?mtime=20140903194027",
  },
  {
    title: "Guided Nature Walks",
    description:
      "Discover the beauty of nature with our trained guides who take you through scenic landscapes and trails.",
    image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80",
  },
];

const Activities = () => {
  return (
    <div id="activities" className="min-h-screen bg-gray-50 px-6 py-16 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-700 mb-10">
          Activities at StayHaven
        </h1>

        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16">
          At StayHaven, we believe in experiences that go beyond just a stay.
          Dive into an exciting range of activities crafted to enrich your journey and make every moment unforgettable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {activities.map((activity, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {activity.title}
                </h2>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Activities;
