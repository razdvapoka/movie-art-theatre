import React from "react"
import cn from "classnames"
import styles from "./index.module.styl"
import Logo from "@/icons/logo-2.inline.svg"
import LangSwitcher from "@/components/lang-switcher"

const Header = ({ text }) => (
  <header
    className={cn(
      "px-4 relative bg-purple text-white flex items-center justify-between text-xs-D uppercase",
      styles.header
    )}
  >
    <div className="opacity-50">{text}</div>
    <Logo className={cn("absolute", styles.headerLogo)} />
    <div className="opacity-50">
      <LangSwitcher />
    </div>
  </header>
)

export default Header
