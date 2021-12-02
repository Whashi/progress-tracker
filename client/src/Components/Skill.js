import React, { useState } from "react";
import Card from "../UI/Card";
import Dot from "../UI/Dot";
import Button from "../UI/Button";

import "./Skill.css";

const Skill = (props) => {
  const [dataEntryClone, setDataEntryClone] = useState(
    props.skillData.dataEntries
  );

  const dotClickHandler = (e) => {
    setDataEntryClone(e.target.attributes.index.value);
    const newEntryAmount = e.target.attributes.index.value;
    const updatedSkill = {
      ...props.skillData,
      dataEntries: newEntryAmount,
    };
    props.update(props.index, updatedSkill);
  };

  const addEntryAmountHandler = (e) => {
    const newEntryAmount = dataEntryClone + 1;
    if (newEntryAmount <= props.skillData.maxDataEntries) {
      setDataEntryClone(dataEntryClone + 1);
      const updatedSkill = { ...props.skillData, dataEntries: newEntryAmount };
      props.update(props.index, updatedSkill);
    }
  };

  const removeEntryAmountHandler = (e) => {
    const newEntryAmount = dataEntryClone - 1;
    if (newEntryAmount >= 0) {
      setDataEntryClone(dataEntryClone - 1);
      const updatedSkill = { ...props.skillData, dataEntries: newEntryAmount };
      props.update(props.index, updatedSkill);
    }
  };

  const positionArray = [1, 2, 3, 4, 5];

  const dotArray = positionArray.map((position) => {
    if (position <= props.skillData.maxDataEntries) {
      if (position <= dataEntryClone) {
        return "green";
      }
      return "black";
    }
    return null;
  });

  const progressDots = dotArray.map((color, index) => {
    const newIndex = index + 1;
    if (props.canEdit) {
      return (
        <Dot
          className="edit-dot"
          onClick={dotClickHandler}
          key={index}
          index={newIndex}
          color={color}
        />
      );
    } else {
      return <Dot key={index} color={color} />;
    }
  });
  return (
    <li className="skill">
      <Card>
        <h4 className="skill-title">{props.skillData.name}</h4>
        <div className="progress-dots-container">{progressDots}</div>
        <div className="amount-button-container">
          {props.canEdit && (
            <Button
              className="amount-button"
              onClick={removeEntryAmountHandler}
            >
              &#8722;
            </Button>
          )}
          {props.canEdit && (
            <Button className="amount-button" onClick={addEntryAmountHandler}>
              &#43;
            </Button>
          )}
        </div>
      </Card>
    </li>
  );
};

export default Skill;
