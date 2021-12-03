import React, { useState } from "react";

import "./ProfileName.css";

const ProfileName = (props) => {
  const [entrytValue, setEntryValue] = useState(props.profile.name);
  const valueChangeHandler = (e) => {
    setEntryValue(e.target.value);
    props.updateProfile({ ...props.editedProfile, name: e.target.value });
  };

  return (
    <React.Fragment>
      {props.canEdit ? (
        <div className="profile-name-edit">
          <h2>Name: </h2>
          <input
            className="name-edit-input"
            type="text"
            value={entrytValue}
            onChange={valueChangeHandler}
          />
        </div>
      ) : (
        <h2>{props.profile.name}</h2>
      )}
    </React.Fragment>
  );
};

export default ProfileName;
