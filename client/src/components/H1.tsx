import React from 'react'
import { motion } from 'framer-motion'

export default function H1({ text }: { text: string }) {
  return (
    <motion.h1
      animate={{ transition: { ease: 'easeInOut' } }}
      layoutId='header'
      className='font-bold text-2xl flex self-center'
    >
      {text}
    </motion.h1>
  )
}
