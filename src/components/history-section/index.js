import React from "react"

import Markdown from "../markdown"
import Section from "../section"
import RamblerLogo from "@/icons/rambler-logo.inline.svg"
import styles from "./index.module.styl"

const History = ({ history }) => (
  <Section titleId="history">
    <div className="flex">
      <div className="w-1/2"></div>
      <div className="w-1/2">
        <Markdown className="text-ml mb-15">{history.history}</Markdown>
        <RamblerLogo className={styles.ramblerLogo} />
      </div>
    </div>
  </Section>
)

export default History
