import { GatsbyImageProps } from 'gatsby-plugin-image'

export type ServiceDataType = {
  id: string
  title: string
  subtitle: string
  subservices?: string[]
  image?: string
  imageAlt: string
  vk?: string
}
export type LayoutType = {
  id: string
  title: string
  layout: {
    file: {
      url: string
    }
    gatsbyImageData: GatsbyImageProps['image']
  }
  background: {
    file: {
      url: string
    }
  }
  price: number
}
export type PageDataType = {
  link: string
  logoAlt: string
  mainH1: string
  mainH2: string
  mainShortAddres: string
  logo: {
    gatsbyImageData: GatsbyImageProps['image']
  }
  links: LinkType[]
  layouts: LayoutType[] | null
  map: {
    map: string
  }
  services: Omit<ServiceDataType, 'id'>[]
  serviceWelcomeText: string
  serviceContacts: ['vk' | 'email' | 'whatsapp']
  subtitle: string
  timetable: {
    timetable: TimeTableType
  }
  title: string
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
