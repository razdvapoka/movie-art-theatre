import React from "react"
import cn from "classnames"
import styles from "./index.module.styl"
import Logo from "@/icons/logo-2.inline.svg"
import LangSwitcher from "@/components/lang-switcher"

const Header = ({ setIsSpread, text, isIntroOn }) => (
  <header
    className={cn(
      `px-4 bg-purple text-white text-xs-D uppercase
      fixed top-0 left-0 w-screen z-20
      `,
      styles.header,
      isIntroOn ? styles.headerBlack : styles.headerOk
    )}
  >
    <div
      className={cn(
        "absolute left-0 top-0 w-full h-full bg-black z-30",
        styles.overlay,
        isIntroOn ? styles.overlayBlack : styles.overlayOk
      )}
    />
    <div className={cn("flex items-center justify-between relative", styles.headerContent)}>
      <div className="opacity-50">{text}</div>
      <Logo onClick={() => setIsSpread(false)} className={cn("absolute", styles.headerLogo)} />
      <div className="opacity-50">
        <LangSwitcher />
      </div>
    </div>
  </header>
)

export default Header
