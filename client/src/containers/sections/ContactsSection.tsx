import H2 from '@components/H2'
import NavA from '@components/NavA'
import { LinkType } from 'interfaces'
import React from 'react'

export default function ContactsSection({
  contactsData: { links },
}: {
  contactsData: {
    links: LinkType[]
  }
}) {
  return (
    <div className='my-10'>
      <H2 text='Контакты' />
      <div className='lg:grid lg:grid-cols-2 xl:grid-cols-3 auto-cols-fr gap-5 mt-5'>
        {links.map((link, i) => (
          <NavA
            key={i}
            link={link}
            className='lg:justify-center xl:justify-start mb-4 lg:mb-0'
            permanentOpen
          />
        ))}
      </div>
    </div>
  )
}
