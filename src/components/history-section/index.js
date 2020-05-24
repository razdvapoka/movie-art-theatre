import React from "react"

import Markdown from "../markdown"
import Section from "../section"
import RamblerLogo from "@/icons/rambler-logo.inline.svg"
import { CSSTransition } from "react-transition-group"
import styles from "./index.module.styl"
import Img from "gatsby-image"
import cn from "classnames"

const History = ({
  history,
  references,
  referenceId,
  setReferenceId,
  isReferenceVisible,
  setIsReferenceVisible,
}) => {
  const reference = references[referenceId]
  return (
    <Section titleId="history">
      <div className="flex pb-28 mt-11">
        <div className="w-1/2 flex justify-center">
          <CSSTransition
            in={referenceId && isReferenceVisible}
            classNames="fade"
            timeout={200}
            onExited={() => setReferenceId(null)}
            mountOnEnter
            unmountOnExit
          >
            {reference && (
              <div className={cn("relative", styles.referenceColumn)}>
                <Markdown className="text-xxs-D text-center">{reference.text.text}</Markdown>
                <div className={cn("absolute", styles.referenceImageBox)}>
                  <Img className={styles.referenceImage} fluid={reference.image.fluid} />
                </div>
              </div>
            )}
          </CSSTransition>
        </div>
        <div className="w-1/2">
          <Markdown
            setReferenceId={setReferenceId}
            setIsReferenceVisible={setIsReferenceVisible}
            className="text-ml mb-15"
          >
            {history.history}
          </Markdown>
          <RamblerLogo className={styles.ramblerLogo} />
        </div>
      </div>
    </Section>
  )
}

export default History
