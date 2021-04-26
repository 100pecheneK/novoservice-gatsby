import { motion } from 'framer-motion'
import { GatsbyImage, GatsbyImageProps } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { scroller } from 'react-scroll'
import BouncingArrow from '@components/BouncingArrow'
import WorkStatus from '@components/WorkStatus'
import Navbar from '@components/Navbar'
import { LinkType, TimeTableType } from 'selectors/selectors'

export type MainSectionDataType = {
  links: LinkType[]
  link: string
  timetable: TimeTableType
  image: GatsbyImageProps['image']
  logoAlt: string
  mainH1: string
  mainH2: string
  mainShortAddres: string
}

export default function MainSection({
  mainData: {
    links,
    link,
    timetable,
    image,
    logoAlt,
    mainH1,
    mainH2,
    mainShortAddres,
  },
}: {
  mainData: MainSectionDataType
}) {
  const [isHumburgerOpen, setIsHumburgerOpen] = useState(false)
  console.log(link)

  return (
    <motion.main layoutId={link} className='flex flex-col h-full lg:h-screen'>
      <Navbar
        links={links}
        isHumburgerOpen={isHumburgerOpen}
        setIsHumburgerOpen={setIsHumburgerOpen}
      />

      <div className='flex flex-col justify-between h-full'>
        <motion.div
          className='flex flex-grow flex-col mt-10 md:mt-0 md:flex-row md:items-center'
          layoutId={'link'}
        >
          <div className='md:w-2/5'>
            <motion.div layoutId={`title-${link}`}>
              <h1 className='text-6xl font-bold'>{mainH1}</h1>
              <h2 className='text-4xl font-bold'>{mainH2}</h2>
            </motion.div>
            <motion.div layoutId={`subtitle-${link}`} className='mt-5'>
              <p className='text-2xl'>{mainShortAddres}</p>
              <p className='text-2xl'>
                <WorkStatus timetable={timetable} />
              </p>
              <button
                className='text-1xl underline cursor-pointer focus:outline-none'
                onClick={e => {
                  e.preventDefault()
                  scroller.scrollTo('timetable', { smooth: true })
                }}
              >
                Смотреть расписание
              </button>
            </motion.div>
          </div>
          <motion.div
            layoutId={`logo-${link}`}
            className='md:w-3/5 order-first md:order-none'
          >
            <GatsbyImage image={image} alt={logoAlt} />
          </motion.div>
        </motion.div>
        <BouncingArrow
          onClick={() => scroller.scrollTo('services', { smooth: true })}
        />
      </div>
    </motion.main>
  )
}
