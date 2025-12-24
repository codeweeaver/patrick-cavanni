import { motion } from "framer-motion";
import { useRef } from "react";
import toast from "react-hot-toast";
import { FiFlag, FiGlobe, FiMap } from "react-icons/fi";
import { Form, useActionData } from "react-router";
import { Link, redirect, useNavigation } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "../../components/global/Input";

const addressSchema = Yup.object().shape({
  city: Yup.string().required("City is required"),
  zipCode: Yup.string()
    .required("Zip Code is required")
    .matches(/^\d{5,6}$/, "Invalid Zip Code"),
  country: Yup.string().required("Country is required"),
});

export const addressAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    // Validate the form data
    await addressSchema.validate(data, { abortEarly: false });

    // Retrieve data from previous steps
    const securityData = JSON.parse(
      localStorage.getItem("accountSecurityData") || "{}"
    );
    const personalData = JSON.parse(
      localStorage.getItem("pesonalInfoData") || "{}"
    );

    const finalData = {
      ...securityData,
      ...personalData,
      ...data,
      role: "user",
      cart: [],
      wishlist: [],
      createdAt: new Date().toISOString(),
    };

    console.log("Final Registration Data:", finalData);

    // TODO: Integrate with AuthContext or Firebase here to create the user
    // For now, we simulate a successful registration and redirect to login
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    // Clear temporary data
    localStorage.removeItem("accountSecurityData");
    localStorage.removeItem("pesonalInfoData");

    toast.success("Account created successfully.");
    return redirect("/login");
  } catch (error) {
    console.error("Validation error:", error);
    if (error.inner) {
      const errors = error.inner.reduce((acc, err) => {
        const path = err.path.replace(/\[(\d+)\]/g, ".$1");
        return { ...acc, [path]: err.message };
      }, {});
      return { errors };
    }
    return { error: error.message };
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Address = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formRef = useRef(null);

  const errors = actionData?.errors || {};

  const countryOptions = [
    { value: "NG", label: "Nigeria" },
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
    { value: "GH", label: "Ghana" },
  ];

  return (
    <Form method="post" className="space-y-4" replace ref={formRef}>
      <motion.div
        key="step3"
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, x: -20 }}
        className="space-y-4"
      >
        <motion.div variants={itemVariants}>
          <Input
            name="city"
            label="City"
            type="text"
            id="city"
            placeholder="Lagos"
            icon={<FiMap />}
            error={errors.city}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            name="zipCode"
            label="Zip Code"
            type="text"
            id="zipCode"
            placeholder="100001"
            icon={<FiFlag />}
            error={errors.zipCode}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            select
            name="country"
            label="Country"
            id="country"
            placeholder="Select Country"
            icon={<FiGlobe />}
            options={countryOptions}
            error={errors.country}
          />
        </motion.div>

        {actionData?.error && (
          <motion.div
            variants={itemVariants}
            className="p-3 text-red-700 bg-red-100 rounded-md"
          >
            {actionData.error}
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="pt-4 flex gap-3">
          <Link
            to="/register/personal-info"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Back
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {isSubmitting ? "Creating.." : "Register"}
          </button>
        </motion.div>
      </motion.div>
    </Form>
  );
};

export default Address;
