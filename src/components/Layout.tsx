import { AnimateSharedLayout } from 'framer-motion'
import React from 'react'
import '../styles/globals.css'
import { Helmet } from 'react-helmet'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Сервисы Новоуральск</title>
        <meta
          name='google-site-verification'
          content='DbG-0d2fCX-0i-V3UumkrTUkLkWnFFHmdyPXVNiAwyY'
        />
      </Helmet>
      <AnimateSharedLayout type='crossfade'>{children}</AnimateSharedLayout>
    </>
  )
}
