import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileListItem from "../Components/ProfileListItem";
import Header from "../Components/Header";

import "./ProfileList.css";

const ProfileList = (props) => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const getProfiles = async () => {
      const response = await axios.get("http://localhost:5000/profile/", {
        headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
      });
      if (!response) {
        throw new Error("Something Went Wrong");
      }
      setProfiles(response.data.data);
    };
    setIsLoading(true);
    getProfiles().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (httpError) {
    return <p>{httpError}</p>;
  }
  const profilesList = profiles.map((profile) => {
    return <ProfileListItem key={profile.name} profile={profile} />;
  });

  return (
    <React.Fragment>
      <Header canEdit={props.authLevel} />
      <ul className="profile-list">{profilesList}</ul>
    </React.Fragment>
  );
};

export default ProfileList;
