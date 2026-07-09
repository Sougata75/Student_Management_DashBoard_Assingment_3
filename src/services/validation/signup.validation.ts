import * as yup from "yup"
export const signupSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  password: yup.string().min(6, "Must be 6").required(),
});