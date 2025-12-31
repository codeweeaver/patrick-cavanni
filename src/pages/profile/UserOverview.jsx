import { FiBox, FiHeart, FiMail, FiMapPin, FiPhone, FiShoppingBag, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/global/AnimatedPage';
import { useAuth } from '../../hooks/useAuth';

const UserOverview = () => {
  const { user } = useAuth();

  // Mock stats since orders might not be fully implemented in db.json yet
  const stats = [
    {
      label: 'Total Orders',
      value: user.orders?.length || 0,
      icon: <FiBox className="h-6 w-6 text-blue-500" />,
      bg: 'bg-blue-50',
      link: 'orders',
    },
    {
      label: 'Wishlist',
      value: user.wishlist?.length || 0,
      icon: <FiHeart className="h-6 w-6 text-red-500" />,
      bg: 'bg-red-50',
      link: 'wishlist',
    },
    {
      label: 'Cart Items',
      value: user.cart?.length || 0,
      icon: <FiShoppingBag className="h-6 w-6 text-green-500" />,
      bg: 'bg-green-50',
      link: 'cart',
    },
  ];

  return (
    <AnimatedPage>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome, {user.name?.split(' ')[0]}!</h2>
          <p className="mt-1 text-gray-500">
            From your account dashboard you can view your recent orders, manage your shipping and
            billing addresses, and edit your password and account details.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`${stat.bg} rounded-full p-4 transition-transform group-hover:scale-110`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Profile Information */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Profile Information</h3>
              <Link to="settings" className="text-primary text-sm font-medium hover:underline">
                Edit
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <FiUser className="h-5 w-5 text-gray-400" />
                <span>{user.name}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FiMail className="h-5 w-5 text-gray-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FiPhone className="h-5 w-5 text-gray-400" />
                <span>{user.phone || 'No phone number added'}</span>
              </div>
            </div>
          </div>

          {/* Address Book */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Address Book</h3>
              <Link to="settings" className="text-primary text-sm font-medium hover:underline">
                Manage
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-600">
                <FiMapPin className="mt-1 h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">Default Shipping</p>
                  {user.street ? (
                    <address className="mt-1 text-sm leading-relaxed not-italic">
                      {user.street}
                      <br />
                      {user.city}, {user.zipCode}
                      <br />
                      {user.country}
                    </address>
                  ) : (
                    <p className="mt-1 text-sm text-gray-400 italic">No default address set</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default UserOverview;
