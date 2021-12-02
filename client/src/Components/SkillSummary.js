import React, { useState, useEffect } from "react";
import Dot from "../UI/Dot";

import "./SkillSummary.css"

const SkillSummary = (props) => {
  const [dotColor, setDotColor] = useState("black");

  let isComplete;

  useEffect(() => {
    props.profileSkill.map((skill, index) => {
      const isMaxed =
        parseInt(skill.dataEntries) === parseInt(skill.maxDataEntries);
      if (index === 0) {
        isComplete = isMaxed;
      } else {
        isComplete = isComplete && isMaxed;
      }
    });
    if (isComplete) {
      setDotColor("green");
    }
  }, [dotColor, isComplete]);

  return (
    <div className="summary-item">
      <h5 className="skill-summary-title">{props.title}</h5>
      <Dot className="skill-summary-dot" color={dotColor} />
    </div>
  );
};

export default SkillSummary;
