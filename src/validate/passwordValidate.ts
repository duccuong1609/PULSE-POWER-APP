import * as yup from 'yup';

export const passwordValidate = yup.string().required('Password is required');