import * as yup from 'yup';
import { passwordValidate } from './passwordValidate';
import { emailValidate } from './emailValidate';

export const loginSchema = yup.object().shape({
    email: emailValidate,
    password: passwordValidate,
});

export type LoginSchema = yup.InferType<typeof loginSchema>;