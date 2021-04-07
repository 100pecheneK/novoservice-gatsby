import Page from '@containers/pages/Page'
import { graphql } from 'gatsby'
import React from 'react'
import { PageDataType } from 'selectors/selectors'

export default function Papa({ data }: { data: PageDataType }) {
  return <Page data={data} />
}

export const query = graphql`
  query PapaData {
    markdownRemark(frontmatter: { _documentName: { eq: "papaprinter" } }) {
      frontmatter {
        _link
        title
        logoAlt
        mainH1
        mainH2
        map
        mainShortAddres
        timetable {
          day
          from {
            h
            m
          }
          to {
            h
            m
          }
        }
        links {
          href
          icon
          text
          type
        }
        logo {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
        servicesContacts
        services {
          subservices
          subtitle
          title
          image {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
          vk
          imageAlt
        }
      }
    }
  }
`
