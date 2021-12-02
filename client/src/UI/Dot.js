import React from "react";

import "./Dot.css";

const Dot = (props) => {
  const dotClass = `dot ${props.color} ${props.className}`;
  return (
    <div className={dotClass} onClick={props.onClick} index={props.index}></div>
  );
};

export default Dot;
