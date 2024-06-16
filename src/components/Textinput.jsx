import React from "react";

const TextInput = ({
  type,
  name,
  placeholder,
  value,
  onBlur,
  onChange,
  error,
  errormessage,
}) => {
  return (
    <div className="flex flex-col items-center w-full max-w-[355px]">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className="py-3 px-7 mt-2 outline-none w-full bg-[#f7f7f7] rounded-full"
      />
      {error && (
        <p className="text-red-500 text-left w-full max-w-[355px] mb-2">
          {errormessage}
        </p>
      )}
    </div>
  );
};

export default TextInput;
