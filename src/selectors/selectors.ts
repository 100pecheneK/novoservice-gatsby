import { AvailableIcons } from '@components/Icons'
import { ServiceDataType } from '@containers/sections/ServicesSection'
import { GatsbyImageProps } from 'gatsby-plugin-image'

export const frontmatter = (data: PageDataType) =>
  data.markdownRemark.frontmatter
export const image = (data: PageDataType) =>
  frontmatter(data).logo.childImageSharp.gatsbyImageData
export const timetable = (data: PageDataType) => frontmatter(data).timetable
export const _link = (data: PageDataType) => frontmatter(data)._link
export const logoAlt = (data: PageDataType) => frontmatter(data).logoAlt
export const links = (data: PageDataType) => frontmatter(data).links
export const mainH1 = (data: PageDataType) => frontmatter(data).mainH1
export const mainH2 = (data: PageDataType) => frontmatter(data).mainH2
export const vk = (data: PageDataType) =>
  links(data).find(link => link.type === 'vk')?.href || ''
export const servicesContacts = (
  data: PageDataType
): ['vk' | 'email' | 'whatsapp'] => frontmatter(data).servicesContacts
export const email = (data: PageDataType) =>
  links(data).find(link => link.type === 'email')?.href || ''
export const phonenumber = (data: PageDataType) =>
  links(data).find(link => link.type === 'phonenumber')?.href || ''
export const mainShortAddres = (data: PageDataType) =>
  frontmatter(data).mainShortAddres
export const servicesData = (data: PageDataType): ServiceDataType[] =>
  frontmatter(data).services.map((service, i) => ({
    ...service,
    id: i.toString(),
  }))
export const map = (data: PageDataType) => frontmatter(data).map
export const placeData = (data: PageDataType) => ({
  map: map(data),
  timetable: timetable(data),
})
export const contactsData = (data: PageDataType) => ({
  links: links(data),
})
export const mainData = (data: PageDataType) => ({
  image: image(data),
  timetable: timetable(data),
  _link: _link(data),
  logoAlt: logoAlt(data),
  links: links(data),
  mainH1: mainH1(data),
  mainH2: mainH2(data),
  mainShortAddres: mainShortAddres(data),
})

export type PageDataType = {
  markdownRemark: {
    frontmatter: {
      _type: string
      _documentName: string
      _link: string
      _sort: number
      title: string
      subtitle: string
      logo: {
        childImageSharp: {
          gatsbyImageData: GatsbyImageProps['image']
        }
      }
      servicesContacts: ['vk' | 'email' | 'whatsapp']
      services: Omit<ServiceDataType, 'id'>[]
      logoAlt: string
      mainH1: string
      mainH2: string
      mainShortAddres: string
      links: LinkType[]
      map: string
      timetable: TimeTableType
    }
  }
}

export type LinkType = {
  text: string
  href: string
  icon: AvailableIcons
  type: 'phonenumber' | 'email' | 'vk'
}
export type TimeTableWorkDay = {
  day: string
  from: { h: number; m: number }
  to: { h: number; m: number }
}
export type TimeTableType = TimeTableWorkDay[]
