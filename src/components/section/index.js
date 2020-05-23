import { FormattedMessage } from "gatsby-plugin-intl"
import React from "react"

const Section = ({ titleId, children, ...rest }) => (
  <section className={"mt-10 px-40 "} {...rest}>
    <div className="text-purple border-t-2 border-solid">
      <h2 className="text-center text-l-D mt-7 mb-11">
        <FormattedMessage id={titleId} />
      </h2>
    </div>
    {children}
  </section>
)

export default Section
