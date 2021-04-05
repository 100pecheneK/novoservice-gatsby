import React from 'react'

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className='container bg-gray-50'>{children}</div>
}
