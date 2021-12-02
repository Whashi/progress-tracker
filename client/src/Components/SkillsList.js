import React from "react";
import Skill from "./Skill";

import "./SkillsList.css";

const SkillsList = (props) => {
  const updateSkills = (index, newSkill) => {
    const skillsClone = [...props.profileSkill];
    console.log(props.editedProfileSkill);
    skillsClone.splice(index, 1, newSkill);
    const updatedProfile = {
      ...props.profileSkill,
      [props.skillKey]: skillsClone,
    };
    props.updateProfile(updatedProfile);
  };
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
      <h3 className="skills-title">{props.title}</h3>
      <ul className="skills-list">{skillsList}</ul>
    </li>
  );
};

export default SkillsList;
