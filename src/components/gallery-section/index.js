import Img from "gatsby-image"
import React, { useState, useCallback } from "react"

import { sequence } from "../../utils"
import Markdown from "../markdown"
import Section from "../section"
import styles from "./index.module.styl"
import cn from "classnames"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { useSwipeable } from "react-swipeable"

const Gallery = ({ gallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentItem = gallery[currentIndex]
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      setCurrentIndex(index => (index > 0 ? currentIndex - 1 : currentIndex))
    },
    onSwipedLeft: () => {
      setCurrentIndex(index => (index < gallery.length - 1 ? currentIndex + 1 : currentIndex))
    },
  })
  const handleClick = () => {
    setCurrentIndex(index => (index < gallery.length - 1 ? currentIndex + 1 : currentIndex))
  }
  return (
    <Section titleId="gallery">
      <div className="flex flex-col sm:flex-row sm:px-4 mt-4 sm:mt-12 mb-16 sm:mb-22">
        <div className="hidden sm:block sm:w-1/8"></div>
        <div className={cn("sm:w-3/4", styles.itemImage)} {...swipeHandlers} onClick={handleClick}>
          <TransitionGroup className="h-full relative">
            <CSSTransition key={currentIndex} timeout={300} classNames="item">
              <div className="h-full">
                <Img className="h-full" fluid={currentItem.asset.fluid} />
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <div
          className={`
            sm:w-1/8
            flex flex-row-reverse items-start sm:flex-col justify-between
            sm:pl-4
            text-center text-xs text-xxs-D
            mt-4 sm:mt-0
          `}
        >
          <div className="relative w-1/2 sm:w-full">
            <TransitionGroup>
              <CSSTransition key={currentIndex} timeout={300} classNames="item">
                <Markdown>{currentItem.description.description}</Markdown>
              </CSSTransition>
            </TransitionGroup>
          </div>
          <ul className="flex sm:block">
            {sequence(gallery.length).map((_, index) => (
              <li
                key={index}
                className={cn("cursor-pointer relative", styles.itemButton, {
                  [`${styles.itemButtonActive} pointer-events-none`]: index === currentIndex,
                })}
                onClick={() => setCurrentIndex(index)}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

export default Gallery
