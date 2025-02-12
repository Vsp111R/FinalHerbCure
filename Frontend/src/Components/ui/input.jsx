import React from "react";

export const Input = ({ value, onChange, placeholder, className = "" }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border rounded-lg p-2 w-full ${className}`}
    />
  );
};
