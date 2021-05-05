import React from 'react'
import PageLayout from '@components/PageLayout'

export default function NotFound() {
  return (
    <PageLayout>
      <div className='h-screen'>
        <h1 className='text-5xl text-center'>Увы, но такой страницы нет :(</h1>
        <h2 className='text-3xl text-center underline hover:text-yellow-600 transition-colors'>
          <a href='/'>Перейти на главную</a>
        </h2>
      </div>
    </PageLayout>
  )
}
