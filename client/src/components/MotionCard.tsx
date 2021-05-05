import React from 'react'
import { motion } from 'framer-motion'
import { GatsbyImage, GatsbyImageProps } from 'gatsby-plugin-image'

export default function MotionCard({
  layoutId,
  title,
  subtitle,
  logo,
  logoAlt,
}: {
  layoutId: string
  title: string
  subtitle: string
  logo: { gatsbyImageData: GatsbyImageProps['image'] }
  logoAlt: string
}) {
  console.log(layoutId)

  return (
    <motion.div
      layoutId={layoutId}
      initial={{ backgroundColor: '#f9fafb' }}
      animate={{
        backgroundColor: 'rgb(243, 244, 246)',
      }}
      whileHover={{ scale: 1.05, transition: { ease: 'easeIn' } }}
      className='flex-1 flex items-center justify-center text-gray-700 text-center bg-gray-100 hover:bg-gray-200 px-5 py-5 m-2 rounded transition xl:h-full '
    >
      <div className='lg:flex xl:block lg:items-center'>
        <motion.div
          layoutId={`logo-${layoutId}`}
          className='flex justify-center items-center lg:flex-shrink-0'
        >
          <GatsbyImage
            image={logo.gatsbyImageData}
            alt={logoAlt}
            className='rounded-lg lg:max-w-xl'
          />
        </motion.div>
        <div className='mt-4 lg:mt-0 lg:ml-6 xl:mt-4'>
          <motion.div
            layoutId={`title-${layoutId}`}
            className='uppercase tracking-wide text-md text-yellow-600 font-bold'
          >
            {title}
          </motion.div>
          <motion.span
            layoutId={`subtitle-${layoutId}`}
            className='block mt-1 text-lg leading-tight font-semibold text-gray-900'
          >
            {subtitle}
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
