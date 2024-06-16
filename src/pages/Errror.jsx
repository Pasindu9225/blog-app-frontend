import React from "react";
import { Link } from "react-router-dom";

const Errror = () => {
  return (
    <section className=" max_padd_container flexCenter flex items-center flex-col pt-44">
      <div className=" text-3xl font-extrabold text-red-500">
        Error 404 - Page not found
        <div className="">
          <Link to={"/"} className=" mt-4 bold-16">
            Go back to<span className=" text-secondary">Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Errror;
