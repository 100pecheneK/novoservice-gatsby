import { Close } from '@components/Icons'
import LayoutMaker from '@components/LayoutMaker'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
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
  return (
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
                              {selectedLayout.title} - {selectedLayout.price}₽
                            </span>
                          </>
                        ) : (
                          <span className='ml-3 block'>Выберите макет</span>
                        )}
                      </span>
                      <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                        <SelectorIcon
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
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
                                      active ? 'text-white' : 'text-yellow-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckIcon
                                      className='h-5 w-5'
                                      aria-hidden='true'
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
              onExport={(
                e: {
                  file: string
                  name: string
                  type: 'layout' | 'asset'
                }[]
              ) => {
                function downloadURI(uri: string, name: string) {
                  var link = document.createElement('a')
                  link.download = name
                  link.href = uri
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }

                downloadURI(e[0].file, e[0].name)
                const toBuy = {
                  e,
                  selectedLayoutId: selectedLayout.id,
                }
                const body = JSON.stringify(toBuy)
                console.log(body)
              }}
              backgroundImage={selectedLayout.background.file.url}
              layoutImage={selectedLayout.layout.file.url}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}
