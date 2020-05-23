import React from "react"
import Section from "../section"
import styles from "./index.module.styl"
import cn from "classnames"

const TeamMember = ({ role, name, image }) => (
  <div className={cn("flex flex-col items-center text-center", styles.teamMember)}>
    <img className={styles.teamMemberImage} src={image.fixed.src} />
    <div className="mt-17 text-l-D px-10">{name}</div>
    <hr className={cn("my-5 border-black border-t-2", styles.teamMemberSep)} />
    <div className="text-ml-D">{role}</div>
  </div>
)

const Team = ({ team }) => (
  <Section titleId="team">
    <div className="flex justify-around pb-30 mt-13">
      {team.map((teamMember, id) => (
        <TeamMember key={id} {...teamMember} />
      ))}
    </div>
  </Section>
)

export default Team
