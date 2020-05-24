import React, { useState, useCallback } from "react"
import cn from "classnames"
import { YMaps, Map, Placemark, withYMaps } from "react-yandex-maps"
import hint from "./hint"

import Markdown from "../markdown"
import Section from "../section"
import styles from "./index.module.styl"

const ConnectedMap = () => {
  const [template, setTemplate] = useState(null)
  const handleMapLoad = useCallback(
    ymaps => {
      const t = ymaps.templateLayoutFactory.createClass(
        `<div
          style="
          color: black;
          font-weight: bold; position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -120%);
          "
        >${hint}</div>`
      )
      setTemplate({ template: t })
    },
    [setTemplate]
  )
  return (
    <Map
      onLoad={handleMapLoad}
      className={styles.contactsMap}
      defaultState={{ center: [55.752418, 37.601999], zoom: 17 }}
      modules={["templateLayoutFactory", "layout.ImageWithContent"]}
    >
      {template && (
        <Placemark
          geometry={[55.752418, 37.601999]}
          properties={{
            iconContent: "Some text with marker",
          }}
          options={{
            iconLayout: "default#imageWithContent",
            iconImageHref: "/black-circle.svg",
            iconImageSize: [8, 8],
            iconImageOffset: [-4, -4],
            iconContentLayout: template.template,
          }}
        />
      )}
    </Map>
  )
}

const Contacts = ({ contacts }) => (
  <Section titleId="contacts">
    <div className="mt-11">
      <Markdown className={cn("text-center", styles.contactsText)}>{contacts.contacts}</Markdown>
      <div className="mt-18">
        <YMaps>
          <ConnectedMap />
        </YMaps>
      </div>
    </div>
  </Section>
)

export default Contacts