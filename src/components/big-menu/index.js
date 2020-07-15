import React, { useEffect, useState } from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import cn from "classnames"
import styles from "./index.module.styl"
import { useIntl } from "gatsby-plugin-intl"
import { CSSTransition } from "react-transition-group"
import RamblerLogo from "@/icons/rambler-logo.inline.svg"
import TeamIcon from "@/icons/team.inline.svg"
import GalleryIcon from "@/icons/gallery.inline.svg"
import ContactsIcon from "@/icons/contacts.inline.svg"
import HistoryIcon from "@/icons/history-upd.inline.svg"
import TeamIconEn from "@/icons/team-en.inline.svg"
import GalleryIconEn from "@/icons/gallery-en.inline.svg"
import ContactsIconEn from "@/icons/contacts-en.inline.svg"
import HistoryIconEn from "@/icons/history-en.inline.svg"
import { wait } from "@/utils"

const Team = ({ items }) => {
  return (
    <div className={cn(styles.team, "absolute top-0 flex")}>
      {items.map((item, itemIndex) => (
        <div className={cn(styles.teamMember, `team-member-${itemIndex}`)} key={itemIndex}>
          <Img className="w-full h-full rounded-full" fixed={item.image.fixed} />
        </div>
      ))}
    </div>
  )
}

const BigMenu = ({ currentSection, galleryImage, team, contactsImage, isSpread, setIsSpread }) => {
  const data = useStaticQuery(graphql`
    query {
      contactsImage: file(relativePath: { eq: "contacts-image.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [rowHeight, setRowHeight] = useState(null)
  const [hoveredSection, setHoveredSection] = useState(null)
  const intl = useIntl()

  const updateRowHeight = () => {
    const newRowHeight = `(${window.innerHeight}px - 6.1538rem) / 4`
    const newRowHeightSpread = `(${window.innerHeight}px - 6.1538rem) / 4`
    setRowHeight(newRowHeight)
  }

  useEffect(() => {
    updateRowHeight()
    window.addEventListener("resize", updateRowHeight)
    if (!isMenuVisible) {
      wait(300).then(() => setIsMenuVisible(true))
    }
    return () => {
      window.removeEventListener("resize", updateRowHeight)
    }
  }, [])

  const handleClick = section => {
    setHoveredSection(null)
    const sectionEl = document.querySelector(`#${section}`)
    if (window.innerWidth > 640) {
      sectionEl.scrollIntoView()
      wait(300).then(() => {
        setIsSpread(true)
      })
    } else {
      setIsSpread(true)
      wait(300).then(() => {
        sectionEl.scrollIntoView({
          behavior: "smooth",
        })
      })
    }
  }

  const TeamIconComponent = intl.locale === "en" ? TeamIconEn : TeamIcon
  const teamIconClassName = intl.locale === "en" ? styles.teamIconBoxEn : styles.teamIconBox
  const teamIconClassNameSpread =
    intl.locale === "en" ? styles.teamIconBoxEnSpread : styles.teamIconBoxSpread
  const GalleryIconComponent = intl.locale === "en" ? GalleryIconEn : GalleryIcon
  const galleryIconClassName =
    intl.locale === "en" ? styles.galleryIconBoxEn : styles.galleryIconBox
  const galleryIconClassNameSpread =
    intl.locale === "en" ? styles.galleryIconBoxEnSpread : styles.galleryIconBoxSpread
  const HistoryIconComponent = intl.locale === "en" ? HistoryIconEn : HistoryIcon
  const historyIconClassName =
    intl.locale === "en" ? styles.historyIconBoxEn : styles.historyIconBox
  const historyIconClassNameSpread =
    intl.locale === "en" ? styles.historyIconBoxEnSpread : styles.historyIconBoxSpread
  const ContactsIconComponent = intl.locale === "en" ? ContactsIconEn : ContactsIcon
  const contactsIconClassName =
    intl.locale === "en" ? styles.contactsIconBoxEn : styles.contactsIconBox
  const contactsIconClassNameSpread =
    intl.locale === "en" ? styles.contactsIconBoxEnSpread : styles.contactsIconBoxSpread

  return (
    <>
      <div
        className={cn(
          "fixed left-0 z-10 p-8 hidden sm:block",
          isSpread ? styles.boxSpread : styles.box,
          styles.left
        )}
      >
        <div className="h-1/2 relative flex justify-center items-center">
          <div
            className={cn(
              styles.iconBox,
              isSpread ? galleryIconClassNameSpread : galleryIconClassName
            )}
            onMouseEnter={() => !isSpread && setHoveredSection("gallery")}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <GalleryIconComponent
              onClick={() => handleClick("gallery")}
              className="w-full h-full"
            />
          </div>
          <CSSTransition
            in={currentSection && isSpread && currentSection.key === "gallery"}
            classNames="fade"
            timeout={200}
            mountOnEnter
            unmountOnExit
          >
            <div
              className={cn("hidden sm:block absolute top-0 bg-purple rounded-full", styles.circle)}
            />
          </CSSTransition>
          <CSSTransition
            in={hoveredSection === "gallery"}
            classNames="fade"
            timeout={200}
            mountOnEnter
            unmountOnExit
          >
            <div className={cn("absolute top-0", styles.galleryImage)}>
              <Img fluid={galleryImage.fluid} />
            </div>
          </CSSTransition>
        </div>
        <div className="relative">
          <hr className={cn("absolute bg-purple w-full top-0", styles.sepH)} />
        </div>
        <div className="h-1/2 relative flex justify-center items-center">
          <div
            className={cn(
              styles.iconBox,
              isSpread ? historyIconClassNameSpread : historyIconClassName
            )}
          >
            <HistoryIconComponent
              onClick={() => handleClick("history")}
              className="w-full h-full"
            />
          </div>
          <CSSTransition
            in={currentSection && isSpread && currentSection.key === "history"}
            classNames="fade"
            timeout={200}
            mountOnEnter
            unmountOnExit
          >
            <div
              className={cn(
                "hidden sm:block absolute bottom-0 bg-purple rounded-full",
                styles.circle
              )}
            />
          </CSSTransition>
        </div>
        <div className={cn("absolute top-0 right-0 bg-purple", styles.sep, styles.sepLeft)} />
      </div>
      <div
        className={cn(
          "fixed right-0 z-10 p-8 hidden sm:block",
          isSpread ? styles.boxSpread : styles.box,
          styles.right
        )}
      >
        <div className="h-1/2 relative flex justify-center items-center">
          <div
            className={cn(styles.iconBox, isSpread ? teamIconClassNameSpread : teamIconClassName)}
            onMouseEnter={() => !isSpread && setHoveredSection("team")}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <TeamIconComponent onClick={() => handleClick("team")} className="w-full h-full" />
          </div>
          <CSSTransition
            in={hoveredSection === "team"}
            classNames="team"
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            <Team items={team} className="" />
          </CSSTransition>
          <CSSTransition
            in={currentSection && isSpread && currentSection.key === "team"}
            classNames="fade"
            timeout={200}
            mountOnEnter
            unmountOnExit
          >
            <div
              className={cn("hidden sm:block absolute top-0 bg-purple rounded-full", styles.circle)}
            />
          </CSSTransition>
        </div>
        <div className="relative">
          <hr className={cn("absolute bg-purple w-full top-0", styles.sepH)} />
        </div>
        <div className="h-1/2 relative flex justify-center items-center">
          <div
            className={cn(
              styles.iconBox,
              isSpread ? contactsIconClassNameSpread : contactsIconClassName
            )}
            onMouseEnter={() => !isSpread && setHoveredSection("contacts")}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <ContactsIconComponent
              onClick={() => handleClick("contacts")}
              className="w-full h-full"
            />
          </div>
          <CSSTransition
            in={currentSection && isSpread && currentSection.key === "contacts"}
            classNames="fade"
            timeout={200}
            mountOnEnter
            unmountOnExit
          >
            <div
              className={cn(
                "hidden sm:block absolute bottom-0 bg-purple rounded-full",
                styles.circle
              )}
            />
          </CSSTransition>
          <CSSTransition
            in={hoveredSection === "contacts"}
            classNames="fade"
            timeout={200}
            mountOnEnter
            unmountOnExit
          >
            <div className={cn("absolute bottom-0", styles.contactsImage)}>
              <Img className="w-full" fluid={data.contactsImage.childImageSharp.fluid} />
            </div>
          </CSSTransition>
        </div>
        <div className={cn("absolute top-0 bg-purple", styles.sep, styles.sepRight)} />
      </div>
      <div className={cn("sm:hidden px-4", styles.menuMobile, { "opacity-0": !isMenuVisible })}>
        <div
          className={cn("", styles.rowM, { [styles.rowMSpread]: isSpread })}
          style={{ height: isSpread ? `calc(${rowHeight} / 3)` : `calc(${rowHeight})` }}
        >
          <div
            className={cn(styles.iconBox, styles.iconBoxM, styles.iconGalleryM, {
              [styles.iconBoxSpread]: isSpread,
            })}
          >
            <GalleryIconComponent
              onClick={() => handleClick("gallery")}
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="relative">
          <hr className={cn("absolute bg-purple w-full top-0", styles.sepH)} />
        </div>
        <div
          className={cn("", styles.rowM, { [styles.rowMSpread]: isSpread })}
          style={{ height: isSpread ? `calc(${rowHeight} / 3)` : `calc(${rowHeight})` }}
        >
          <div
            className={cn(
              styles.iconBox,
              styles.iconBoxM,
              intl.locale === "en" ? styles.iconHistoryMEn : styles.iconHistoryM,
              {
                [styles.iconBoxSpread]: isSpread,
              }
            )}
          >
            <HistoryIconComponent
              onClick={() => handleClick("history")}
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="relative">
          <hr className={cn("absolute bg-purple w-full top-0", styles.sepH)} />
        </div>
        <div
          className={cn("", styles.rowM, { [styles.rowMSpread]: isSpread })}
          style={{ height: isSpread ? `calc(${rowHeight} / 3)` : `calc(${rowHeight})` }}
        >
          <div
            className={cn(
              styles.iconBox,
              styles.iconBoxM,
              intl.locale === "en" ? styles.iconTeamMEn : styles.iconTeamM,
              {
                [styles.iconBoxSpread]: isSpread,
              }
            )}
          >
            <TeamIconComponent onClick={() => handleClick("team")} className="w-full h-full" />
          </div>
        </div>
        <div className="relative">
          <hr className={cn("absolute bg-purple w-full top-0", styles.sepH)} />
        </div>
        <div
          className={cn("", styles.rowM, { [styles.rowMSpread]: isSpread })}
          style={{ height: isSpread ? `calc(${rowHeight} / 3)` : `calc(${rowHeight})` }}
        >
          <div
            className={cn(styles.iconBox, styles.iconContactsM, {
              [styles.iconBoxSpread]: isSpread,
            })}
          >
            <ContactsIconComponent
              onClick={() => handleClick("contacts")}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default BigMenu
