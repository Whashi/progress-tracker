import React, { useState } from "react";
import Button from "../UI/Button";

import "./ProfileAuthLevel.css";

const ProfileAuthLevel = (props) => {
  const [entrytValue, setEntrytValue] = useState(props.profile.authorization);
  const valueChangeHandler = (e) => {
    setEntrytValue(e.target.value);
    props.updateProfile({
      ...props.editedProfile,
      authorization: e.target.value,
    });
  };

  const authLevelValues = ["Crew Member", "Crew Leader", "Administrator"];

  const authLevels = authLevelValues.map((authLevelValue, index) => {
    const buttonActive =
      index.toString() === entrytValue || index === entrytValue;
    let buttonClass = "skill-level-button";
    if (buttonActive) {
      buttonClass = `active ${buttonClass}`;
    }
    return (
      <Button
        key={index}
        className={buttonClass}
        value={index}
        onClick={valueChangeHandler}
      >
        {authLevelValue}
      </Button>
    );
  });

  return (
    <div>
      <h2>Authorization Level: </h2>
      {authLevels}
    </div>
  );
};

export default ProfileAuthLevel;
