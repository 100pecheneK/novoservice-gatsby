import H2 from '@components/H2'
import { useWorkStatus } from '@contexts/WorkStatusContext'
import { TimeTableType } from 'interfaces'
import React from 'react'

type PlaceDataType = {
  map: string
  timetable: TimeTableType
}

export default function PlaceSection({
  placeData: { map, timetable },
}: {
  placeData: PlaceDataType
}) {
  const { isOpen, today } = useWorkStatus()
  const workColor = isOpen ? 'text-green-600' : 'text-red-600'

  return (
    <div className='mt-10'>
      <div className='grid md:grid-cols-2 auto-cols-fr mt-5'>
        <div>
          <H2 text='Наше расписание' />
          <div className='mt-5 grid place-items-center gap-10'>
            <div>
              <h3 className={`text-2xl text-center ${workColor}`}>
                Мы {isOpen ? 'открыты' : 'закрыты'}
              </h3>
              <table className='table-auto text-2xl'>
                <tbody>
                  {timetable.map((time, i) => {
                    const todayClassName = today === i + 1 ? workColor : ''
                    return (
                      <tr key={i} className={todayClassName}>
                        <td>{time.day}</td>
                        <td>
                          {time.from.h}:
                          {time.from.m.toString().padStart(2, '0')}
                        </td>
                        <td>-</td>
                        <td>
                          {time.to.h}:{time.to.m.toString().padStart(2, '0')}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <H2 text='Мы работаем для Вас здесь' />
          <div
            className='mt-5 map'
            dangerouslySetInnerHTML={{ __html: map }}
          />
        </div>
      </div>
    </div>
  )
}
