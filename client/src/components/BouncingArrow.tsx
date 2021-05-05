import React from 'react'
import { motion } from 'framer-motion'

export default function BouncingArrow({
  onClick,
}: {
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}) {
  return (
    <button
      className='pt-12 cursor-pointer focus:outline-none'
      onClick={onClick}
    >
      <motion.div
        className='flex flex-none items-center justify-center'
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        transition={{
          y: {
            duration: 0.4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeIn',
          },
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          className='h-10 w-10 '
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 14l-7 7m0 0l-7-7m7 7V3'
          />
        </svg>
      </motion.div>
    </button>
  )
}
