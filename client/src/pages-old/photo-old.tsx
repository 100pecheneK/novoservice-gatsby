// import Page from '@containers/pages/Page'
// import { graphql } from 'gatsby'
// import React from 'react'
// import { PageDataType } from 'selectors/selectors'

// export default function Papa({ data }: { data: PageDataType }) {
//   return <Page pageContext={data} />
// }

// export const query = graphql`
//   query PhotoData {
//     contentfulServices(serviceName: { eq: "photonovik" }) {
//       id
//       _link: link
//       logoAlt
//       mainH1
//       mainH2
//       mainShortAddres
//       logo {
//         gatsbyImageData
//       }
//       links {
//         type
//         text
//         icon
//         href
//       }
//       map {
//         map
//       }
//       services: products {
//         title
//         subtitle
//         subservices
//         imageAlt: imageAltForSeo
//         image {
//           gatsbyImageData
//         }
//       }
//       serviceContacts
//       subtitle
//       timetable {
//         timetable {
//           day
//           to {
//             h
//             m
//           }
//           from {
//             h
//             m
//           }
//         }
//       }
//       title
//     }
//   }
// `
