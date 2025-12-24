import { motion } from "framer-motion";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useRef, useState } from "react";
import { FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import "react-phone-number-input/style.css";
import { Form, useActionData } from "react-router";
import { Link, redirect, useNavigation } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "../../components/global/Input";

const infoSchema = Yup.object().shape({
  name: Yup.string()
    .required("Full name is required")
    .min(3, "Name must be at least 3 characters")
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+(?:\s+[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+)*$/u,
      "(only letters, spaces & common name characters)"
    ),

  phone: Yup.string()
    .required("Phone number is required")
    .test("is-valid-phone", "Invalid phone number", (value) => {
      return value ? isValidPhoneNumber(value) : false;
    }),

  street: Yup.string()
    .required("Street address is required")
    .min(5, "Please provide a valid street address"),
});

export const personalInfoAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const formData = {
      ...data,
    };

    // Validate the form data
    await infoSchema.validate(formData, { abortEarly: false });

    // Save to localStorage
    localStorage.setItem("pesonalInfoData", JSON.stringify(formData));

    return redirect("/register/address");
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

const PesonalInfo = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formRef = useRef(null);
  const savedData = JSON.parse(localStorage.getItem("pesonalInfoData") || "{}");
  const [phoneValue, setPhoneValue] = useState(savedData.phone);

  // Get errors from action data
  const errors = actionData?.errors || {};

  return (
    <Form method="post" className="space-y-4" replace ref={formRef}>
      <motion.div
        key="step1"
        exit={{ opacity: 0, x: -20 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-bold text-gray-800">Personal Info</h3>
        <motion.div variants={itemVariants}>
          <Input
            name="name"
            label="Full Name"
            type="text"
            id="name"
            placeholder="Your full name"
            icon={<FiUser />}
            error={errors.name}
            defaultValue={savedData.name}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            phone={true}
            name="phone"
            label="Phone Number"
            type="tel"
            id="phone"
            value={phoneValue}
            onChange={setPhoneValue}
            placeholder="+1234567890"
            icon={<FiPhone />}
            error={errors.phone}
          />
        </motion.div>

        {/* Street Address */}

        <motion.div variants={itemVariants}>
          <Input
            name="street"
            label="Street Address"
            type="text"
            id="street"
            placeholder="123 Main St, Apt 4B"
            icon={<FiMapPin />}
            error={errors.street}
            defaultValue={savedData.street}
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
            to="/register"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Back
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {isSubmitting ? "Submitting.." : "Next"}
          </button>
        </motion.div>
      </motion.div>
    </Form>
  );
};

export default PesonalInfo;
