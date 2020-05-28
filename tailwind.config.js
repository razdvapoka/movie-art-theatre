const ROOT_FONT_SIZE = 26

const pxToRem = px => `${px / ROOT_FONT_SIZE}rem`

const sequence = length => Array.from(Array(length).keys())

const spacing = sequence(41).reduce(
  (s, i) => ({
    ...s,
    [i]: pxToRem(i * 4),
  }),
  {}
)

module.exports = {
  purge: false,
  theme: {
    screens: {
      sm: "640px",
    },
    colors: {
      black: "#000",
      white: "#fff",
      purple: "#5933C4",
      grey: "#DEDEDE",
    },
    spacing,
    extend: {
      width: {
        "1/8": "12.5%",
      },
      height: {
        "1/2": "50%",
      },
    },
  },
}
