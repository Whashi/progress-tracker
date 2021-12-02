import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";

import "./Profile.css";
import SkillsList from "../Components/SkillsList";
import ProfileName from "../Components/ProfileName";
import ProfileSkillLevel from "../Components/ProfileSkillLevel";
import ProfileAuthLevel from "../Components/ProfileAuthLevel";
import Button from "../UI/Button";

const Profile = (props) => {
  const [profile, setProfile] = useState();
  const [editedProfile, setEditedProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [profileAuthLevel, setProfileAuthLevel] = useState();
  const [httpError, setHttpError] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [editToggle, setEditToggle] = useState(false);

  const history = useHistory();
  const params = useParams();
  const profileId = params.profileId;
  const authorized = profileAuthLevel === 2;

  useEffect(() => {
    const getProfile = async (id) => {
      const response = await axios
        .get(`http://localhost:5000/profile/${id}`, {
          headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
        })
        .catch((err) => console.log(err.response.data.msg));
      if (!response) {
        history.replace("/login");
      }
      setProfile(response.data.data);
      setEditedProfile(response.data.data)
    };

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
    setIsLoading(true);
    getProfile(profileId).catch((error) => {
      setIsLoading(false);
      setHttpError(error);
    });
    getProfileAuthLevel(localStorage.getItem("user-id")).catch((error) => {
      setHttpError(error);
    });
    setIsLoading(false);
    setIsUpdating(false);
  }, [profileId, history, isUpdating]);

  if (!localStorage.getItem("x-auth-token")) {
    history.replace("/login");
  }

  if (isLoading || !profile) {
    return <p>Loading...</p>;
  }

  if (httpError) {
    return <p>{httpError}</p>;
  }

  if (!profile) {
    history.replace("/login");
  }

  const deleteProfile = async (e) => {
    e.preventDefault();
    await axios.delete(`http://localhost:5000/profile/${profileId}`);
    history.replace("/profile-list")
  };

  const saveProfile = async (updatedProfile) => {
    await axios.patch(
      `http://localhost:5000/profile/${profileId}`,
      updatedProfile
    );
    setIsUpdating(true);
    setEditToggle(false);
  };

  const editToggleHandler = () => {
    setEditToggle(!editToggle);
  };

  const updateProfile = (newData) => {
    setEditedProfile(newData)
  }

  let buttons;

  if (authorized) {
    if (editToggle) {
      buttons = (
        <div className="buttons-container ">
          <Button className="delete-button" onClick={deleteProfile}>
            Delete
          </Button>
          <Button
            className="save-button"
            onClick={saveProfile.bind(this, editedProfile)}
          >
            Save
          </Button>
          <Button className="toggle-button" onClick={editToggleHandler}>
            Cancel
          </Button>
        </div>
      );
    } else {
      buttons = (
        <div className="buttons-container ">
          <Button className="toggle-button" onClick={editToggleHandler}>
            Edit
          </Button>
        </div>
      );
    }
  }

  const skillKeyes = [
    "skillsAprenticeLevel1",
    "skillsAprenticeLevel2",
    "skillsJourneymanLevel1",
    "skillsJourneymanLevel2",
  ];

  const skillTitles = [
    "Apprentice Level 1",
    "Apprentice Level 2",
    "Journeyman Level 1",
    "Journeyman Level 2",
  ];

  const profileSkills = [
    profile.skillsAprenticeLevel1,
    profile.skillsAprenticeLevel2,
    profile.skillsJourneymanLevel1,
    profile.skillsJourneymanLevel2,
  ];

  const editedProfileSkills = [
    editedProfile.skillsAprenticeLevel1,
    editedProfile.skillsAprenticeLevel2,
    editedProfile.skillsJourneymanLevel1,
    editedProfile.skillsJourneymanLevel2,
  ];

  const skills = profileSkills.map((profileSkill, index) => {
    // console.log(editedProfileSkills[index]);
    return (
      <SkillsList
        key={index}
        skillKey={skillKeyes[index]}
        title={skillTitles[index]}
        profile={profile}
        editedProfile={editedProfile}
        profileSkill={profileSkill}
        editedProfileSkill={editedProfileSkills[index]}
        updateProfile={updateProfile}
        canEdit={editToggle}
      />
    );
  });

  return (
    <div className="profile">
      <Header id={profile._id} auth={props.authLevel} />
      <div className="profile-top-container">
        <div className="profile-info-container">
          <ProfileName
            canEdit={editToggle}
            profile={profile}
            editedProfile={editedProfile}
            updateProfile={updateProfile}
          />
          <ProfileSkillLevel
            canEdit={editToggle}
            profile={profile}
            editedProfile={editedProfile}
            updateProfile={updateProfile}
            skillTitles={skillTitles}
          />
          {editToggle && (
            <ProfileAuthLevel
              canEdit={editToggle}
              profile={profile}
              editedProfile={editedProfile}
              updateProfile={updateProfile}
            />
          )}
        </div>
        {buttons}
      </div>
      <ul className="skills">{skills}</ul>
    </div>
  );
};

export default Profile;
