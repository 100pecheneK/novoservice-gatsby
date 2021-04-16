import React, { useCallback, useMemo, useRef, useState } from 'react'
import getWorkStatus from '@utils/getWorkStatus'
import { TimeTableType } from 'selectors/selectors'

export default function WorkStatus({
  timetable,
}: {
  timetable: TimeTableType
}) {
  const workStatus = getWorkStatus(timetable)
  console.log('workStatus', workStatus)
  const [statusColor, setStatusColor] = useState(
    ['text-red-600', 'text-green-600'][+workStatus.isOpen]
  )
  console.log('statusColor', statusColor)
  return (
    <>
      <b className={`mr-2 ${statusColor}`}>
        {workStatus.isOpen ? 'Открыто' : 'Закрыто'}
      </b>
      {workStatus.isOpen ? 'Закроется' : 'Откроется'} в&nbsp;
      {workStatus.work}
    </>
  )
}
