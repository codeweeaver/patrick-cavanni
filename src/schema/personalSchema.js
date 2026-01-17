import { isValidPhoneNumber } from 'libphonenumber-js';
import * as Yup from 'yup';

export const personalSchema = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required')
    .min(3, 'Name must be at least 3 characters')
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+(?:\s+[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+)*$/u,
      '(only letters, spaces & common name characters)',
    ),

  email: Yup.string().email('Invalid email address').required('Email is required'),

  phone: Yup.string()
    .required('Phone number is required')
    .test('is-valid-phone', 'Invalid phone number', (value) => {
      return value ? isValidPhoneNumber(value) : false;
    }),
});
