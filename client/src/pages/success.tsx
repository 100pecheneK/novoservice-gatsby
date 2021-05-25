import { Link } from 'gatsby'
import React from 'react'

export default function Success() {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <h1 className='text-4xl font-bold'>Оплата проведена успешна!</h1>
      <p className='text-xl'>На указанную почту пришел чек об оплате.</p>
      <p className='text-xl'>В скором времени с Вами свяжется наш сотрудник.</p>
      <Link className='underline' to='/'>
        На главную
      </Link>
    </div>
  )
}
