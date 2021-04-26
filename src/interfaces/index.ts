export type ServiceDataType = {
  id: string
  title: string
  subtitle: string
  subservices?: string[]
  image?: string
  imageAlt: string
  vk?: string
}
export type PageDataType = {
  _type: string
  _documentName: string
  _link: string
  _sort: number
  title: string
  subtitle: string
  logo: string
  servicesContacts: ['vk' | 'email' | 'whatsapp']
  services: Omit<ServiceDataType, 'id'>[]
  logoAlt: string
  mainH1: string
  mainH2: string
  mainShortAddres: string
  links: LinkType[]
  timetable: TimeTableType
  map: string
}

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
export type AvailableIcons =
  | 'Close'
  | 'Phone'
  | 'Humburger'
  | 'Mail'
  | 'Whatsapp'
export type IconProps = {
  layoutId?: string
  onClick?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  className?: string
}

export type SiteInfoType = {
  allContentfulServices: {
    nodes: {
      id: string
      title: string
      link: string
      subtitle: string
      logoAlt: string
      logo: {
        gatsbyImageData: GatsbyImageProps['image']
      }
    }[]
  }
}
export type SettingsType = {
  contentfulSettings: {
    welcomeTitle: string
  }
}

export type HomeProps = {
  data: {
    siteInfo: SiteInfoType
    contentfulSettings: SettingsType
  }
}