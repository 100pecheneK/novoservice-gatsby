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
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'purple'
  layoutId?: string
  onClick?: () => void
  className?: string
}) {
  const _className = `rounded-full h-14 w-14 flex items-center justify-center cursor-pointer bg-white shadow-lg ${
    color ? `hover:text-${color}-500` : ''
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
