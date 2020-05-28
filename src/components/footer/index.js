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

const Form = ({
  intl,
  email,
  handleEmailChange,
  isEmailValid,
  success,
  error,
  isOpen,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "bg-purple fixed left-0 w-screen flex flex-col justify-center items-center sm:hidden z-20",
        styles.form,
        { [styles.formOpen]: isOpen }
      )}
    >
      {success ? (
        <div
          className={cn("text-mk uppercase text-white text-center", styles.successMessageM)}
          dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: "success" }) }}
        />
      ) : (
        <input
          className={cn("bg-purple text-white text-m uppercase text-center", styles.input)}
          type="text"
          value={email}
          placeholder="@MAIL"
          name="EMAIL"
          onChange={handleEmailChange}
          disabled={success}
        />
      )}
    </form>
  )
}

const Footer = ({ isIntroOn }) => {
  const intl = useIntl()
  const [email, setEmail] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
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
      if (e) {
        e.preventDefault()
      }
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

  const handleSubscribeClick = () => {
    if (isFormOpen) {
      if (isEmailValid) {
        handleSubmit()
      } else {
        setIsFormOpen(false)
      }
    } else {
      setIsFormOpen(true)
    }
  }

  const reset = useCallback(() => {
    if (status === "success") {
      setStatus(null)
      setEmail("")
      setIsEmailValid(false)
      setIsFormOpen(false)
    }
  }, [setStatus, status, setEmail, setIsEmailValid, setIsFormOpen])

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
    <>
      <CSSTransition
        in={success}
        className="hidden sm:block"
        classNames="fade"
        timeout={200}
        mountOnEnter
        unmountOnExit
      >
        <div
          className={cn(
            "bg-purple fixed left-0 w-screen text-white text-center text-xxxl-D flex justify-center items-center z-30",
            styles.successMessage
          )}
        >
          <div dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: "success" }) }} />
        </div>
      </CSSTransition>
      <Form
        intl={intl}
        email={email}
        handleEmailChange={handleEmailChange}
        isEmailValid={isEmailValid}
        success={success}
        isOpen={isFormOpen}
        handleSubmit={handleSubmit}
      />
      <footer
        className={cn(
          "bg-purple px-8 fixed bottom-0 left-0 w-screen flex items-end",
          styles.footer,
          isIntroOn ? styles.footerBlack : styles.footerOk
        )}
      >
        <div
          className={cn(
            "absolute left-0 top-0 w-full h-full bg-black z-30",
            styles.overlay,
            isIntroOn ? styles.overlayBlack : styles.overlayOk
          )}
        />
        <div
          className={cn(
            styles.footerContent,
            "flex items-center justify-center sm:justify-between w-full "
          )}
        >
          <form
            onSubmit={handleSubmit}
            className={cn("hidden sm:block", { "opacity-0 ": success })}
          >
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
          <div className="flex items-center text-white hidden sm:flex">
            <a className={"opacity-50 hover:opacity-100"} href="https://example.com" {...blank()}>
              <IG className={styles.igLogo} />
            </a>
            <a
              className={"ml-8 opacity-50 hover:opacity-100"}
              href="https://example.com"
              {...blank()}
            >
              <FB className={styles.fbLogo} />
            </a>
            <a
              className={"ml-8 opacity-50 hover:opacity-100"}
              href="https://example.com"
              {...blank()}
            >
              <VK className={styles.vkLogo} />
            </a>
          </div>
          <button className="sm:hidden text-mk text-white" onClick={handleSubscribeClick}>
            {intl.formatMessage({ id: "subscribe" })}
          </button>
        </div>
      </footer>
    </>
  )
}

export default Footer
