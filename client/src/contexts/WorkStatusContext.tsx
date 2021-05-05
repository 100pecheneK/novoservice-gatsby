import getWorkStatus from '@utils/getWorkStatus'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { TimeTableType } from 'selectors/selectors'

type WorkStatusContextType = {
  work: string
  isOpen: boolean
  today: number
}
const WorkStatusContext = createContext<Partial<WorkStatusContextType>>({})

const useWorkStatus = () => {
  return useContext(WorkStatusContext)
}

const WorkStatusProvider = ({
  children,
  value: { timetable },
}: {
  children: React.ReactNode
  value: { timetable: TimeTableType }
}) => {
  const [_work, setWork] = useState('')
  const [_isOpen, setIsOpen] = useState(false)
  const [_today, setToday] = useState(1)

  useEffect(() => {
    const { isOpen, today, work } = getWorkStatus(timetable)
    setIsOpen(isOpen)
    setWork(work)
    setToday(today)
  }, [])

  return (
    <WorkStatusContext.Provider
      value={{ work: _work, isOpen: _isOpen, today: _today }}
    >
      {children}
    </WorkStatusContext.Provider>
  )
}
export { WorkStatusProvider, useWorkStatus }
