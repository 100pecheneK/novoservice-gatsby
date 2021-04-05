import { graphql } from 'gatsby'
import React from 'react'
import HomePage from '@containers/pages/HomePage'
import { GatsbyImageProps } from 'gatsby-plugin-image'
import { GatsbyImage } from 'gatsby-plugin-image'

export type SiteInfoType = {
  nodes: {
    id: string
    frontmatter: {
      title: string
      _link: string
      subtitle: string
      logoAlt: string
      logo: {
        childImageSharp: {
          gatsbyImageData: GatsbyImageProps['image']
        }
      }
    }
  }[]
}
export type SettingsType = {
  welcomeTitle: string
}

export type HomeProps = {
  data: {
    siteInfo: SiteInfoType
    contentfulSettings: SettingsType
  }
}

export default function Home({ data }: HomeProps) {
  const { siteInfo, contentfulSettings } = data
  console.log("Home -> contentfulSettings", contentfulSettings)

  return <HomePage siteInfo={siteInfo} settings={contentfulSettings} />
}

export const query = graphql`
  query Data {
    siteInfo: allMarkdownRemark(
      filter: { frontmatter: { _type: { eq: "Информация" } } }
      sort: { fields: frontmatter____sort }
    ) {
      nodes {
        id
        frontmatter {
          title
          _link
          subtitle
          logoAlt
          logo {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
    }
    contentfulSettings {
      welcomeTitle
    }
  }
`
