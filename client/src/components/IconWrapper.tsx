import { motion } from 'framer-motion'
import React from 'react'

const IconWrapperVaiants = {
  hover: {
    scale: 1.5,
    transition: { type: 'spring', stiffness: 200 },
  },
  animate: { transition: { ease: 'easeInOut' } },
  tap: {
    scale: 0.8,
  },
}

export default function IconWrapper({
  children,
  color,
  layoutId,
  onClick,
  className,
}: {
  children: React.ReactNode
  color?: keyof typeof hoverColors
  layoutId?: string
  onClick?: () => void
  className?: string
}) {
  const hoverColors = {
    yellow: 'hover:text-yellow-500',
    green: 'hover:text-green-500',
    blue: 'hover:text-blue-500',
    red: 'hover:text-red-500',
    purple: 'hover:text-purple-500',
  }
  const _className = `rounded-full h-14 w-14 flex items-center justify-center cursor-pointer bg-white shadow-lg ${
    color ? hoverColors[color] : ''
  } ${className || ''}`

  return (
    <motion.div
      onClick={onClick}
      variants={IconWrapperVaiants}
      layoutId={layoutId}
      whileHover='hover'
      whileTap='tap'
      animate='animate'
      className={_className}
    >
      {children}
    </motion.div>
  )
}
