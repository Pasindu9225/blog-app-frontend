import React, { useState } from "react";
import TextInput from "../components/Textinput";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import loginSchema from "../schemas/loginSchema";
import { login } from "../api/internal";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    const data = {
      username: values.username,
      password: values.password,
    };
    const response = await login(data);

    if (response.status === 200) {
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
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="mx-auto max-w-[90%] px-2 flexCenter flex-col pt-48 overflow-hidden">
      <h2 className="bold-32 text-center mb-10 min-w-[355px]">
        Login to your account
      </h2>
      <form onSubmit={formik.handleSubmit}>
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
        {error && (
          <p className="text-red-500 text-left w-full max-w-[355px] mb-2">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="btn_dark_rounded !py-[12px] mt-7 min-w-[299px] disabled:bg-[#333]"
          disabled={
            !formik.values.username ||
            !formik.values.password ||
            formik.errors.username ||
            formik.errors.password
          }
        >
          Log In
        </button>
      </form>
      <span className="mt-12 text-gray-30">
        Don't have an account?{" "}
        <button
          className="ml-1 text-black underline"
          onClick={() => navigate("/signup")}
        >
          Register
        </button>
      </span>
      {error !== "" ? <p className=" text-red-500 my-5 mx-0">{error}</p> : ""}
    </div>
  );
};

export default Login;
