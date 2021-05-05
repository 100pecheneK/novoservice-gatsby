import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import getWorkStatus from '@utils/getWorkStatus'
import { TimeTableType } from 'selectors/selectors'

export default function WorkStatus({
  timetable,
}: {
  timetable: TimeTableType
}) {
  const workStatus = getWorkStatus(timetable)
  const [statusColor, setStatusColor] = useState('')
  useEffect(() => {
    setStatusColor(['text-red-600', 'text-green-600'][+workStatus.isOpen])
  }, [workStatus])
  if (!statusColor) return null
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
