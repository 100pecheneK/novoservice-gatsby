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
  sendDisabled?: boolean
  onClick?: () => void
  text: string
  className?: string
  color: keyof typeof hoverColors
  svgIcon?: React.FC
}) {
  const hoverColors = {
    yellow: 'hover:bg-yellow-500',
    green: 'hover:bg-green-500',
    blue: 'hover:bg-blue-500',
  }

  const bgColors = {
    yellow: 'bg-yellow-600  ',
    green: 'bg-green-600  ',
    blue: 'bg-blue-600  ',
  }
  const focusColors = {
    yellow: 'focus:ring-yellow-500',
    green: 'focus:ring-green-500',
    blue: 'focus:ring-blue-500',
  }
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
      className={`mt-3 w-full divide-x-2 inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        bgColors[color]
      } ${focusColors[color]} disabled:opacity-50 ${
        sendDisabled ? 'cursor-not-allowed' : hoverColors[color]
      } ${className || ''}`}
    >
      <span className='mr-3'>{text}</span>
      <div className='pl-3'>{SvgIcon && <SvgIcon />}</div>
    </motion.button>
  )
}
