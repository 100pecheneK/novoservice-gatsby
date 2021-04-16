import React, { useRef } from 'react'
import getWorkStatus from '@utils/getWorkStatus'
import { TimeTableType } from 'selectors/selectors'

export default function WorkStatus({
  timetable,
}: {
  timetable: TimeTableType
}) {
  const workStatus = getWorkStatus(timetable)
  const statusColor = ['text-red-600', 'text-green-600']
  return (
    <>
      <b className={`mr-2 ${statusColor[+workStatus.isOpen]}`}>
        {workStatus.isOpen ? 'Открыто' : 'Закрыто'}
      </b>
      {workStatus.isOpen ? 'Закроется' : 'Откроется'} в&nbsp;
      {workStatus.work}
    </>
  )
}
