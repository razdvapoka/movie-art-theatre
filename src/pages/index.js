import { graphql } from "gatsby"
import React, { useCallback, useState } from "react"

import Layout from "@/components/layout"
import SEO from "@/components/seo"

import Markdown from "../components/markdown"
import Section from "../components/section"

const IndexPage = ({ data: { contentfulPage: pageData } }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen)
  }, [isMenuOpen, setIsMenuOpen])

  return (
    <Layout toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} headerText={pageData.headerText}>
      <SEO title="художественный" />
      <Section titleId="gallery"></Section>
      <Section titleId="history">
        <div className="flex">
          <div className="w-1/2"></div>
          <Markdown className="text-ml w-1/2">{pageData.history.history}</Markdown>
        </div>
      </Section>
      <Section titleId="team"></Section>
      <Section titleId="contacts"></Section>
      <footer>footer</footer>
    </Layout>
  )
}

export const query = graphql`
  query MainPage($locale: String) {
    contentfulPage(title: { eq: "main" }, node_locale: { eq: $locale }) {
      headerText
      title
      history {
        history
      }
      contacts {
        contacts
      }
    }
  }
`

export default IndexPage
