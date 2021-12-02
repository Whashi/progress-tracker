import React from "react";

import "./Button.css";

const Button = (props) => {
  const buttonClass = "my-button " + props.className;
  return (
    <button className={buttonClass} onClick={props.onClick} value={props.value}>
      {props.children}
    </button>
  );
};

export default Button;
