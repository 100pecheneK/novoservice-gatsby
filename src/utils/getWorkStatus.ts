import { TimeTableType, TimeTableWorkDay } from 'interfaces'

export default function getWorkStatus(timetable: TimeTableType) {
  const time = new Date()
  console.log(time)

  const { today, h, m } = parseDate(time)
  const nextDay = getNextDay(today)
  const nowOpen = timetable[today - 1]
  const nextOpen = timetable[nextDay - 1]
  const isOpen = getStatusResponce({ h, m }, nowOpen)
  const work = format(isOpen, nowOpen, nextOpen)
  return { isOpen, work, today }
}

function getNextDay(day: number) {
  return day + 1 > 7 ? 1 : day + 1
}

export function parseDate(date: Date) {
  const h = date.getHours()
  const m = date.getMinutes()
  const d = date.getDay()

  const today = d === 0 ? 7 : d

  return { today, h, m }
}

function format(
  isOpen: boolean,
  nowOpen: TimeTableWorkDay,
  nextOpen: TimeTableWorkDay
) {
  if (isOpen) {
    return (
      nowOpen.to.h.toString().padStart(2, '0') +
      ':' +
      nowOpen.to.m.toString().padStart(2, '0')
    )
  }
  return (
    nextOpen.from.h.toString().padStart(2, '0') +
    ':' +
    nextOpen.from.m.toString().padStart(2, '0')
  )
}

function getStatusResponce(
  now: { h: number; m: number },
  workDay: TimeTableWorkDay
) {
  if (now.h < workDay.from.h) return false
  if (now.h > workDay.to.h) return false
  if (now.h === workDay.from.h) {
    if (now.m < workDay.from.m) return false
  }
  if (now.h === workDay.to.h) {
    if (now.m >= workDay.to.m) return false
  }
  return true
}
