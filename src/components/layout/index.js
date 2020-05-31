import "@/styles/tailwind.styl"

import { FixedBottom } from "react-fixed-bottom"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import styles from "./index.module.styl"
import cn from "classnames"

import Header from "@/components/header"

import BigMenu from "../big-menu"
import ClientOnly from "../client-only"
import Footer from "../footer"
import Intro from "../intro"

const Layout = ({
  currentSection,
  isMenuOpen,
  toggleMenu,
  children,
  headerText,
  team,
  galleryImage,
}) => {
  const [isIntroOn, setIsIntroOn] = useState(true)
  const [isSpread, setIsSpread] = useState(false)
  useEffect(() => {
    require("smoothscroll-polyfill").polyfill()
  }, [])

  const [windowHeight, setWindowHeight] = useState(null)
  const updateWindowHeight = () => {
    setWindowHeight(window.innerHeight)
  }

  useEffect(() => {
    updateWindowHeight()
    window.addEventListener("resize", updateWindowHeight)
    //updateView()
    return () => {
      window.removeEventListener("resize", updateWindowHeight)
    }
  }, [])

  useEffect(() => {
    const spread = () => {
      if (window.scrollY <= 0) {
        setIsSpread(false)
      } else {
        setIsSpread(true)
      }
    }
    window.addEventListener("scroll", spread)
    return () => {
      window.removeEventListener("scroll", spread)
    }
  }, [setIsSpread])

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div>
      <Header
        isIntroOn={isIntroOn}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
        text={headerText}
        setIsSpread={setIsSpread}
        windowHeight={windowHeight}
      />
      {isIntroOn && <Intro setIsIntroOn={setIsIntroOn} windowHeight={windowHeight} />}
      {!isIntroOn && (
        <BigMenu
          team={team}
          galleryImage={galleryImage}
          isSpread={isSpread}
          setIsSpread={setIsSpread}
          currentSection={currentSection}
        />
      )}
      <main
        className={cn(
          isSpread ? styles.mainSpread : styles.main,
          isSpread ? "opacity-100" : "opacity-0",
          "sm:py-25 max-w-screen overflow-hidden"
        )}
      >
        {children}
      </main>
      <ClientOnly>
        <FixedBottom>
          <Footer isIntroOn={isIntroOn} windowHeight={windowHeight} />
        </FixedBottom>
      </ClientOnly>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
