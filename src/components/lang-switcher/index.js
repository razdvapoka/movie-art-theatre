import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"
import React from "react"
import cn from "classnames"

const LangSwitcher = props => (
  <div {...props}>
    <IntlContextConsumer>
      {({ languages, language: currentLocale }) =>
        languages.map(language => (
          <button
            className={cn("uppercase", {
              hidden: currentLocale === language,
            })}
            key={language}
            onClick={() => changeLocale(language)}
          >
            {language}
          </button>
        ))
      }
    </IntlContextConsumer>
  </div>
)

export default LangSwitcher
