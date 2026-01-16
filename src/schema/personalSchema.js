import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required')
    .min(3, 'Name must be at least 3 characters')
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+(?:\s+[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+)*$/u,
      '(only letters, spaces & common name characters)',
    ),

  email: Yup.string().email('Invalid email address').required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain one lowercase letter')
    .matches(/[A-Z]/, 'Must contain one uppercase letter')
    .matches(/[0-9]/, 'Must contain one number'),

  // This is where your snippet lives
  confirmPassword: Yup.string()
    .required('confirm password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});
