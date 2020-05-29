import React from "react"
import ReactMarkdown from "react-markdown"
import styles from "./index.module.styl"
import remarkTypograph from "@mavrin/remark-typograf"
import cn from "classnames"

//const isExternal = url => !url.startsWith("#")
const renderers = ({ referenceId, setReferenceId, setIsReferenceVisible }) => ({
  link: ({ children, title, href, ...rest }) => {
    return (
      <button
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
      </button>
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
