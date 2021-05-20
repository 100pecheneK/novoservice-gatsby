import { Close } from '@components/Icons'
import LayoutMaker from '@components/LayoutMaker'
import { Listbox, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import { GatsbyImage } from 'gatsby-plugin-image'
import { LayoutType } from 'interfaces'
import React, { Fragment } from 'react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function LayoutMakerContainer({
  closeLayoutMaker,
  selectedLayout,
  setSelectedLayout,
  layoutMakerData,
}: {
  closeLayoutMaker: () => void
  selectedLayout: LayoutType | null
  setSelectedLayout: React.Dispatch<React.SetStateAction<LayoutType | null>>
  layoutMakerData: LayoutType[]
}) {
  return null
}
