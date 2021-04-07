import React from 'react'
import { Helmet } from 'react-helmet'

export default function PageLayout({
  children,
  pageName,
}: {
  children: React.ReactNode
  pageName: string
}) {
  console.log('title', pageName)
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>{pageName}</title>
      </Helmet>
      <div className='container bg-gray-50'>{children}</div>
    </>
  )
}
