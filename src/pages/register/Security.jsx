import { motion } from 'framer-motion';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useRef, useState } from 'react';
import 'react-phone-number-input/style.css';
import { Form, useActionData } from 'react-router';
import { Link, redirect, useNavigation } from 'react-router-dom';
import * as Yup from 'yup';
import { Input } from '../../components/global/Input';

const Security = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required')
    .min(3, 'Name must be at least 3 characters')
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+(?:\s+[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+)*$/u,
      '(only letters, spaces & common name characters)',
    ),

  phone: Yup.string()
    .required('Phone number is required')
    .test('is-valid-phone', 'Invalid phone number', (value) => {
      return value ? isValidPhoneNumber(value) : false;
    }),

  street: Yup.string()
    .required('Street address is required')
    .min(5, 'Please provide a valid street address'),
});

export const personalInfoAction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const formData = {
      ...data,
    };

    // Validate the form data
    await Security.validate(formData, { abortEarly: false });

    // Save to localStorage
    localStorage.setItem('pesonalInfoData', JSON.stringify(formData));

    return redirect('/register/address');
  } catch (error) {
    console.error('Validation error:', error);
    // Handle validation errors
    if (error.inner) {
      const errors = error.inner.reduce((acc, err) => {
        // Convert array indices to dot notation for nested fields
        const path = err.path.replace(/\[(\d+)\]/g, '.$1');
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
  const isSubmitting = navigation.state === 'submitting';
  const formRef = useRef(null);
  const savedData = JSON.parse(localStorage.getItem('pesonalInfoData') || '{}');
  const [phoneValue, setPhoneValue] = useState(savedData.phone);

  // Get errors from action data
  const errors = actionData?.errors || {};

  return (
    <Form method="post" className="space-y-4" replace ref={formRef}>
      <motion.div key="step1" exit={{ opacity: 0, x: -20 }} className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Personal Info</h3>
        <motion.div variants={itemVariants}>
          <motion.div variants={itemVariants}>
            <Input
              name="password"
              label="Password"
              type="password"
              id="password"
              placeholder="Create a password"
              icon={<FiLock />}
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
            />
          </motion.div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Input
                name="termsAndCodition"
                id="termsAndCodition"
                type="checkbox"
                className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
              />
              <label htmlFor="termsAndCodition" className="ml-2 block text-sm text-gray-700">
                I Accept the <Link to="#">Terms & Conditions</Link>
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-gray-600 hover:text-blue-900 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {actionData?.error && (
            <motion.div variants={itemVariants} className="rounded-md bg-red-100 p-3 text-red-700">
              {actionData.error}
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="flex gap-3 pt-4">
            <Link
              to="/register"
              className="focus:ring-primary flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              Back
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary-dark focus:ring-primary flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting..' : 'Next'}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </Form>
  );
};

export default PesonalInfo;
