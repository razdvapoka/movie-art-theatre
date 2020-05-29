import { FormattedMessage } from "gatsby-plugin-intl"
import React from "react"
import cn from "classnames"
import styles from "./index.module.styl"

const Section = ({ titleId, children, ...rest }) => (
  <section className={"mt-8 px-4 sm:px-40 relative"} {...rest}>
    <div className={cn(styles.id, "absolute")} id={titleId} />
    <div className="text-purple border-t sm:border-t-2 border-solid sm:mx-8">
      <h2 className="text-center text-mk text-l-D mt-2 sm:mt-7">
        <FormattedMessage id={titleId} />
      </h2>
    </div>
    {children}
  </section>
)

export default Section
