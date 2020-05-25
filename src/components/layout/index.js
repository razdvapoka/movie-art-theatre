import "@/styles/tailwind.styl"

import "./index.styl"

import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect } from "react"

import Header from "@/components/header"

import Footer from "../footer"

const Layout = ({ isMenuOpen, toggleMenu, children, headerText }) => {
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
      <Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} text={headerText} />
      <main className="py-25">{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
