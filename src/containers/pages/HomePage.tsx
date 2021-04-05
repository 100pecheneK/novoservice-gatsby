import H1 from '@components/H1'
import MotionCard from '@components/MotionCard'
import { AnimatePresence } from 'framer-motion'
import { Link } from 'gatsby'
import { SettingsType, SiteInfoType } from 'pages'
import React from 'react'

export type HomePageProps = {
  siteInfo: SiteInfoType
  settings: SettingsType
}

export default function HomePage({ siteInfo, settings }: HomePageProps) {
  return (
    <div className='container h-screen grid place-items-center'>
      <div className='flex flex-col'>
        <H1 text={settings.welcomeTitle} />
        <div className='xl:flex justify-center'>
          {siteInfo.nodes.map(({ frontmatter: { _link, ...cardData }, id }) => (
            <AnimatePresence key={id}>
              <Link to={_link}>
                <MotionCard layoutId={_link} {...cardData} />
              </Link>
            </AnimatePresence>
          ))}
        </div>
      </div>
    </div>
  )
}
