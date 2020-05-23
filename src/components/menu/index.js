// import { FormattedMessage } from "gatsby-plugin-intl"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import React, { useRef, useEffect } from "react"
import cn from "classnames"

//import X from "@/icons/x.inline.svg"
//import { blank } from "../../utils"
//import LangSwitcher from "../lang-switcher"
import styles from "./index.module.styl"

const Menu = ({ sections, toggleMenu, scrollLock = true, isMenuOpen }) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (el && scrollLock) {
      if (isMenuOpen) {
        disableBodyScroll(el)
      } else {
        enableBodyScroll(el)
      }
    }
    return () => {
      enableBodyScroll(el)
    }
  }, [isMenuOpen, ref, scrollLock])

  return (
    <div ref={ref} className={cn(styles.menuBox, isMenuOpen ? styles.menuOpen : styles.menuClosed)}>
      menu
    </div>
  )
}

export default Menu
