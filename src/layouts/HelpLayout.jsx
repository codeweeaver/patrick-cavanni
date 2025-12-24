import {
  FiChevronRight,
  FiCreditCard,
  FiMessageSquare,
  FiShoppingBag,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const HelpLayout = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const helpLinks = [
    {
      id: 1,
      icon: <FiMessageSquare className="w-5 h-5" />,
      title: "Help Center",
      path: "/help-center",
      description: "Get help with your account or order",
    },
    {
      id: 2,
      icon: <FiShoppingBag className="w-5 h-5" />,
      title: "Place an Order",
      path: "/help-center/order",
      description: "Learn how to place an order",
    },
    {
      id: 3,
      icon: <FiCreditCard className="w-5 h-5" />,
      title: "Payment Options",
      path: "/help-center/payment",
      description: "Learn about payment methods",
    },
    {
      id: 4,
      icon: <FiTruck className="w-5 h-5" />,
      title: "Track an Order",
      path: "/help-center/shipping",
      description: "Track your order status",
    },
    {
      id: 5,
      icon: <FiXCircle className="w-5 h-5" />,
      title: "Return & Refund",
      path: "/help-center/return",
      description: "Start a return or exchange",
    },
    {
      id: 6,
      icon: <FiMessageSquare className="w-5 h-5" />,
      title: "Contact Us",
      path: "/help-center/contact",
      description: "Reach out to our support team",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="container max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold">How can we help?</h1>
          <p className="mt-4 text-lg text-gray-200">
            Find answers to common questions or contact our support team.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search help articles..."
                className="w-full px-6 py-3 rounded-lg text-gray-50 outline-2 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent hover:bg-accent/70 text-white px-6 py-2 rounded-md transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Help Topics
                </h2>
              </div>
              <nav>
                <ul className="divide-y divide-gray-200">
                  {helpLinks.map((link) => (
                    <li key={link.id}>
                      <NavLink
                        to={link.path}
                        className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                          isActive(link.path)
                            ? "bg-primary/5 border-l-4 border-accent"
                            : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className={`p-2 rounded-full ${
                              isActive(link.path)
                                ? "bg-accent/10 text-accent"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {link.icon}
                          </span>
                          <div>
                            <h3
                              className={`text-sm font-medium ${
                                isActive(link.path)
                                  ? "text-primary"
                                  : "text-gray-900"
                              }`}
                            >
                              {link.title}
                            </h3>
                            <p className="text-xs text-gray-600">
                              {link.description}
                            </p>
                          </div>
                        </div>
                        <FiChevronRight
                          className={`w-5 h-5 ${
                            isActive(link.path)
                              ? "text-accent"
                              : "text-gray-400"
                          }`}
                        />
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HelpLayout;
