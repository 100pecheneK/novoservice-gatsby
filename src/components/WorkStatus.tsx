import React, { useRef } from 'react'
import getWorkStatus from '@utils/getWorkStatus'
import { TimeTableType } from 'selectors/selectors'

export default function WorkStatus({
  timetable,
}: {
  timetable: TimeTableType
}) {
  const workStatus = getWorkStatus(timetable)
  console.log("workStatus", workStatus)

  return (
    <>
      <b
        className={`mr-2 ${
          workStatus.isOpen ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {workStatus.isOpen ? 'Открыто' : 'Закрыто'}
      </b>
      {workStatus.isOpen ? 'Закроется' : 'Откроется'} в&nbsp;
      {workStatus.work}
    </>
  )
}
