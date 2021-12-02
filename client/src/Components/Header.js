import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../UI/Button";

import "./Header.css";

const Header = (props) => {
  const history = useHistory();
  const [profileAuthLevel, setProfileAuthLevel] = useState();
  const [httpError, setHttpError] = useState();
  const authorized = profileAuthLevel === 2;
  const profileRoute = "/profile/" + localStorage.getItem("user-id");

  useEffect(() => {
    const getProfileAuthLevel = async (id) => {
      const response = await axios
        .get(`http://localhost:5000/profile/${id}`, {
          headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
        })
        .catch((err) => console.log(err.response.data.msg));
      if (!response) {
        history.replace("/login");
      }
      setProfileAuthLevel(response.data.data.authorization);
    };
    getProfileAuthLevel(localStorage.getItem("user-id")).catch((error) => {
      setHttpError(error);
    });
  }, [history, profileAuthLevel]);

  const logOut = () => {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("user-id");
    history.replace("/login");
  };

  if (httpError) {
    return <h3>{httpError}</h3>
  }

  return (
    <header className="header-container">
      <div className="title-container">
        <h3 className="header-title">Progress Tracker</h3>
      </div>
      <nav className="nav-container">
        <ul className="nav-list">
          <li className="nav-item">
            <Link className="link" to={profileRoute}>
              Your Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link" to="/profile-list">
              Profile List
            </Link>
          </li>
          {authorized && (
            <li className="nav-item">
              <Link className="link" to="/new-profile">
                Create New Profile
              </Link>
            </li>
          )}
          <li>
            <Button className="logout-button nav-item" onClick={logOut}>
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
