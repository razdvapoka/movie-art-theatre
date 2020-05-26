import Img from "gatsby-image"
import React, { useState, useCallback } from "react"

import { sequence } from "../../utils"
import Markdown from "../markdown"
import Section from "../section"
import styles from "./index.module.styl"
import cn from "classnames"
import { TransitionGroup, CSSTransition } from "react-transition-group"

const Gallery = ({ gallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentItem = gallery[currentIndex]
  return (
    <Section titleId="gallery">
      <div className="flex px-4 mt-12 mb-22">
        <div className="w-1/8"></div>
        <div className={cn("w-3/4", styles.itemImage)}>
          <TransitionGroup className="h-full relative">
            <CSSTransition key={currentIndex} timeout={300} classNames="item">
              <div className="h-full">
                <Img className="h-full" fluid={currentItem.asset.fluid} />
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <div className="w-1/8 flex flex-col justify-between pl-4 text-center text-xxs-D">
          <div className="relative">
            <TransitionGroup>
              <CSSTransition key={currentIndex} timeout={300} classNames="item">
                <Markdown>{currentItem.description.description}</Markdown>
              </CSSTransition>
            </TransitionGroup>
          </div>
          <ul>
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
