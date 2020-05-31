import React from "react"
import Section from "../section"
import styles from "./index.module.styl"
import cn from "classnames"

const TeamMember = ({ url, role, name, image }) => (
  <div className={cn("flex flex-col items-center text-center", styles.teamMember)}>
    <img className={cn(styles.teamMemberImage, "rounded-full")} src={image.fixed.src} alt="" />
    <a
      href={url}
      className={("block text-mk mt-4 sm:mt-17 text-l-D px-4 sm:px-10", styles.teamMemberName)}
    >
      {name}
    </a>
    <hr className={cn("my-4 sm:my-5 border-black border-t sm:border-t-2", styles.teamMemberSep)} />
    <div className="text-xs text-ml-D">{role}</div>
  </div>
)

const Team = ({ team }) => (
  <Section titleId="team">
    <div className="flex flex-col items-center sm:items-start sm:flex-row sm:justify-around pb-8 sm:pb-30 mt-8 sm:mt-13">
      {team.map((teamMember, id) => (
        <TeamMember key={id} {...teamMember} />
      ))}
    </div>
  </Section>
)

export default Team
