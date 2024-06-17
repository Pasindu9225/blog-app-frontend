import React from "react";
import { ProgressBar } from "react-loader-spinner";

const Loader = ({ text }) => {
  return (
    <div className="flexCenter flex-col min-h-screen">
      <h4 className=" bold-16">Loading {text}...</h4>
      <ProgressBar
        visible={true}
        height="100"
        width="100"
        color="#2949c6"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
