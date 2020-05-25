import "@/styles/tailwind.styl"

import "./index.styl"

import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"

import Header from "@/components/header"

import Footer from "../footer"
import Intro from "../intro"

const Layout = ({ isMenuOpen, toggleMenu, children, headerText }) => {
  const [isIntroOn, setIsIntroOn] = useState(true)
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
      />
      {isIntroOn && <Intro setIsIntroOn={setIsIntroOn} />}
      <main className="py-25">{children}</main>
      <Footer isIntroOn={isIntroOn} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
