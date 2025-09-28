import * as yup from 'yup';

export const emailValidate = yup.string().email('Invalid email').required('Username is required');