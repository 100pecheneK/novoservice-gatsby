import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import React, { useState } from 'react'
import { Element } from 'react-scroll'
import { Close, MailSVG, VkSVG, WhatsappSVG } from '@components/Icons'
import SendButton from '@components/SendButton'
import { GatsbyImage, GatsbyImageProps } from 'gatsby-plugin-image'
import { PageDataType } from 'interfaces'
import LayoutSelector from '@components/LayoutSelector'

export type ServiceDataType = {
  id: string
  title: string
  subtitle: string
  subservices?: string[]
  image?: { gatsbyImageData: GatsbyImageProps['image'] }
  imageAlt: string
  vk?: string
}

export default function ServicesSection({
  servicesData,
  contacts,
  serviceWelcomeText,
  servicesContacts,
  layoutMakerData,
}: {
  servicesData: ServiceDataType[]
  serviceWelcomeText: string
  contacts: { email: string; phonenumber: string; whatsapp: string }
  servicesContacts: ['vk' | 'email' | 'whatsapp']
  layoutMakerData: PageDataType['layouts']
}) {
  const [
    selectedServiceId,
    setSelectedServiceId,
  ] = useState<ServiceDataType | null>(null)
  const [selectedSubserviceIdxs, setSelectedSubserviceIdxs] = useState<
    number[]
  >([])

  function selectService(service: ServiceDataType) {
    setSelectedSubserviceIdxs([])
    setSelectedServiceId(service)
  }

  function getSelectedService() {
    const selectedService = servicesData.find(
      service => service.id === selectedServiceId?.id
    )
    if (!selectedService) throw new Error('Service is not selected yet!')
    return selectedService
  }
  function getSelectedSubservices(selectedService: ServiceDataType) {
    return selectedService.subservices?.filter((_, i) =>
      selectedSubserviceIdxs.includes(i)
    )
  }
  function getOrder() {
    const selectedService = getSelectedService()
    const selectedSubservices = getSelectedSubservices(selectedService)

    return { selectedService: selectedService.title, selectedSubservices }
  }

  function getSubject(selectedService: string) {
    return `Желаемая услуга: ${selectedService}`
  }
  function getBody(selectedSubservices: string[] | undefined) {
    return `Я хочу:%0A${selectedSubservices
      ?.map(ss => '%0B– ' + ss)
      .join('%0A')}`
  }
  function sendToEmail() {
    const { selectedService, selectedSubservices } = getOrder()
    const subject = getSubject(selectedService)
    const body = getBody(selectedSubservices)
    window.open(`${contacts.email}?subject=${subject}&body=${body}`)
  }
  function sendToWhatsapp() {
    const { selectedService, selectedSubservices } = getOrder()
    const subject = getSubject(selectedService)
    const body = getBody(selectedSubservices)
    const text = `${subject}.%0A${body}`
    window.open(`${contacts.whatsapp}${text}`)
  }
  function sendToVk() {
    const selectedService = getSelectedService()
    window.open(selectedService.vk)
  }

  const sendButtons = {
    vk: ({ className }: { className: string }) => (
      <SendButton
        sendDisabled={false}
        className={className}
        onClick={sendToVk}
        color='blue'
        text='Купить в&nbsp;ВК'
        svgIcon={VkSVG}
      />
    ),
    email: ({ className }: { className: string }) => (
      <SendButton
        sendDisabled={!selectedSubserviceIdxs.length}
        className={className}
        onClick={sendToEmail}
        color='yellow'
        text='Отправить на&nbsp;почту'
        svgIcon={MailSVG}
      />
    ),
    whatsapp: ({ className }: { className: string }) => (
      <SendButton
        sendDisabled={!selectedSubserviceIdxs.length}
        className={className}
        onClick={sendToWhatsapp}
        color='green'
        text='Отправить в&nbsp;WhatsApp'
        svgIcon={WhatsappSVG}
      />
    ),
  }

  if (!servicesData.length) {
    return null
  }

  return (
    <Element name='services'>
      <h2 className='text-2xl font-bold text-center pt-3'>
        {serviceWelcomeText}
      </h2>
      <LayoutSelector
        layoutMakerData={layoutMakerData}
        welcomeText={'Или создайте свой макет'}
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <AnimateSharedLayout type='crossfade'>
          {servicesData.map(item => (
            <motion.div
              key={item.id}
              className='max-w-sm mx-auto p-6 bg-white rounded-lg shadow-xl w-full mt-5 cursor-pointer flex flex-col justify-between'
              layoutId={item.id}
              transition={{ ease: 'easeInOut' }}
              onClick={() => selectService(item)}
            >
              {item.image && (
                <GatsbyImage
                  image={item.image.gatsbyImageData}
                  alt={item.imageAlt}
                  className='w-50 h-50 object-cover'
                />
              )}
              <div>
                <motion.h4
                  className='text-xl text-gray-900'
                  layoutId={`service-title-${item.id}`}
                >
                  {item.title}
                </motion.h4>
                <motion.p className='text-base text-gray-600'>
                  {item.subtitle}
                </motion.p>
              </div>
            </motion.div>
          ))}
          {/* Modal */}
          <AnimatePresence>
            {selectedServiceId && (
              <div className='fixed z-10 inset-0 overflow-y-auto'>
                <div className='flex justify-center servicesData-center min-h-screen pt-4 px-4 pb-20 text-center'>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
                    aria-hidden='true'
                    onClick={() => setSelectedServiceId(null)}
                  />
                  {/* Modal content */}
                  <motion.div
                    layoutId={selectedServiceId.id}
                    className='container inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full h-full py-5 px-5'
                  >
                    <div>
                      <Close onClick={() => setSelectedServiceId(null)} />
                      <motion.h4
                        className='text-2xl text-gray-900 text-center'
                        layoutId={`service-title-${selectedServiceId.id}`}
                      >
                        {selectedServiceId.title}
                      </motion.h4>
                      <ul className='mt-4 text-lg'>
                        {selectedServiceId.subservices?.map(
                          (subservice, idx) => {
                            const active = selectedSubserviceIdxs.includes(idx)
                            return (
                              <motion.li
                                key={idx}
                                whileHover={{ scale: 1.1, originX: 0 }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 300,
                                }}
                                className={'flex items-center'}
                                onClick={() => {
                                  setSelectedSubserviceIdxs(prev => {
                                    if (prev.includes(idx))
                                      return prev.filter(i => i !== idx)
                                    return [...prev, idx]
                                  })
                                }}
                              >
                                <label className='flex items-center cursor-pointer'>
                                  {active ? (
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 20 20'
                                      fill='currentColor'
                                      className='h-4 w-4 text-yellow-600'
                                    >
                                      <path
                                        fillRule='evenodd'
                                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                                        clipRule='evenodd'
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      fill='none'
                                      viewBox='0 0 24 24'
                                      stroke='currentColor'
                                      className='h-4 w-4'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                      />
                                    </svg>
                                  )}
                                  <span className='ml-2'>{subservice}</span>
                                </label>
                              </motion.li>
                            )
                          }
                        )}
                      </ul>
                      {servicesContacts && (
                        <div
                          className={`grid md:grid-cols-${
                            servicesContacts.length >= 2 ? 2 : 1
                          } gap-2 md:gap-3`}
                        >
                          {servicesContacts.map((type, i) => {
                            const Send = sendButtons[type]
                            const className =
                              servicesContacts.length % 2 !== 0 &&
                              i + 1 === servicesContacts.length
                                ? 'col-span-2'
                                : ''
                            return <Send key={i} className={className} />
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </AnimateSharedLayout>
      </div>
    </Element>
  )
}
