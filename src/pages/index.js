import { graphql } from "gatsby"
import React, { useCallback, useState } from "react"

import Layout from "@/components/layout"
import SEO from "@/components/seo"
import History from "@/components/history-section"
import Team from "@/components/team-section"
import Contacts from "@/components/contacts-section"

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
      <History history={pageData.history} />
      <Team team={pageData.team} />
      <Contacts contacts={pageData.contacts} />
      <footer>footer</footer>
    </Layout>
  )
}

export const query = graphql`
  query MainPage($locale: String) {
    contentfulPage(title: { eq: "main" }, node_locale: { eq: $locale }) {
      headerText
      title
      team {
        id
        name
        role
        image {
          fixed(width: 360, height: 360) {
            src
          }
        }
      }
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
