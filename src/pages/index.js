import { graphql } from "gatsby"
import React, { useMemo, useCallback, useState } from "react"

import Contacts from "@/components/contacts-section"
import Gallery from "@/components/gallery-section"
import History from "@/components/history-section"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import Team from "@/components/team-section"

import Markdown from "../components/markdown"

const IndexPage = ({ data: { contentfulPage: pageData } }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [referenceId, setReferenceId] = useState(null)
  const [isReferenceVisible, setIsReferenceVisible] = useState(false)

  const references = useMemo(
    () =>
      pageData.references.reduce(
        (refMap, ref) => ({
          ...refMap,
          [ref.referenceId]: ref,
        }),
        {}
      ),
    [pageData.references]
  )

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen)
  }, [isMenuOpen, setIsMenuOpen])

  return (
    <Layout
      toggleMenu={toggleMenu}
      isMenuOpen={isMenuOpen}
      headerText={pageData.headerText}
      galleryImage={pageData.gallery[0].asset}
      team={pageData.team}
    >
      <SEO title="художественный" />
      <Gallery gallery={pageData.gallery} />
      <History
        referenceId={referenceId}
        setReferenceId={setReferenceId}
        isReferenceVisible={isReferenceVisible}
        setIsReferenceVisible={setIsReferenceVisible}
        history={pageData.history}
        references={references}
      />
      <Team team={pageData.team} />
      <Contacts contacts={pageData.contacts} contactsMobile={pageData.contactsMobile} />
      <div className="flex justify-center text-center text-xs text-ml-D">
        <Markdown className="mt-15 sm:mt-30 mb-30 sm:mb-13">{pageData.credits.credits}</Markdown>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query MainPage($locale: String) {
    contentfulPage(title: { eq: "MAIN" }, node_locale: { eq: $locale }) {
      headerText
      title
      credits {
        credits
      }
      gallery {
        title
        description {
          description
        }
        asset {
          fluid(maxWidth: 915) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
      team {
        id
        name
        role
        url
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
      contactsMobile {
        contactsMobile
      }
      references {
        title
        text {
          text
        }
        referenceId
        image {
          fluid(maxWidth: 260) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`

export default IndexPage
