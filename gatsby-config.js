require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Кинотеатр «Художественный»`,
    description: `Открытие в 2020`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Художественный`,
        short_name: `Художественный`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-stylus-resources`,
      options: {
        resources: [
          "./src/styles/consts.styl",
          "./src/styles/fonts.styl",
          "./src/styles/utils.styl",
          "./src/styles/text-styles.styl",
          "./src/styles/index.styl",
        ],
        postCssPlugins: [require("tailwindcss"), require(`autoprefixer`), require(`cssnano`)],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        tailwind: true, // Enable tailwindcss support
        whitelist: [
          "item-enter",
          "item-enter-active",
          "item-exit",
          "item-exit-active",
          "fade-enter",
          "fade-enter-active",
          "fade-exit",
          "fade-exit-active",
          "team-enter",
          "team-enter-active",
          "team-enter-done",
          "team-exit",
          "team-exit-active",
          "team-member-0",
          "team-member-1",
          "team-member-2",
        ], // Don't remove this selector
        ignore: ["src/components/markdown/index.module.styl"], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`en`, `ru`],
        defaultLanguage: `ru`,
        redirect: false,
      },
    },
    {
      resolve: `gatsby-plugin-svgr-svgo`,
      options: {
        inlineSvgOptions: [
          {
            test: /\.inline.svg$/,
            svgoConfig: {
              plugins: [
                {
                  removeViewBox: false,
                  removeDimensions: true,
                },
              ],
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-173041348-1",
      },
    },
    `gatsby-plugin-offline`,
  ],
}
