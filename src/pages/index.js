import "intersection-observer"
import { graphql } from "gatsby"
import React, { useEffect, useRef, useMemo, useCallback, useState } from "react"

import Contacts from "@/components/contacts-section"
import Gallery from "@/components/gallery-section"
import History from "@/components/history-section"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import Team from "@/components/team-section"

import Markdown from "../components/markdown"

const max = obj =>
  Object.keys(obj).reduce((max, key) => {
    return max == null || obj[key] > max.maxItem.value ? { maxItem: { value: obj[key], key } } : max
  }, null)

const o = { gallery: 0.8017301847089081, history: 0, team: 0, contacts: 0 }

const IndexPage = ({ data: { contentfulPage: pageData } }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [referenceId, setReferenceId] = useState(null)
  const [isReferenceVisible, setIsReferenceVisible] = useState(false)
  const [intersections, setIntersections] = useState({})
  const [currentSection, setCurrentSection] = useState(null)

  useEffect(() => {
    console.log(
      "%c This site was designed by Electric Red studio (https://electricred.design)",
      "background: rgb(47,60,73); color: white;"
    )
    console.log(
      "%c and developed by Sergey Zakharov (https://sergeyzakharov.dev)",
      "background: rgb(47,60,73); color: white;"
    )
  }, [])

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

  const updateIntersection = (id, intersection) => {
    setIntersections(intersections => {
      return {
        ...intersections,
        [id]: intersection ? intersection.intersectionRatio : 0,
      }
    })
  }

  useEffect(() => {
    const maxIntersection = max(intersections)
    if (maxIntersection) {
      setCurrentSection(maxIntersection.maxItem)
    }
  }, [intersections])

  return (
    <Layout
      toggleMenu={toggleMenu}
      isMenuOpen={isMenuOpen}
      headerText={""}
      galleryImage={pageData.gallery[0].asset}
      team={pageData.team}
      currentSection={currentSection}
    >
      <SEO title={`Кинотеатр «Художественный»`} />
      <Gallery updateIntersection={updateIntersection} gallery={pageData.gallery} />
      <History
        updateIntersection={updateIntersection}
        referenceId={referenceId}
        setReferenceId={setReferenceId}
        isReferenceVisible={isReferenceVisible}
        setIsReferenceVisible={setIsReferenceVisible}
        history={pageData.history}
        references={references}
      />
      <Team updateIntersection={updateIntersection} team={pageData.team} />
      <Contacts
        updateIntersection={updateIntersection}
        contacts={pageData.contacts}
        contactsMobile={pageData.contactsMobile}
      />
      <div className="flex justify-center text-center text-xs text-xs-D">
        <div className="mt-15 sm:mt-30 mb-30 sm:mb-13" />
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
