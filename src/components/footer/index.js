import { CSSTransition } from "react-transition-group"
import React, { useEffect, useState, useCallback } from "react"
import cn from "classnames"
import jsonp from "jsonp"
import toQueryString from "to-querystring"

import { useIntl } from "gatsby-plugin-intl"
import FB from "@/icons/fb.inline.svg"
import IG from "@/icons/ig.inline.svg"
import VK from "@/icons/vk.inline.svg"

import { blank } from "../../utils"
import styles from "./index.module.styl"

const MAILCHIMP_URL =
  "https://dev.us18.list-manage.com/subscribe/post-json?u=cbce4c710a25008dbbcaf1c90&amp;id=3e0afba3c2"
const MAILCHIMP_SECRET = "b_cbce4c710a25008dbbcaf1c90_3e0afba3c2"
const EMAIL_REGEX = /.+@.+\..+/

const Footer = () => {
  const intl = useIntl()
  const [email, setEmail] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [status, setStatus] = useState(null)
  const handleEmailChange = useCallback(
    e => {
      setStatus(null)
      setEmail(e.target.value)
      setIsEmailValid(EMAIL_REGEX.test(e.target.value))
    },
    [setEmail]
  )
  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      const params = toQueryString({
        EMAIL: email,
        [MAILCHIMP_SECRET]: "",
      })
      const url = `${MAILCHIMP_URL}&${params}`
      jsonp(
        url,
        {
          param: "c",
        },
        (err, data) => {
          if (!err) {
            const { result } = data
            setStatus(result)
          } else {
            setStatus("error")
          }
        }
      )
    },
    [email]
  )

  const reset = useCallback(() => {
    if (status === "success") {
      setStatus(null)
      setEmail("")
      setIsEmailValid(false)
    }
  }, [setStatus, status, setEmail, setIsEmailValid])

  useEffect(() => {
    window.addEventListener("scroll", reset)
    window.addEventListener("mousemove", reset)
    return () => {
      window.removeEventListener("scroll", reset)
      window.removeEventListener("mousemove", reset)
    }
  }, [reset])

  const success = status === "success"
  const error = status === "error"

  return (
    <footer
      className={cn(
        "bg-purple px-8 flex justify-between items-center fixed bottom-0 left-0 w-screen",
        styles.footer
      )}
    >
      <CSSTransition in={success} classNames="fade" timeout={200} mountOnEnter unmountOnExit>
        <div
          className={cn(
            "flex items-center justify-center bg-purple fixed left-0 w-screen text-white text-center text-xxxl-D",
            styles.successMessage
          )}
        >
          <div dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: "success" }) }} />
        </div>
      </CSSTransition>
      <form onSubmit={handleSubmit} className={cn({ "opacity-0": success })}>
        <div className={""}>
          <input
            className={cn("bg-purple text-white text-s-D uppercase", styles.input)}
            type="text"
            value={email}
            placeholder="@MAIL"
            name="EMAIL"
            onChange={handleEmailChange}
            disabled={success}
          />
          <input
            className={cn("ml-4 text-mll-D bg-purple text-white cursor-pointer", {
              "opacity-50 pointer-events-none": !isEmailValid,
            })}
            type="submit"
            disabled={!isEmailValid || success || error}
            value={intl.formatMessage({ id: "subscribe" })}
          />
        </div>
      </form>
      <div className="flex items-center text-white">
        <a className={"opacity-50 hover:opacity-100"} href="https://example.com" {...blank()}>
          <IG className={styles.igLogo} />
        </a>
        <a className={"ml-8 opacity-50 hover:opacity-100"} href="https://example.com" {...blank()}>
          <FB className={styles.fbLogo} />
        </a>
        <a className={"ml-8 opacity-50 hover:opacity-100"} href="https://example.com" {...blank()}>
          <VK className={styles.vkLogo} />
        </a>
      </div>
    </footer>
  )
}

export default Footer
