import { isValidPhoneNumber } from 'react-phone-number-input';
import * as Yup from 'yup';

export const locationSchema = Yup.object().shape({
  street: Yup.string()
    .required('Street address is required')
    .min(5, 'Please provide a valid street address'),

  city: Yup.string().required('City is required'),

  zipCode: Yup.string()
    .required('required')
    .matches(/^[0-9a-zA-Z -]+$/, 'Invalid format'),

  country: Yup.string().required('Please select a country'),

  phone: Yup.string()
    .required('Phone number is required')
    .test('is-valid-phone', 'Invalid phone number', (value) => {
      return value ? isValidPhoneNumber(value) : false;
    }),
});
