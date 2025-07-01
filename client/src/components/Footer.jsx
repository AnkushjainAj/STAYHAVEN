import logo from "../assets/logo (2).png";

const Footer = () => {
  return (
    <footer  id="contact" className="bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] pt-10 pb-8 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-10">
          Discover the world with <span className="text-blue-600">StayHaven</span>
        </h2>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Logo and About */}
          <div className="md:col-span-1">
            {/* <img src={logo} alt="StayHaven Logo" className="h-10 w-auto mb-4" /> */}
            <p className="text-sm text-gray-600 leading-relaxed">
              Your companion for stress-free global travel and unforgettable stays.
            </p>
          </div>

          {/* Column 1 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {["About Us", "Careers", "Press", "Partners", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              {["Australia", "New Zealand", "USA", "Greece", "Maldives", "Singapore"].map((country) => (
                <li key={country}>
                  <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                    {country}
                  </a>
                </li>
              ))}
              <li>
                <a href="#" className="text-blue-600 hover:underline">See more</a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              {["Privacy Policy", "Terms of Use", "Accessibility", "Rewards Program"].map((policy) => (
                <li key={policy}>
                  <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                    {policy}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {["Help Center", "Manage Bookings", "Coupons", "Refund Policy", "Travel Docs"].map((help) => (
                <li key={help}>
                  <a href="#" className="hover:text-blue-600 transition-colors duration-200">
                    {help}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} <span className="text-blue-600 font-medium">StayHaven</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
