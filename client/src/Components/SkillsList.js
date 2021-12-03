import React from "react";
import Skill from "./Skill";

import "./SkillsList.css";

const SkillsList = (props) => {
  console.log(props.profileSkill, props.editedProfileSkill);
  let skillsClone = [...props.profileSkill]; // everytime component is rendered it copies the old data from profileskill
  const updateSkills = (index, newSkill) => {
    skillsClone.splice(index, 1, newSkill);
    const updatedProfile = {
      ...props.editedProfile,
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
