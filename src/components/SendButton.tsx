import { motion } from 'framer-motion'
import React from 'react'

export default function SendButton({
  sendDisabled,
  onClick,
  text,
  className,
  color,
  svgIcon: SvgIcon,
}: {
  sendDisabled: boolean
  onClick: () => void
  text: string
  className: string
  color: 'yellow' | 'green' | 'blue'
  svgIcon: React.FC
}) {
  return (
    <motion.button
      whileHover={
        sendDisabled
          ? {}
          : {
              scale: 1.025,
              transition: { type: 'spring', stiffness: 200 },
            }
      }
      animate={sendDisabled ? {} : { transition: { ease: 'easeInOut' } }}
      whileTap={
        sendDisabled
          ? {}
          : {
              scale: 0.95,
            }
      }
      onClick={onClick}
      disabled={sendDisabled}
      className={`mt-3 w-full divide-x-2 inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-${color}-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 disabled:opacity-50 ${
        sendDisabled ? 'cursor-not-allowed' : `hover:bg-${color}-500`
      } ${className || ''}`}
    >
      <span className='mr-3'>{text}</span>
      <div className='pl-3'>
        <SvgIcon />
      </div>
    </motion.button>
  )
}
