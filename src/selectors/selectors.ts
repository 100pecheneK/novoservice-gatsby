import { AvailableIcons } from '@components/Icons'
import { ServiceDataType } from '@containers/sections/ServicesSection'
import { GatsbyImageProps } from 'gatsby-plugin-image'
import { PageDataType } from 'interfaces'

export const contentfulServices = (data: PageDataType) => data
export const title = (data: PageDataType) => contentfulServices(data).title
export const image = (data: PageDataType) =>
  contentfulServices(data).logo.gatsbyImageData
export const timetable = (data: PageDataType) =>
  contentfulServices(data).timetable.timetable
export const serviceWelcomeText = (data: PageDataType) =>
  contentfulServices(data).serviceWelcomeText
export const layoutMakerData = (data: PageDataType) =>
  contentfulServices(data).layouts
export const link = (data: PageDataType) => contentfulServices(data).link
export const logoAlt = (data: PageDataType) => contentfulServices(data).logoAlt
export const links = (data: PageDataType) => contentfulServices(data).links
export const mainH1 = (data: PageDataType) => contentfulServices(data).mainH1
export const mainH2 = (data: PageDataType) => contentfulServices(data).mainH2
export const vk = (data: PageDataType) =>
  links(data).find(link => link.type === 'vk')?.href || ''
export const servicesContacts = (
  data: PageDataType
): ['vk' | 'email' | 'whatsapp'] => contentfulServices(data).serviceContacts
export const email = (data: PageDataType) =>
  links(data).find(link => link.type === 'email')?.href || ''
export const phonenumber = (data: PageDataType) =>
  links(data).find(link => link.type === 'phonenumber')?.href || ''
export const whatsapp = (data: PageDataType) =>
  links(data).find(link => link.type === 'whatsapp')?.href || ''
export const mainShortAddres = (data: PageDataType) =>
  contentfulServices(data).mainShortAddres
export const servicesData = (data: PageDataType): ServiceDataType[] =>
  contentfulServices(data).services.map((service, i) => ({
    ...service,
    id: i.toString(),
  }))
export const map = (data: PageDataType) => contentfulServices(data).map.map
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
  link: link(data),
  logoAlt: logoAlt(data),
  links: links(data),
  mainH1: mainH1(data),
  mainH2: mainH2(data),
  mainShortAddres: mainShortAddres(data),
})

export type LinkType = {
  text: string
  href: string
  icon: AvailableIcons
  type: 'phonenumber' | 'email' | 'vk' | 'whatsapp'
}
export type TimeTableWorkDay = {
  day: string
  from: { h: number; m: number }
  to: { h: number; m: number }
}
export type TimeTableType = TimeTableWorkDay[]
