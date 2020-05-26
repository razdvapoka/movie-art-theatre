import "@/styles/tailwind.styl"

import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"

import Header from "@/components/header"

import BigMenu from "../big-menu"
import Footer from "../footer"
import Intro from "../intro"
import cn from "classnames"
import styles from "./index.module.styl"

const Layout = ({ isMenuOpen, toggleMenu, children, headerText, team, galleryImage }) => {
  const [isIntroOn, setIsIntroOn] = useState(true)
  const [isSpread, setIsSpread] = useState(false)
  useEffect(() => {
    require("smoothscroll-polyfill").polyfill()
  }, [])
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
      />
      {isIntroOn && <Intro setIsIntroOn={setIsIntroOn} />}
      {!isIntroOn && (
        <BigMenu
          team={team}
          galleryImage={galleryImage}
          isSpread={isSpread}
          setIsSpread={setIsSpread}
        />
      )}
      <main className={cn(styles.main, "py-25", isSpread ? "opacity-100" : "opacity-0")}>
        {children}
      </main>
      <Footer isIntroOn={isIntroOn} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
