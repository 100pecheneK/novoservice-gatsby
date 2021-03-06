import H2 from '@components/H2'
import { useWorkStatus } from '@contexts/WorkStatusContext'
import { TimeTableType } from 'interfaces'
import React, { useEffect, useRef, useState } from 'react'

type PlaceDataType = {
  map: string
  timetable: TimeTableType
}

export default function PlaceSection({
  placeData: { map, timetable },
}: {
  placeData: PlaceDataType
}) {
  const mapRef = useRef(null)
  const onScreen = useOnScreenOnce(mapRef)

  const { isOpen, today } = useWorkStatus()
  const [statusColor, setStatusColor] = useState('')
  useEffect(() => {
    if (typeof isOpen !== 'undefined') {
      setStatusColor(['text-red-600', 'text-green-600'][+isOpen])
    }
  }, [isOpen])

  return (
    <div className='mt-10'>
      <div className='grid md:grid-cols-2 auto-cols-fr mt-5'>
        <div>
          <H2 text='Наше расписание' />
          <div className='mt-5 grid place-items-center gap-10'>
            <div>
              <h3 className={`text-2xl text-center ${statusColor}`}>
                Мы {isOpen ? 'открыты' : 'закрыты'}
              </h3>
              <table className='table-auto text-2xl'>
                <tbody>
                  {timetable.map((time, i) => {
                    const todayClassName = today === i + 1 ? statusColor : ''
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
        <div ref={mapRef}>
          <H2 text='Мы работаем для Вас здесь' />
          {onScreen && (
            <div
              className='mt-5 map'
              dangerouslySetInnerHTML={{ __html: map }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
const useOnScreenOnce = (ref: any, rootMargin = '0px') => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(currentElement)
        }
      },
      {
        rootMargin,
      }
    )

    const currentElement = ref?.current

    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      observer.unobserve(currentElement)
    }
  }, [])
  return isVisible
}
