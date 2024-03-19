import React from "react";

const GuessButton = ({ disabled }) => {
  return (
    <input type="submit" value="Guess" className="btn" disabled={disabled} />
  );
};

export default GuessButton;
