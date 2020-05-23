import React from "react"
import cn from "classnames"

import Markdown from "../markdown"
import Section from "../section"
import styles from "./index.module.styl"

const Contacts = ({ contacts }) => (
  <Section titleId="contacts">
    <div className="mt-11">
      <Markdown className={cn("text-center", styles.contactsText)}>{contacts.contacts}</Markdown>
      <div className="mt-18">map</div>
    </div>
  </Section>
)

export default Contacts
