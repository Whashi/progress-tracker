import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import useInputField from "../Hooks/input-field";
import axios from "axios";
import "./Login.css";
import Card from "../UI/Card";
import Button from "../UI/Button";

const Login = (props) => {
  const {
    enteredValue: nameInput,
    valueIsValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
  } = useInputField((value) => value.trim() !== "");
  const {
    enteredValue: passwordInput,
    valueIsValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
  } = useInputField((value) => value.trim() !== "");

  const [httpError, setHttpError] = useState();

  const history = useHistory();

  let formIsValid = false;

  if (nameIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const getProfileId = async (name, password) => {
    const response = await axios
      .post(
        "http://localhost:5000/profile/login/",
        {
          name,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch((err) => {
        setHttpError(err.response.data.msg);
      });
    if (response) {
      localStorage.setItem("x-auth-token", response.data.token);
      localStorage.setItem("user-id", response.data.id);
      props.setAuthLevel(response.data.authLevel);
      // Make a database with current user ids that are logged on and tokens as their key. Have a function check the database every api call
      history.push(`/profile/${response.data.id}`);
    }
  };

  const submissionHandler = (e) => {
    e.preventDefault();
    if (!nameIsValid && !passwordIsValid) {
      return;
    }
    getProfileId(nameInput, passwordInput).catch((err) => {
      setHttpError(err);
    });
  };

  return (
    <Fragment>
      <h1 className="login-title">Progress Tracker</h1>
      <Card className="login-card">
        <h2 className="login-header">Login</h2>
        <div className="login-container">
        <form className="login-item-form" onSubmit={submissionHandler}>
          <label className="login-item" htmlFor="name">
            Name
          </label>
          <input
            className="login-item"
            type="text"
            id="name"
            onBlur={nameBlurHandler}
            onChange={nameChangeHandler}
            value={nameInput}
          />
          {nameHasError && <p className="error">Please enter a valid name</p>}
          <label className="login-item" htmlFor="password">
            Password
          </label>
          <input
            className="login-item"
            type="password"
            id="password"
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
            value={passwordInput}
          />
          {passwordHasError && (
            <p className="error">Please enter a valid password</p>
          )}
          <Button className="login-button" disabled={!formIsValid}>
            Login
          </Button>
          {httpError && (
            <p className="error">
              Either your password sucks or you dont have a profile
            </p>
          )}
        </form>
        </div>
      </Card>
    </Fragment>
  );
};

export default Login;
