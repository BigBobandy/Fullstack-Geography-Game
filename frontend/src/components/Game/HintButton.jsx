import React from "react";

const HintButton = ({ disabled, onClick }) => {
  return (
    <button className="btn" disabled={disabled} onClick={onClick}>
      Hint
    </button>
  );
};

export default HintButton;
