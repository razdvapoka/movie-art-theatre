import React, { useState, useEffect, useCallback } from "react"
import One from "@/icons/one.inline.svg"
import Two from "@/icons/two.inline.svg"
import Three from "@/icons/three.inline.svg"
import LogoBig from "@/icons/logo-big.inline.svg"
import Welcome from "@/icons/welcome.inline.svg"
import WelcomeEn from "@/icons/welcome-en.inline.svg"
import styles from "./index.module.styl"
import cn from "classnames"
import FontFaceObserver from "fontfaceobserver"
import { useIntl } from "gatsby-plugin-intl"

const wait = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

const Intro = ({ setIsIntroOn }) => {
  const intl = useIntl()
  const WelcomeComponent = intl.locale === "en" ? WelcomeEn : Welcome

  const [currentView, setCurrentView] = useState(0)
  const updateView = useCallback(
    (view = -1) => {
      if (view === 4) {
        const fontA = new FontFaceObserver("CoFoKomsomolskayaBeta-Regular")
        const fontB = new FontFaceObserver("CoFoSans-Medium")
        Promise.all([fontA.load(), fontB.load(), wait(1000)]).then(() => {
          setIsIntroOn(false)
        })
      } else {
        setCurrentView(window.innerWidth < 640 && view === 2 ? 4 : view + 1)
        setTimeout(() => updateView(view + 1), 1000)
      }
    },
    [setCurrentView, setIsIntroOn]
  )
  const getView = useCallback(() => {
    if (currentView === 0) {
      return <One className={cn("h-full", styles.logoP)} />
    } else if (currentView === 1) {
      return <Two className={cn("h-full", styles.logoP)} />
    } else if (currentView === 2) {
      return <Three className={cn("h-full", styles.logoP)} />
    } else if (currentView === 3) {
      return (
        <div className="px-4 w-full">
          <LogoBig className="h-full w-full" />
        </div>
      )
    } else if (currentView === 4) {
      return (
        <>
          <WelcomeComponent className="h-full w-full hidden sm:block" />
          <div className="w-full h-full bg-black flex flex-col justify-between sm:hidden">
            <LogoBig className={cn("px-4 w-full bg-white", styles.logoM)} />
            <WelcomeComponent className={cn("px-11 w-full bg-white", styles.logoM)} />
          </div>
        </>
      )
    }
  }, [currentView])
  useEffect(() => {
    updateView()
  }, [updateView])
  return (
    <div className={cn("fixed bg-white left-0 w-screen text-center z-50", styles.intro)}>
      <div className="h-full flex justify-center">{getView()}</div>
    </div>
  )
}

export default Intro
