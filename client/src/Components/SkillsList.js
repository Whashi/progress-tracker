import React, { useState, useEffect } from "react";
import Skill from "./Skill";

import "./SkillsList.css";

const SkillsList = (props) => {
  const [skillsClone, setskillsClone] = useState();
  const [showSkillList, setShowSkillList] = useState(false)
  useEffect(() => {
    if (props.editedProfile[props.skillKey]) {
      setskillsClone(props.editedProfile[props.skillKey]);
    } else {
      setskillsClone(props.profile[props.skillKey]);
    }
  }, [skillsClone, props.editedProfile, props.profile, props.skillKey]);
  const updateSkills = (index, newSkill) => {
    setskillsClone(skillsClone.splice(index, 1, newSkill));
    const updatedProfile = {
      ...props.editedProfile,
      [props.skillKey]: skillsClone,
    };
    props.updateProfile(updatedProfile);
  };

  const skillListClass = showSkillList ? "skills-list" : "skills-list no-show"

  const showSkillListToggle = () => {
    setShowSkillList(!showSkillList)
  }

  const skillsList = props.profileSkill.map((skill, index) => {
    return (
      <Skill
        key={skill.name}
        skillData={skill}
        index={index}
        update={updateSkills}
        canEdit={props.canEdit}
      />
    );
  });
  return (
    <li className="skills-list-item">
      <h3 className="skills-title" onClick={showSkillListToggle}>{props.title}</h3>
      <ul className={skillListClass}>{skillsList}</ul>
    </li>
  );
};

export default SkillsList;
