import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { LayoutType, PageDataType } from 'interfaces'
import React, { useState, Fragment } from 'react'
import { Close } from '@components/Icons'
import LayoutMaker from '@components/LayoutMaker'
import { CheckIcon, SelectorIcon } from '@components/Icons'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Listbox, Transition } from '@headlessui/react'
import classNames from '@utils/classNames'
import { useEffect } from 'react'

type LayoutSelectorProps = {
  layoutMakerData: PageDataType['layouts']
  welcomeText: string
}

type OrderType = {
  data: {
    name: string
    type: 'layout' | 'asset'
    width: number
    height: number
    x: number
    y: number
  }[]
  images: any[]
  id: string
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
  const [order, setOrder] = useState<OrderType>()
  const [formVisible, setFormVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sizeSelectValue, setSizeSelectValue] = useState('')
  const [form, setForm] = useState({
    email: '',
    phone: '',
    name: '',
    size: ''
  })
  console.log(sizeSelectValue);

  useEffect(()=>{
    if(!selectedLayout) return
    setSizeSelectValue(selectedLayout?.sizes[0]||'')
  }, [selectedLayout])
  function onFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prevForm => ({ ...prevForm, [e.target.name]: e.target.value }))
  }

  function closeLayoutMaker() {
    document.body.style.overflow = 'auto'
    setIsLayoutMakerOpen(false)
  }
  function openLayoutMaker() {
    document.body.style.overflow = 'hidden'
    setIsLayoutMakerOpen(true)
  }
  function openForm() {
    setFormVisible(true)
  }
  function closeForm() {
    setFormVisible(false)
  }
  function onExport(
    e: {
      file: any
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

    // downloadURI(e[0].file, e[0].data.name)

    const data = e.map(file => ({ ...file.data }))
    const images = e.map(file => file.file)
    setOrder({ data, images, id: selectedLayout.id })
    setSelectedLayout(null)
    openForm()
  }
  function sendOrder(e: React.FormEvent) {
    e.preventDefault()
    async function send() {
      if (!order) return
      const imagesCount = order.images.length ?? 0
      const formData = new FormData()
      for (let i = 0; i < imagesCount; i++) {
        const img = order.images[i]
        const name = order.data[i].name
        const blob = await (await fetch(img)).blob()
        const file = new File([blob], name)
        formData.append('images', file)
      }
      const API_URL = 'https://photonovik-api.herokuapp.com/order'

      formData.append('data', JSON.stringify(order.data))
      formData.append('id', order.id)
      formData.append('email', form.email)
      formData.append('phone', form.phone)
      formData.append('name', form.name)
      formData.append('size', sizeSelectValue)

      try {
        setLoading(true)
        const { url } = await (
          await fetch(API_URL, { method: 'POST', body: formData })
        ).json()
        window.open(url, '_self')
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    send()
  }
  function onSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {

    setSizeSelectValue(e.target.value)
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
                  <div className='flex justify-between'>
                    <Close onClick={closeLayoutMaker} />
                    {formVisible && (
                      <button
                        className='underline focus:outline-none hover:text-gray-400'
                        onClick={closeForm}
                      >
                        Назад
                      </button>
                    )}
                  </div>
                  <motion.h4 className='text-2xl text-gray-900 text-center'>
                    {formVisible
                      ? 'Заполните данные, чтобы после оплаты Вам пришел чек и мы могли с Вами связаться'
                      : 'Выберите макет'}
                  </motion.h4>
                  {formVisible && (
                    <form onSubmit={sendOrder} className='grid gap-3 mt-3'>
                      <label className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 text-left grid gap-1'>
                        Как к Вам обращаться?
                        <input
                          type='text'
                          name='name'
                          required
                          value={form['name']}
                          onChange={onFormChange}
                          className={
                            'relative bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 text-left'
                          }
                        />
                        Почта
                        <input
                          type='email'
                          name='email'
                          required
                          value={form['email']}
                          onChange={onFormChange}
                          className={
                            'relative bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 text-left'
                          }
                        />
                        Номер телефона
                        <input
                          type='tel'
                          name='phone'
                          required
                          value={form['phone']}
                          onChange={onFormChange}
                          className={
                            'relative bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 text-left'
                          }
                        />
                      </label>
                      <button
                        className={`text-white w-full self-end max-h-9 py-1 px-2 bg-green-500 rounded border border-green-600 focus:outline-none focus:ring-1 hover:bg-green-600 ${
                          loading
                            ? 'disabled:opacity-50 cursor-not-allowed'
                            : ''
                        }`}
                        onClick={() => ({})}
                        disabled={loading}
                      >
                        {loading ? 'Обработка...' : 'Купить'}
                      </button>
                    </form>
                  )}
                  {!formVisible && (
                    <Listbox
                      value={selectedLayout}
                      onChange={setSelectedLayout}
                    >
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
                                            image={
                                              layout.layout.gatsbyImageData
                                            }
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
                  )}{' '}
                </div>
                {selectedLayout?.sizes?.length && (
                  <>
                    Размер{' '}
                    <select
                      onChange={onSizeChange}
                      value={sizeSelectValue}
                      name='size'

                      className='cursor-pointer relative w-full bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 text-left'
                    >
                      {selectedLayout?.sizes.map(size => (
                        <option key={size} value={size} >
                          {size}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                {selectedLayout && (
                  <LayoutMaker
                    clip={{
                      clipX: selectedLayout.clipX,
                      clipY: selectedLayout.clipY,
                      clipHeight: selectedLayout.clipHeight,
                      clipWidth: selectedLayout.clipWidth,
                    }}
                    onExport={onExport}
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
