import H1 from '@components/H1'
import MotionCard from '@components/MotionCard'
import { AnimatePresence } from 'framer-motion'
import { Link } from 'gatsby'
import { SettingsType, SiteInfoType } from 'interfaces'

import React from 'react'

export type HomePageProps = {
  siteInfo: SiteInfoType
  settings: SettingsType
}

export default function HomePage({
  pageContext: { siteInfo, settings },
}: {
  pageContext: HomePageProps
}) {
  return (
    <div className='container h-screen grid place-items-center'>
      <div className='flex flex-col'>
        <H1 text={settings.contentfulSettings.welcomeTitle} />
        <div className='xl:flex justify-center'>
          {siteInfo.allContentfulServices.nodes.map(
            ({ id, link, ...cardData }) => (
              <AnimatePresence key={id}>
                <Link to={link}>
                  <MotionCard layoutId={link} {...cardData} />
                </Link>
              </AnimatePresence>
            )
          )}
        </div>
      </div>
    </div>
  )
}
