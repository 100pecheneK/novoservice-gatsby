/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `zqgyngj76m4z`,
        accessToken: '3FJndzYIb-8uGdt0mJTY_3rM57A1-U-H1rqM-Tsp7kg',
      },
    },
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-typescript',
  ],
}
