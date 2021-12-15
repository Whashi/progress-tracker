import React from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button";

import "./Navigation.css";

const Navigation = (props) => {
  return (
    <ul className="nav-list">
      <li className="nav-item">
        <Link className="link" to={props.profileRoute}>
          Your Profile
        </Link>
      </li>
      <li className="nav-item">
        <Link className="link" to="/profile-list">
          Profile List
        </Link>
      </li>
      {props.authorized && (
        <li className="nav-item">
          <Link className="link" to="/new-profile">
            Create New Profile
          </Link>
        </li>
      )}
      <li>
        <Button className="logout-button nav-item" onClick={props.logOut}>
          Logout
        </Button>
      </li>
    </ul>
  );
};

export default Navigation;
