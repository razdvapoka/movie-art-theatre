import { CSSTransition } from "react-transition-group"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import React, { useRef, useEffect, useState, useCallback } from "react"
import cn from "classnames"
import jsonp from "jsonp"
import toQueryString from "to-querystring"

import { useIntl } from "gatsby-plugin-intl"
import FB from "@/icons/fb.inline.svg"
import IG from "@/icons/ig.inline.svg"
import TG from "@/icons/tg.inline.svg"
import VK from "@/icons/vk.inline.svg"

import { FB_URL, IG_URL, TG_URL, VK_URL } from "../../consts"
import { blank } from "../../utils"
import styles from "./index.module.styl"

const MAILCHIMP_URL =
  "https://cinema1909.us10.list-manage.com/subscribe/post-json?u=76d9bac7ec90e3d9f31d4eba4&amp;id=99c82c4be8"
const MAILCHIMP_SECRET = "b_76d9bac7ec90e3d9f31d4eba4_99c82c4be8"
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
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (el) {
      if (isOpen && !success) {
        disableBodyScroll(el)
      } else {
        enableBodyScroll(el)
      }
    }
    return () => {
      enableBodyScroll(el)
    }
  }, [isOpen, success, ref])
  return (
    <form
      ref={ref}
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

const Footer = ({ isIntroOn, windowHeight }) => {
  const intl = useIntl()
  const ref = useRef(null)
  const [email, setEmail] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [status, setStatus] = useState(null)
  const [isFixedSuccess, setIsFixedSuccess] = useState(false)

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
            if (result === "success") {
              setIsFixedSuccess(true)
              disableBodyScroll(ref.current)
              setTimeout(() => {
                setIsFixedSuccess(false)
                enableBodyScroll(ref.current)
              }, 3000)
            }
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
    if (status === "success" && !isFixedSuccess) {
      setStatus(null)
      setEmail("")
      setIsEmailValid(false)
      setIsFormOpen(false)
    }
  }, [setStatus, status, setEmail, setIsEmailValid, setIsFormOpen, isFixedSuccess])

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
      <CSSTransition in={success} classNames="fade" timeout={200} mountOnEnter unmountOnExit>
        <div
          ref={ref}
          className={cn(
            "hidden sm:flex bg-purple fixed left-0 w-screen text-white text-center text-xxxl-D justify-center items-center z-30",
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
        {...(isIntroOn
          ? {
              style: { height: `calc(120 / 666 * ${windowHeight}px)` },
            }
          : {})}
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
                className={cn("bg-purple text-white text-s-D uppercase", styles.input, {
                  [styles.inputNonEmpty]: email.length > 0,
                })}
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
            <a className={"opacity-50 hover:opacity-100"} href={IG_URL} {...blank()}>
              <IG className={styles.igLogo} />
            </a>
            <a className={"ml-8 opacity-50 hover:opacity-100"} href={FB_URL} {...blank()}>
              <FB className={styles.fbLogo} />
            </a>
            <a className={"ml-8 opacity-50 hover:opacity-100"} href={VK_URL} {...blank()}>
              <VK className={styles.vkLogo} />
            </a>
            <a className={"ml-8 opacity-50 hover:opacity-100"} href={TG_URL} {...blank()}>
              <TG className={styles.tgLogo} />
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
