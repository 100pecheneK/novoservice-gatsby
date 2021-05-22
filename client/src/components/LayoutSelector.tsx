import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { LayoutType, PageDataType } from 'interfaces'
import React, { useState, Fragment } from 'react'
import { Close } from '@components/Icons'
import LayoutMaker from '@components/LayoutMaker'
import { CheckIcon, SelectorIcon } from '@components/Icons'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Listbox, Transition } from '@headlessui/react'
import downloadURI from '@utils/downloadURI'
import classNames from '@utils/classNames'

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
  function onExport(
    e: {
      file: string
      data: {
        name: string
        type: 'layout' | 'asset'
        width: number
        height: number
        x: number
        y: number
      }
    }[]
  ) {
    if (!selectedLayout) return

    downloadURI(e[0].file, e[0].data.name)
    const toBuy = {
      data: e.map(file => ({ ...file.data })),
      id: selectedLayout.id,
    }

    const body = JSON.stringify(toBuy, null, 4)
    document.body.innerText = body

    setSelectedLayout(null)
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
          <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex justify-center servicesData-center min-h-screen pt-4 px-4 pb-20 text-center'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
                aria-hidden='true'
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              />
              <motion.div
                layoutId='maketMaker'
                className='container inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full h-full py-5 px-5'
              >
                <div>
                  <Close onClick={closeLayoutMaker} />
                  <motion.h4 className='text-2xl text-gray-900 text-center'>
                    Выберите макет
                  </motion.h4>
                  <Listbox value={selectedLayout} onChange={setSelectedLayout}>
                    {({ open }) => (
                      <>
                        <div className='mt-1 relative'>
                          <Listbox.Button className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500'>
                            <span className='flex items-center'>
                              {selectedLayout ? (
                                <>
                                  <span className='ml-3 block truncate'>
                                    {selectedLayout.title} -{' '}
                                    {selectedLayout.price}₽
                                  </span>
                                </>
                              ) : (
                                <span className='ml-3 block'>
                                  Выберите макет
                                </span>
                              )}
                            </span>
                            <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                              <SelectorIcon className='h-5 w-5 text-gray-400' />
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                          >
                            <Listbox.Options
                              static
                              className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none '
                            >
                              {layoutMakerData.map(layout => (
                                <Listbox.Option
                                  key={layout.id}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? 'text-white bg-yellow-600'
                                        : 'text-gray-900',
                                      'cursor-default select-none relative py-2 pl-3 pr-9'
                                    )
                                  }
                                  value={layout}
                                >
                                  {({ selected, active }) => (
                                    <>
                                      <div className='flex items-center'>
                                        <GatsbyImage
                                          image={layout.layout.gatsbyImageData}
                                          alt=''
                                          className='flex-shrink-0 h-6 w-6 rounded-full'
                                        />
                                        <span
                                          className={classNames(
                                            selected
                                              ? 'font-semibold'
                                              : 'font-normal',
                                            'ml-3 block truncate'
                                          )}
                                        >
                                          {layout.title} - {layout.price}₽
                                        </span>
                                      </div>

                                      {selected ? (
                                        <span
                                          className={classNames(
                                            active
                                              ? 'text-white'
                                              : 'text-yellow-600',
                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                          )}
                                        >
                                          <CheckIcon
                                            className={classNames(
                                              active
                                                ? 'text-white'
                                                : 'text-yellow-600',
                                              'h-5 w-5'
                                            )}
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>
                {selectedLayout && (
                  <LayoutMaker
                    clip={{
                      clipX: selectedLayout.clipX,
                      clipY: selectedLayout.clipY,
                      clipHeight: selectedLayout.clipHeight,
                      clipWidth: selectedLayout.clipWidth,
                    }}
                    onExport={onExport}
                    backgroundImage={selectedLayout.background.file.url}
                    layoutImage={selectedLayout.layout.file.url}
                  />
                )}
              </motion.div>
            </div>
          </div>
        </AnimatePresence>
      )}
    </AnimateSharedLayout>
  )
}
