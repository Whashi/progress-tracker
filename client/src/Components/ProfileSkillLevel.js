import React, { useState } from "react";
import Button from "../UI/Button";

import "./ProfileSkillLevel.css"

const ProfileSkillLevel = (props) => {
  const [entrytValue, setEntryValue] = useState(props.profile.level);
  const valueChangeHandler = (e) => {
    setEntryValue(e.target.value);
    props.updateProfile({ ...props.editedProfile, level: e.target.value });
  };

  const editSkillLevel = props.skillTitles.map((skillTitle) => {
    const buttonActive = skillTitle === entrytValue;
    let buttonClass = "skill-level-button";
    if (buttonActive) {
      buttonClass = `active ${buttonClass}`;
    }
    return (
      <Button
        className={buttonClass}
        value={skillTitle}
        onClick={valueChangeHandler}
      >
        {skillTitle}
      </Button>
    );
  });

  return (
    <React.Fragment>
      {props.canEdit ? (
        <div className="skillLevelContainer">
          <h2>Skill Level: </h2>
          <div className="skillLevels">
          {editSkillLevel}
          </div>
        </div>
      ) : (
        <h2>{props.profile.level}</h2>
      )}
    </React.Fragment>
  );
};

export default ProfileSkillLevel;
