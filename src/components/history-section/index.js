import React, { useRef, useEffect } from "react"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import Markdown from "../markdown"
import Section from "../section"
import RamblerLogo from "@/icons/rambler-logo.inline.svg"
import { CSSTransition } from "react-transition-group"
import styles from "./index.module.styl"
import Img from "gatsby-image"
import cn from "classnames"
import Close from "@/icons/close.inline.svg"

const ReferenceModal = ({ reference, setReferenceId, setIsReferenceVisible }) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (el && window.innerWidth <= 640) {
      disableBodyScroll(el)
    }
    return () => {
      enableBodyScroll(el)
    }
  }, [ref])
  return (
    <div
      ref={ref}
      className={cn(
        "fixed left-0 w-screen block sm:hidden pt-12 px-4 bg-white overflow-auto",
        styles.referenceModal
      )}
    >
      <Close
        className={cn(styles.referenceModalClose, "text-purple")}
        onClick={() => {
          setReferenceId(null)
          setIsReferenceVisible(false)
        }}
      />
      <Img className={cn(styles.referenceImage, "mt-4")} fluid={reference.image.fluid} />
      <Markdown className="text-xs text-center mt-4 px-8 mb-12">{reference.text.text}</Markdown>
    </div>
  )
}

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
      <div className="flex pb-8 sm:pb-28 mt-4 sm:mt-11">
        <div className="w-1/2 hidden sm:flex justify-center">
          <CSSTransition
            in={referenceId && isReferenceVisible}
            classNames="fade"
            timeout={200}
            onExited={() => setReferenceId(null)}
            mountOnEnter
            unmountOnExit
          >
            {reference ? (
              <div className={cn("relative", styles.referenceColumn)}>
                <Markdown className="text-xxs-D text-center">{reference.text.text}</Markdown>
                <div className={cn("absolute", styles.referenceImageBox)}>
                  <Img className={styles.referenceImage} fluid={reference.image.fluid} />
                </div>
              </div>
            ) : (
              <span />
            )}
          </CSSTransition>
        </div>
        <div className="sm:w-1/2">
          <Markdown
            setReferenceId={setReferenceId}
            setIsReferenceVisible={setIsReferenceVisible}
            className="text-xs text-ml-D mb-8 sm:mb-15"
          >
            {history.history}
          </Markdown>
          <RamblerLogo className={styles.ramblerLogo} />
        </div>
      </div>
      {referenceId && isReferenceVisible && (
        <ReferenceModal
          setReferenceId={setReferenceId}
          setIsReferenceVisible={setIsReferenceVisible}
          reference={reference}
        />
      )}
    </Section>
  )
}

export default History
