// import HomePage from '@containers/pages/HomePage'
// import { graphql } from 'gatsby'
// import { GatsbyImageProps } from 'gatsby-plugin-image'
// import React from 'react'



// export default function Home({ data }: HomeProps) {
//   const { siteInfo, contentfulSettings } = data

//   return <HomePage pageContext={{ siteInfo, settings: contentfulSettings }} />
// }

// export const query = graphql`
//   query Data {
//     siteInfo: allMarkdownRemark(
//       filter: { frontmatter: { _type: { eq: "Информация" } } }
//       sort: { fields: frontmatter____sort }
//     ) {
//       nodes {
//         id
//         frontmatter {
//           title
//           _link
//           subtitle
//           logoAlt
//           logo {
//             childImageSharp {
//               gatsbyImageData(placeholder: BLURRED)
//             }
//           }
//         }
//       }
//     }
//     contentfulSettings {
//       welcomeTitle
//     }
//   }
// `
