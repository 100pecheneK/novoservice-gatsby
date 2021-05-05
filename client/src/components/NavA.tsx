import { motion } from 'framer-motion'
import { LinkType } from 'interfaces'
import React, { useState } from 'react'
import * as icons from './Icons'

const navAVariants = {
  hidden: {
    y: '-100vh',
  },
  visible: {
    y: 0,
    transition: { type: 'spring', stiffness: 50 },
  },
  exit: {
    y: '-100vh',
    transition: { type: 'spring', stiffness: 50 },
  },
}

export default function NavA({
  link: { href, icon, text },
  className,
  permanentOpen = false,
}: {
  link: LinkType
  className?: string
  permanentOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(permanentOpen)
  const Icon = icons[icon]

  function onIconClick() {
    if (permanentOpen) return window.open(href, '_self')
    setIsOpen(o => !o)
  }

  return (
    <motion.div
      variants={navAVariants}
      className={`flex mt-4 md:mt-0 break-all ${className || ''}`}
    >
      {Icon && <Icon onClick={onIconClick} />}
      {isOpen && (
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='flex ml-3 items-center font-bold underline'
          href={href}
        >
          {text}
        </motion.a>
      )}
    </motion.div>
  )
}
