import React, { useState, useEffect, useCallback } from "react"
import One from "@/icons/one.inline.svg"
import Two from "@/icons/two.inline.svg"
import Three from "@/icons/three.inline.svg"
import LogoBig from "@/icons/logo-big.inline.svg"
import LogoBigEn from "@/icons/logo-en.inline.svg"
import Welcome from "@/icons/welcome-2.inline.svg"
import WelcomeEn from "@/icons/welcome-2-en.inline.svg"
import styles from "./index.module.styl"
import cn from "classnames"
import FontFaceObserver from "fontfaceobserver"
import { useIntl } from "gatsby-plugin-intl"

const wait = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

const Intro = ({ setIsIntroOn, windowHeight }) => {
  const intl = useIntl()
  const WelcomeComponent = intl.locale === "en" ? WelcomeEn : Welcome

  const LogoComponent = intl.locale === "en" ? LogoBigEn : LogoBig

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
    [currentView, setCurrentView, setIsIntroOn]
  )
  const getView = useCallback(
    ({ windowHeight }) => {
      const logoHeight = `calc((150 / 666) * ${windowHeight}px)`
      if (currentView === 0) {
        return <Three className={cn("h-full", styles.logoP)} />
      } else if (currentView === 1) {
        return <Two className={cn("h-full", styles.logoP)} />
      } else if (currentView === 2) {
        return <One className={cn("h-full", styles.logoP)} />
      } else if (currentView === 3) {
        return (
          <div className="px-4 w-full">
            <LogoComponent className="text-black h-full w-full" />
          </div>
        )
      } else if (currentView === 4) {
        return (
          <>
            <WelcomeComponent className="h-full w-full hidden sm:block" />
            <div className="w-full h-full bg-black flex flex-col justify-between sm:hidden">
              <LogoComponent
                className={cn("px-4 w-full bg-white", styles.logoM)}
                style={{ height: logoHeight }}
              />
              <WelcomeComponent
                className={cn(
                  " w-full bg-white",
                  styles.logoM,
                  intl.locale === "en" ? "px-31" : "px-22"
                )}
                style={{ height: logoHeight }}
              />
            </div>
          </>
        )
      }
    },
    [currentView]
  )

  useEffect(() => {
    updateView()
  }, [])

  const padding = `calc((120 / 666) * ${windowHeight}px)`

  return (
    <div
      className={cn(
        "fixed left-0 w-screen text-center z-50",
        styles.intro,
        windowHeight ? "bg-white" : "bg-black"
      )}
      style={{
        top: padding,
        bottom: padding,
      }}
    >
      <div className="h-full flex justify-center">{getView({ windowHeight })}</div>
    </div>
  )
}

export default Intro
