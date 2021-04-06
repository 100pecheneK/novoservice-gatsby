import { AnimateSharedLayout } from 'framer-motion'
import React from 'react'


export default function Layout({ children }: { children: React.ReactNode }) {
  return <AnimateSharedLayout type='crossfade'>{children}</AnimateSharedLayout>
}
