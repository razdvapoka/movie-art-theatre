import React, { useState, useCallback } from "react"
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
  const success = status === "success"
  const error = status === "error"

  return (
    <footer className={cn("bg-purple px-8 flex justify-between items-center", styles.footer)}>
      <form onSubmit={handleSubmit} className="">
        <div className={""}>
          <input
            type="text"
            value={email}
            placeholder="hello@world.com"
            name="EMAIL"
            className={cn("bg-purple")}
            onChange={handleEmailChange}
            disabled={success}
          />
          <input
            className={cn("text-mll-D bg-purple text-white", {
              "opacity-50 poiner-events-none": !isEmailValid,
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
