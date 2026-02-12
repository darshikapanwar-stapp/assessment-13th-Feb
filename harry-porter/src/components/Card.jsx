import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition duration-300">
      {children}
    </div>
  );
};

export default Card;
