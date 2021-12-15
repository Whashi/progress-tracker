import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navigation from "./Navigation";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";

import "./Header.css";
import Button from "../UI/Button";

const Header = (props) => {
  const history = useHistory();
  const [profileAuthLevel, setProfileAuthLevel] = useState();
  const [httpError, setHttpError] = useState();
  const authorized = profileAuthLevel === 2;
  const profileRoute = "/profile/" + localStorage.getItem("user-id");
  const [hamburgerToggle, setHamburgerToggle] = useState(false);

  useEffect(() => {
    const getProfileAuthLevel = async (id) => {
      const response = await axios
        .get(`/profile/${id}`, {
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
    return <h3>{httpError}</h3>;
  }

  const hamburgerClickHandler = () => {
    setHamburgerToggle(!hamburgerToggle);
  };

  return (
    <React.Fragment>
      <header className="header-container">
        <div className="title-container">
          <h3 className="header-title">Progress Tracker</h3>
        </div>
        <nav className="hamburger-toggle-container">
          <div className="hamburger-toggle" onClick={hamburgerClickHandler}>
            {hamburgerToggle ? <CancelIcon /> : <MenuIcon />}
          </div>
        </nav>
      </header>
      {hamburgerToggle && (
        <Navigation
          profileRoute={profileRoute}
          authorized={authorized}
          logOut={logOut}
        />
      )}
    </React.Fragment>
  );
};

export default Header;
