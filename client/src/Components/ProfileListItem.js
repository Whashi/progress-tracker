import React from "react";
import { useHistory } from "react-router-dom";
import Card from "../UI/Card";
import SkillSummary from "./SkillSummary";

import "./ProfileListItem.css";

const ProfileListItem = (props) => {
  const history = useHistory();

  const clickHandler = () => {
    history.push(`profile/${props.profile._id}`);
  };

  const profileSkills = [
    props.profile.skillsAprenticeLevel1,
    props.profile.skillsAprenticeLevel2,
    props.profile.skillsJourneymanLevel1,
    props.profile.skillsJourneymanLevel2,
  ];

  const skillTitles = [
    "Apprentice Level 1",
    "Apprentice Level 2",
    "Journeyman Level 1",
    "Journeyman Level 2",
  ];

  const skillSummaries = profileSkills.map((profileSkill, index) => {
    return (
      <SkillSummary
        key={skillTitles[index]}
        profileSkill={profileSkill}
        title={skillTitles[index]}
      />
    );
  });

  const authLevelValues = ["Crew Member", "Crew Leader", "Administrator"];

  return (
    <li className="profile-list-container">
      <Card className="profile-list-card" onClick={clickHandler}>
        <div className="profile-list-item">
          <h3 className="profile-name">{props.profile.name}</h3>
          <div className="skill-summaries">{skillSummaries}</div>
          <div>
            <h4>{props.profile.level}</h4>
            <h4>{authLevelValues[props.profile.authorization]}</h4>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default ProfileListItem;
