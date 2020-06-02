import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import React, { useRef, useEffect, useState } from "react"
import cn from "classnames"

import { IntlContextConsumer, changeLocale, useIntl } from "gatsby-plugin-intl"
import Burger from "@/icons/burger.inline.svg"
import Close from "@/icons/close.inline.svg"
import FB from "@/icons/fb.inline.svg"
import IG from "@/icons/ig.inline.svg"
import LangSwitcher from "@/components/lang-switcher"
import Logo from "@/icons/logo-2.inline.svg"
import LogoEn from "@/icons/logo-en.inline.svg"
import VK from "@/icons/vk.inline.svg"

import { blank } from "../../utils"
import styles from "./index.module.styl"

const Menu = ({ intl, setIsMenuOpen }) => {
  const handleNavLinkClick = id => {
    const el = document.getElementById(id)
    el.scrollIntoView()
    setIsMenuOpen(false)
  }
  return (
    <div className="">
      <div>
        <button
          className={cn("block w-full border-t border-white border-solid", styles.navLink)}
          onClick={() => handleNavLinkClick("gallery")}
        >
          {intl.formatMessage({ id: "gallery" })}
        </button>
        <button
          className={cn("block w-full border-t border-white border-solid", styles.navLink)}
          onClick={() => handleNavLinkClick("history")}
        >
          {intl.formatMessage({ id: "historyPartners" })}
        </button>
        <button
          className={cn("block w-full border-t border-white border-solid", styles.navLink)}
          onClick={() => handleNavLinkClick("team")}
        >
          {intl.formatMessage({ id: "team" })}
        </button>
        <button
          className={cn("block w-full border-t border-white border-solid", styles.navLink)}
          onClick={() => handleNavLinkClick("contacts")}
        >
          {intl.formatMessage({ id: "contacts" })}
        </button>
      </div>
      <div
        className={cn("py-2 border-t border-white border-solid flex items-center", styles.locales)}
      >
        <IntlContextConsumer>
          {({ languages, language: currentLocale }) =>
            languages.map((language, languageIndex) => (
              <React.Fragment key={language}>
                <button
                  className={cn("uppercase w-1/2 h-full", {
                    "opacity-50 pointer-events-none": currentLocale === language,
                  })}
                  onClick={() => changeLocale(language)}
                >
                  {language}
                </button>
                {languageIndex === 0 && <div className={cn(styles.sep, "bg-white h-full")} />}
              </React.Fragment>
            ))
          }
        </IntlContextConsumer>
      </div>
      <div
        className={cn(
          "border-t border-b border-white border-solid flex items-center py-2",
          styles.locales
        )}
      >
        <a
          className={"flex items-center justify-center w-1/3 h-full opacity-50"}
          href="https://example.com"
          {...blank()}
        >
          <IG className={styles.igLogo} />
        </a>
        <div className={cn(styles.sep, "bg-white h-full")} />
        <a
          className={"flex items-center justify-center w-1/3 h-full opacity-50"}
          href="https://example.com"
          {...blank()}
        >
          <FB className={styles.fbLogo} />
        </a>
        <div className={cn(styles.sep, "bg-white h-full")} />
        <a
          className={"flex items-center justify-center w-1/3 h-full opacity-50"}
          href="https://example.com"
          {...blank()}
        >
          <VK className={styles.vkLogo} />
        </a>
      </div>
    </div>
  )
}

const Header = ({ setIsSpread, text, isIntroOn, windowHeight }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const intl = useIntl()
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (el) {
      if (isMenuOpen) {
        disableBodyScroll(el)
      } else {
        enableBodyScroll(el)
      }
    }
    return () => {
      enableBodyScroll(el)
    }
  }, [isMenuOpen, ref])

  const LogoComponent = intl.locale === "en" ? LogoEn : Logo
  const logoClassName = intl.locale === "en" ? styles.headerLogoEn : styles.headerLogo

  return (
    <header
      className={cn(
        `px-4 bg-purple text-white text-xs-D uppercase
      fixed top-0 left-0 w-screen z-20
      `,
        styles.header,
        isIntroOn ? styles.headerBlack : styles.headerOk
      )}
      {...(isIntroOn
        ? {
            style: { height: `calc(120 / 666 * ${windowHeight}px)` },
          }
        : {})}
    >
      <div
        ref={ref}
        className={cn(
          "fixed left-0 bg-purple text-white text-mk w-screen overflow-auto",
          styles.menu,
          {
            [styles.menuOpen]: isMenuOpen,
          }
        )}
      >
        <Menu intl={intl} setIsMenuOpen={setIsMenuOpen} />
      </div>
      <div
        className={cn(
          "absolute left-0 top-0 w-full h-full bg-black z-30",
          styles.overlay,
          isIntroOn ? styles.overlayBlack : styles.overlayOk
        )}
      />
      <div
        className={cn(
          "flex items-center justify-end sm:justify-between relative",
          styles.headerContent
        )}
      >
        <div className="opacity-50 hidden sm:block">{text}</div>
        <LogoComponent
          onClick={() => setIsSpread(false)}
          className={cn("absolute", logoClassName)}
        />
        <div className="">
          <LangSwitcher className="hidden sm:block opacity-50" />
          {isMenuOpen ? (
            <Close onClick={() => setIsMenuOpen(false)} className={cn(styles.close, "sm:hidden")} />
          ) : (
            <Burger
              onClick={() => setIsMenuOpen(true)}
              className={cn(styles.burger, "sm:hidden")}
            />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
