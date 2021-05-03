// import Page from '@containers/pages/Page'
// import { graphql } from 'gatsby'
// import React from 'react'
// import { PageDataType } from 'selectors/selectors'

// export default function Papa({ data }: { data: PageDataType }) {
//   console.log(data)

//   return <Page pageContext={data} />
// }

// export const query = graphql`
//   query PapaData {
//     contentfulServices(serviceName: { eq: "papaprinter" }) {
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

// // export const query = graphql`
// //   query PapaData {
// //     markdownRemark(frontmatter: { _documentName: { eq: "papaprinter" } }) {
// //       frontmatter {
// //         _link
// //         logoAlt
// //         mainH1
// //         mainH2
// //         map
// //         mainShortAddres
// //         timetable {
// //           day
// //           from {
// //             h
// //             m
// //           }
// //           to {
// //             h
// //             m
// //           }
// //         }
// //         links {
// //           href
// //           icon
// //           text
// //           type
// //         }
// //         logo {
// //           childImageSharp {
// //             gatsbyImageData(placeholder: BLURRED)
// //           }
// //         }
// //         servicesContacts
// //         services {
// //           subservices
// //           subtitle
// //           title
// //           image {
// //             childImageSharp {
// //               gatsbyImageData(placeholder: BLURRED)
// //             }
// //           }
// //           vk
// //           imageAlt
// //         }
// //       }
// //     }
// //   }
// // `
