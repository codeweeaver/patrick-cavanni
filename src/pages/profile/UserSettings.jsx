import { useState } from "react";
import { FiAlertTriangle, FiLock, FiMapPin, FiSave, FiTrash2, FiUser } from "react-icons/fi";
import AnimatedPage from "../../components/global/AnimatedPage";
import Button from "../../components/global/Button";
import { Input } from "../../components/global/Input";
import { useAuth } from "../../hooks/useAuth";

const UserSettings = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    street: user?.street || "",
    city: user?.city || "",
    zipCode: user?.zipCode || "",
    country: user?.country || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
    console.log("Updating settings:", formData);

    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would call an update function from useAuth here
      // updateProfile(formData);
    }, 1500);
  };

  return (
    <AnimatedPage>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
          <p className="text-gray-500 mt-1">
            Manage your profile details and account security.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiUser className="text-primary" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                icon={<FiUser />}
              />
              <div className="opacity-70 cursor-not-allowed">
                <Input
                  label="Email Address"
                  name="email"
                  value={user?.email || ""}
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
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  icon={<FiLock />}
                />
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 p-6 rounded-xl border border-red-100 shadow-sm">
            <h3 className="text-lg font-bold text-red-800 mb-2 flex items-center gap-2">
              <FiAlertTriangle /> Danger Zone
            </h3>
            <p className="text-sm text-red-600 mb-6">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
                      "Are you sure you want to delete your account? This action cannot be undone."
                    )
                  ) {
                    console.log("Delete account requested");
                  }
                }}
                className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-md hover:bg-red-100 font-medium transition-colors flex items-center gap-2"
              >
                <FiTrash2 />
                Delete Account
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-8"
            >
              <FiSave />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </AnimatedPage>
  );
};

export default UserSettings;
