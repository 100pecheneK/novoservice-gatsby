import PageLayout from '@components/PageLayout'
import PlaceSection from '@containers/sections/PlaceSection'
import MainSection from '@containers/sections/MainSection'
import ServicesSection from '@containers/sections/ServicesSection'
import selectors from '@selectors'
import React from 'react'
import { Element } from 'react-scroll'
import { WorkStatusProvider } from '@contexts/WorkStatusContext'
import ContactsSection from '@containers/sections/ContactsSection'
import { PageDataType } from 'selectors/selectors'

export default function Page({ data }: { data: PageDataType }) {
  const mainData = selectors.mainData(data)
  const email = selectors.email(data)
  const phonenumber = selectors.phonenumber(data)
  const servicesData = selectors.servicesData(data)
  const servicesContacts = selectors.servicesContacts(data)
  const placeData = selectors.placeData(data)
  const timetable = selectors.timetable(data)
  const contactsData = selectors.contactsData(data)

  return (
    <WorkStatusProvider value={{ timetable }}>
      <PageLayout>
        <MainSection mainData={mainData} />
        <ServicesSection
          servicesContacts={servicesContacts}
          servicesData={servicesData}
          contacts={{ email, phonenumber }}
        />
        <Element name='timetable'>
          <PlaceSection placeData={placeData} />
        </Element>
        <ContactsSection contactsData={contactsData} />
      </PageLayout>
    </WorkStatusProvider>
  )
}
