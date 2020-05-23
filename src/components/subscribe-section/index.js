import { FormattedMessage } from "gatsby-plugin-intl"
import React, { useCallback, useState } from "react"
import cn from "classnames"
import jsonp from "jsonp"
import toQueryString from "to-querystring"

import { blank } from "../../utils"
import Markdown from "../markdown"
import styles from "./index.module.styl"

const MAILCHIMP_URL =
  "https://dev.us18.list-manage.com/subscribe/post-json?u=cbce4c710a25008dbbcaf1c90&amp;id=3e0afba3c2"
const MAILCHIMP_SECRET = "b_cbce4c710a25008dbbcaf1c90_3e0afba3c2"
const EMAIL_REGEX = /.+@.+\..+/

const SubscribeSection = ({ text: { text }, subText, isInFooter, type, ...rest }) => {
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
    <div className="">
      <div className="">
        <FormattedMessage id="leaveEmail" />
      </div>
      <div className="">
        <form onSubmit={handleSubmit} className="">
          <div>
            <input
              type="text"
              value={email}
              placeholder="hello@world.com"
              name="EMAIL"
              onChange={handleEmailChange}
              disabled={success}
            />
            <input
              type="submit"
              disabled={!isEmailValid || success || error}
              value={success ? "✓" : "→"}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubscribeSection
