import getWorkStatus from '@utils/getWorkStatus'
import React from 'react'
import { TimeTableType } from 'selectors/selectors'

export default function WorkStatus({
  timetable,
}: {
  timetable: TimeTableType
}) {
  const workStatus = getWorkStatus(timetable)
  return (
    <p>
      <b
        className='mr-2'
        style={{ color: workStatus.isOpen ? '#07966a' : '#dc2626' }}
      >
        {workStatus.isOpen ? 'Открыто' : 'Закрыто'}
      </b>
      {workStatus.isOpen ? 'Закроется' : 'Откроется'} в&nbsp;
      {workStatus.work}
    </p>
  )
}
