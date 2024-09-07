import { useCalender } from 'context/calenderContext'
import React from 'react'
import { getShortMonth, getShortWeekDay } from 'services/dateServices'

const Header = () => {
    const { today } = useCalender()
    const day = getShortWeekDay(today)
    const month = getShortMonth(today)
    return (
        <header className="bg-violet-600 p-3 text-white">
            <p className="text-xs uppercase mb-3">ticktick</p>
            <h1 className="text-4xl">{day}, {month} {today.getDate()}</h1>
        </header>
    )
}

export default Header
