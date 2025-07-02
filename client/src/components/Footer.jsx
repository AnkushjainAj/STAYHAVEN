import logo from "../assets/logo (2).png";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] pt-12 pb-8 text-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-10">
          Discover the world with <span className="text-blue-600">StayHaven</span>
        </h2>

        {/* Footer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 text-sm">
          {/* Logo + About */}
          <div className="md:col-span-1">
            <img src={logo} alt="StayHaven Logo" className="h-10 w-auto mb-4" />
            <p className="text-gray-600 leading-relaxed">
              Your companion for stress-free global travel and unforgettable stays.
            </p>
          </div>

          {/* Column: Company */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Press", "Partners", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Explore */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-2">
              {["Australia", "New Zealand", "USA", "Greece", "Maldives", "Singapore"].map((country) => (
                <li key={country}>
                  <a href="#" className="hover:text-blue-600 transition">
                    {country}
                  </a>
                </li>
              ))}
              <li>
                <a href="#" className="text-blue-600 hover:underline">See more</a>
              </li>
            </ul>
          </div>

          {/* Column: Policies */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Policies</h3>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Use", "Accessibility", "Rewards Program"].map((policy) => (
                <li key={policy}>
                  <a href="#" className="hover:text-blue-600 transition">
                    {policy}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Support */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              {["Help Center", "Manage Bookings", "Coupons", "Refund Policy", "Travel Docs"].map((help) => (
                <li key={help}>
                  <a href="#" className="hover:text-blue-600 transition">
                    {help}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mt-12 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} <span className="text-blue-600 font-medium">StayHaven</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
