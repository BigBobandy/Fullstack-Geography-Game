import React from "react";

const HintButton = ({ disabled, onClick, type = "button" }) => {
  return (
    <button className="btn" disabled={disabled} onClick={onClick} type={type}>
      Hint
    </button>
  );
};

export default HintButton;
