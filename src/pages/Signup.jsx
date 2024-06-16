import React from "react";

const Signup = () => {
  return (
    <div className="mx-auto max-w-[90%] px-2 flexCenter flex-col pt-48 overflow-hidden">
      <h2 className="bold-32 text-center mb-10 min-w-[355px]">
        Login to your account
      </h2>
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
    </div>
  );
};

export default Signup;
