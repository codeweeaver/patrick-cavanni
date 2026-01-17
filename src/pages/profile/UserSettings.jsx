import { useState } from 'react';
import { FiAlertTriangle, FiLock, FiMapPin, FiSave, FiTrash2, FiUser } from 'react-icons/fi';
import AnimatedPage from '../../components/global/AnimatedPage';
import Button from '../../components/global/Button';
import { Input } from '../../components/global/Input';
import { useAuth } from '../../hooks/useAuth';

const UserSettings = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: user?.street || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
    country: user?.country || '',
    currentPassword: '',
    newPassword: '',
    comfirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    console.log('Updating settings:', formData);

    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would call an update function from useAuth here
      // updateProfile(formData);
    }, 1500);
  };

  return (
    <AnimatedPage>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
          <p className="mt-1 text-gray-500">Manage your profile details and account security.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
              <FiUser className="text-primary" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                icon={<FiUser />}
              />
              <div className="cursor-not-allowed opacity-70">
                <Input
                  label="Email Address"
                  name="email"
                  value={user?.email || ''}
                  disabled
                  placeholder="john@example.com"
                  readOnly
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Phone Number"
                  name="phone"
                  phone
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          {/* Address Book */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
              <FiMapPin className="text-primary" /> Address Book
            </h3>
            <div className="space-y-6">
              <Input
                label="Street Address"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="123 Main St"
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                />
                <Input
                  label="Zip Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="10001"
                />
                <Input
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="United States"
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
              <FiLock className="text-primary" /> Security
            </h3>
            <div className="space-y-6">
              <Input
                type="password"
                label="Current Password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="••••••••"
                icon={<FiLock />}
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input
                  type="password"
                  label="New Password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  icon={<FiLock />}
                />
                <Input
                  type="password"
                  label="Confirm New Password"
                  name="comfirmPassword"
                  value={formData.comfirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  icon={<FiLock />}
                />
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-xl border border-red-100 bg-red-50 p-6 shadow-sm">
            <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-red-800">
              <FiAlertTriangle /> Danger Zone
            </h3>
            <p className="mb-6 text-sm text-red-600">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-medium text-gray-900">Delete Account</p>
                <p className="text-sm text-gray-500">
                  Permanently remove your account and all data.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete your account? This action cannot be undone.',
                    )
                  ) {
                    console.log('Delete account requested');
                  }
                }}
                className="flex items-center gap-2 rounded-md border border-red-200 bg-white px-4 py-2 font-medium text-red-600 transition-colors hover:bg-red-100"
              >
                <FiTrash2 />
                Delete Account
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isLoading} className="flex items-center gap-2 px-8">
              <FiSave />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </AnimatedPage>
  );
};

export default UserSettings;
