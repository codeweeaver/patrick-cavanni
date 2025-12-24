import { motion } from "framer-motion";
import { useRef } from "react";
import { FiLock, FiMail } from "react-icons/fi";
import { Form, useActionData } from "react-router";
import { redirect, useNavigation } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "../../components/global/Input";

const securitySchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Must contain one lowercase letter")
    .matches(/[A-Z]/, "Must contain one uppercase letter")
    .matches(/[0-9]/, "Must contain one number"),

  // This is where your snippet lives
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const accountSecurityAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const formData = {
      ...data,
    };

    // Validate the form data
    await securitySchema.validate(formData, { abortEarly: false });

    // Save to localStorage
    localStorage.setItem("accountSecurityData", JSON.stringify(formData));

    return redirect("/register/personal-info");
  } catch (error) {
    console.error("Validation error:", error);
    // Handle validation errors
    if (error.inner) {
      const errors = error.inner.reduce((acc, err) => {
        // Convert array indices to dot notation for nested fields
        const path = err.path.replace(/\[(\d+)\]/g, ".$1");
        return {
          ...acc,

          [path]: err.message,
        };
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

const AccountSecurity = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formRef = useRef(null);

  // Get errors from action data
  const errors = actionData?.errors || {};

  const savedData = JSON.parse(
    localStorage.getItem("accountSecurityData") || "{}"
  );

  return (
    <Form method="post" className="space-y-4" replace ref={formRef}>
      <motion.div
        key="step1"
        exit={{ opacity: 0, x: -20 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-bold text-gray-800">Account Security</h3>
        <motion.div variants={itemVariants}>
          <Input
            name="email"
            label="Email"
            type="email"
            id="email"
            placeholder="your.email@example.com"
            icon={<FiMail />}
            error={errors.email}
            defaultValue={savedData.email}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            name="password"
            label="Password"
            type="password"
            id="password"
            placeholder="Create a password"
            icon={<FiLock />}
            error={errors.password}
            defaultValue={savedData.password}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            icon={<FiLock />}
            error={errors.confirmPassword}
            defaultValue={savedData.confirmPassword}
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

        <motion.div variants={itemVariants} className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {isSubmitting ? "submitting.." : "Continue"}
          </button>
        </motion.div>
      </motion.div>
    </Form>
  );
};

export default AccountSecurity;
