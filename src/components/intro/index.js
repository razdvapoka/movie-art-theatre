import React, { useState, useEffect, useCallback } from "react"
import One from "@/icons/one.inline.svg"
import Two from "@/icons/two.inline.svg"
import Three from "@/icons/three.inline.svg"
import LogoBig from "@/icons/logo-big.inline.svg"
import Welcome from "@/icons/welcome.inline.svg"
import styles from "./index.module.styl"
import cn from "classnames"
import FontFaceObserver from "fontfaceobserver"

const wait = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })

const Intro = ({ setIsIntroOn }) => {
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
        setCurrentView(view + 1)
        setTimeout(() => updateView(view + 1), 1000)
      }
    },
    [setCurrentView]
  )
  const getView = useCallback(() => {
    if (currentView === 0) {
      return <One className="h-full" />
    } else if (currentView === 1) {
      return <Two className="h-full" />
    } else if (currentView === 2) {
      return <Three className="h-full" />
    } else if (currentView === 3) {
      return <LogoBig className="h-full w-full" />
    } else if (currentView === 4) {
      return <Welcome className="h-full w-full" />
    }
  }, [currentView])
  useEffect(() => {
    updateView()
  }, [])
  return (
    <div className={cn("fixed bg-white left-0 w-screen text-center z-50", styles.intro)}>
      <div className="h-full flex justify-center">{getView()}</div>
    </div>
  )
}

export default Intro
