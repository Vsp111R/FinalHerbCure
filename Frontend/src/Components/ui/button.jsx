import React from "react";

export const Button = ({ onClick, children, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition ${className}`}
    >
      {children}
    </button>
  );
};
