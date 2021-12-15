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
    let buttonClass = "auth-level-button";
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
    <div className="auth-level-container">
      <h2>Authorization Level: </h2>
      <div className="auth-levels">{authLevels}</div>
    </div>
  );
};

export default ProfileAuthLevel;
