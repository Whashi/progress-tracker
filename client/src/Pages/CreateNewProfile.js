import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../Components/Header";

import "./CreateNewProfile.css";
import Card from "../UI/Card";
import Button from "../UI/Button";

const CreateNewProfile = (props) => {
  const history = useHistory();
  const [inputName, setInputName] = useState("");

  const nameChangeHandler = (e) => {
    setInputName(e.target.value);
  };

  const [inputPassword, setInputPassword] = useState("");

  const passwordChangeHandler = (e) => {
    setInputPassword(e.target.value);
  };

  const addProfile = async (profile) => {
    await axios
      .post("http://localhost:5000/profile/", profile, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((err) => console.log(`Error: ${err}`));
    history.push(`/profile-list`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addProfile({
      name: inputName,
      password: inputPassword,
    });
  };

  return (
    <React.Fragment>
      <Header id={localStorage.getItem("user-id")} />
      <Card className="create-new-profile-card">
        <div className="new-profile-container">
          <form className="new-profile-form" onSubmit={submitHandler}>
            <label className="new-profile-item" htmlFor="name">
              Name
            </label>
            <input
              className="new-profile-item"
              type="text"
              id="name"
              value={inputName}
              onChange={nameChangeHandler}
            />
            <label className="new-profile-item" htmlFor="name">
              Password
            </label>
            <input
              className="new-profile-item"
              type="password"
              id="password"
              value={inputPassword}
              onChange={passwordChangeHandler}
            />
            <Button className="new-profile-button">Add Profile</Button>
          </form>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default CreateNewProfile;
