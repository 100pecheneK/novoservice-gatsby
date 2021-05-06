import PageLayout from '@components/PageLayout'
import PlaceSection from '@containers/sections/PlaceSection'
import MainSection from '@containers/sections/MainSection'
import ServicesSection from '@containers/sections/ServicesSection'
import selectors from '@selectors'
import React from 'react'
import { Element } from 'react-scroll'
import { WorkStatusProvider } from '@contexts/WorkStatusContext'
import ContactsSection from '@containers/sections/ContactsSection'
import { PageDataType } from 'interfaces'


export default function Page({
  pageContext: data,
}: {
  pageContext: PageDataType
}) {
  const mainData = selectors.mainData(data)
  const email = selectors.email(data)
  const phonenumber = selectors.phonenumber(data)
  const whatsapp = selectors.whatsapp(data)
  const servicesData = selectors.servicesData(data)
  const servicesContacts = selectors.servicesContacts(data)
  const placeData = selectors.placeData(data)
  const timetable = selectors.timetable(data)
  const contactsData = selectors.contactsData(data)
  const serviceWelcomeText = selectors.serviceWelcomeText(data)
  const title = selectors.title(data)
  const layoutMakerData = selectors.layoutMakerData(data)
  return (
    <WorkStatusProvider value={{ timetable }}>
      <PageLayout pageName={title}>
        <MainSection mainData={mainData} />
        <ServicesSection
          serviceWelcomeText={serviceWelcomeText}
          servicesContacts={servicesContacts}
          servicesData={servicesData}
          layoutMakerData={layoutMakerData}
          contacts={{ email, phonenumber, whatsapp }}
        />
        <Element name='timetable'>
          <PlaceSection placeData={placeData} />
        </Element>
        <ContactsSection contactsData={contactsData} />
      </PageLayout>
    </WorkStatusProvider>
  )
}
