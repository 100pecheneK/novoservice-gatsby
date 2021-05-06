import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { LayoutType, PageDataType } from 'interfaces'
import React, { useState } from 'react'
// @ts-ignore
import loadable from '@loadable/component'
const LayoutMakerContainer = loadable(
  () => import('@components/LayoutMakerContainer')
)

type LayoutSelectorProps = {
  layoutMakerData: PageDataType['layouts']
  welcomeText: string
}

export default function LayoutSelector({
  layoutMakerData,
  welcomeText,
}: LayoutSelectorProps) {
  if (!layoutMakerData) {
    return null
  }
  const [isLayoutMakerOpen, setIsLayoutMakerOpen] = useState(false)
  const [selectedLayout, setSelectedLayout] = useState<LayoutType | null>(null)

  function closeLayoutMaker() {
    document.body.style.overflow = 'auto'
    setIsLayoutMakerOpen(false)
  }
  function openLayoutMaker() {
    document.body.style.overflow = 'hidden'
    setIsLayoutMakerOpen(true)
  }

  return (
    <AnimateSharedLayout type='crossfade'>
      <motion.h3
        onClick={openLayoutMaker}
        layoutId='maketMaker'
        className='text-2xl underline text-center pt-3 cursor-pointer'
        transition={{ ease: 'easeInOut' }}
      >
        {welcomeText}
      </motion.h3>
      {isLayoutMakerOpen && (
        <AnimatePresence>
          <LayoutMakerContainer
            closeLayoutMaker={closeLayoutMaker}
            selectedLayout={selectedLayout}
            setSelectedLayout={setSelectedLayout}
            layoutMakerData={layoutMakerData}
          />
        </AnimatePresence>
      )}
    </AnimateSharedLayout>
  )
}
