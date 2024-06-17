import * as yup from "yup";

const passwordPattern = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d@#$%^&+=!]{8,25}$/;
const errorMessage = "use lowercase, uppercase and digits";

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be at most 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters")
    .matches(passwordPattern, { message: errorMessage })
    .required("Password is required"),
});

export default loginSchema;
