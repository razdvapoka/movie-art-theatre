import React from "react"
import ReactMarkdown from "react-markdown"
import cn from "classnames"
import remarkTypograph from "@mavrin/remark-typograf"

import { blank } from "../../utils"
import styles from "./index.module.styl"

//const isExternal = url => !url.startsWith("#")
const renderers = ({ referenceId, setReferenceId, setIsReferenceVisible }) => ({
  link: ({ children, title, href, ...rest }) => {
    const isButton = !!title
    const Component = isButton ? "button" : "a"
    const props = isButton
      ? {}
      : {
          href,
          ...blank(),
        }
    return (
      <Component
        className="text-purple"
        {...props}
        onClick={() => {
          if (title && setReferenceId && setIsReferenceVisible) {
            setReferenceId(title)
            setIsReferenceVisible(true)
          }
        }}
        onMouseEnter={() => {
          if (title && setReferenceId && setIsReferenceVisible) {
            setReferenceId(title)
            setIsReferenceVisible(true)
          }
        }}
        onMouseLeave={() => setIsReferenceVisible && setIsReferenceVisible(false)}
      >
        {children}
      </Component>
    )
  },
})

const Markdown = ({
  children,
  className,
  setReferenceId,
  referenceId,
  setIsReferenceVisible,
  ...rest
}) => (
  <ReactMarkdown
    className={cn(styles.markdown, className)}
    source={children}
    parserOptions={{ commonmark: true, footnotes: true }}
    renderers={renderers({ setReferenceId, referenceId, setIsReferenceVisible })}
    plugins={[remarkTypograph, { locale: ["en-US", "ru-RU"] }]}
    {...rest}
  />
)

export default Markdown
