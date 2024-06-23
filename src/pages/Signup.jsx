import React, { useState } from "react";
import { useFormik } from "formik";
import TextInput from "../components/Textinput";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/internal";
import { setUser } from "../store/userSlice";
import signupSchema from "../schemas/signupSchema";

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (values) => {
    const data = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
    };
    const response = await signup(data);

    if (response.status === 201) {
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth,
      };
      dispatch(setUser(user));
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: handleSignup,
  });

  return (
    <div className="mx-auto max-w-[90%] px-2 flexCenter flex-col pt-48 overflow-hidden">
      <h2 className="bold-32 text-center mb-10 min-w-[355px]">
        Register your Email
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.errors.name && formik.touched.name ? 1 : undefined}
          errormessage={formik.errors.name}
        />
        <TextInput
          type="text"
          name="username"
          placeholder="Username"
          value={formik.values.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={
            formik.errors.username && formik.touched.username ? 1 : undefined
          }
          errormessage={formik.errors.username}
        />
        <TextInput
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.errors.email && formik.touched.email ? 1 : undefined}
          errormessage={formik.errors.email}
        />
        <TextInput
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={
            formik.errors.password && formik.touched.password ? 1 : undefined
          }
          errormessage={formik.errors.password}
        />
        <TextInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={
            formik.errors.confirmPassword && formik.touched.confirmPassword
              ? 1
              : undefined
          }
          errormessage={formik.errors.confirmPassword}
        />
        <button
          type="submit"
          disabled={
            !formik.values.username ||
            !formik.values.password ||
            !formik.values.name ||
            !formik.values.email ||
            !formik.values.confirmPassword ||
            formik.errors.username ||
            formik.errors.password ||
            formik.errors.confirmPassword ||
            formik.errors.name ||
            formik.errors.username ||
            formik.errors.email
          }
          className="btn_dark_rounded !py-[12px] mt-7 min-w-[299px] disabled:bg-[#333]"
        >
          Sign Up
        </button>
      </form>
      <span className="mt-12 text-gray-30">
        Do you have an account?{" "}
        <button
          className="ml-1 text-black underline"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </span>
      {error && <p className="text-red-500 my-5 mx-0">{error}</p>}
    </div>
  );
};

export default Signup;
