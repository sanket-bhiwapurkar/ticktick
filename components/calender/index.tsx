import React, { useState } from 'react'
import "@/styles/global.css";

const monthsStrings = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const daysStrings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

interface daysInterface { date: Date, filler: boolean }

const Calender = () => {
    const [today, setToday] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())
    const month = selectedDate.getMonth()
    const days = daysInMonth(selectedDate)
    return (
        <div>
            <p>{`${monthsStrings[month]} ${selectedDate.getFullYear()}`}</p>
            <div>
                <button onClick={goPrevMonth}>Prev</button>
                <button onClick={goNextMonth}>next</button>
            </div>
            <div className='text-red-600 grid grid-cols-7'>
                {daysStrings.map((eachDay, i) => <p key={i} className='text-gray-400' >{eachDay}</p>)}
                {days.map((eachday: daysInterface, i) => {
                    const fadeFillerDates = eachday.filler ? "text-gray-400" : "text-blue-500"
                    const highlightToday = matchDates(today, eachday.date) && !eachday.filler ? "bg-black text-white" : ""
                    const highlightSelectedDate = matchDates(selectedDate, eachday.date) && !eachday.filler ? "bg-violet-500 text-white" : ""
                    return <button key={i} className={`${fadeFillerDates} ${highlightToday} ${highlightSelectedDate}`} onClick={() => handleDateClick(eachday.date)}>{eachday.date.getDate()}</button>
                })}
            </div>
        </div>
    )

    function handleDateClick(date: Date) {
        setSelectedDate(date)
    }

    function goPrevMonth() {
        setSelectedDate(prev => {
            const newDate = new Date(prev)
            newDate.setMonth(new Date(prev).getMonth() - 1, 1);
            return newDate
        })
    }
    function goNextMonth() {
        setSelectedDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + 1, 1);
            return newDate;
        })
    }
    function daysInMonth(date: Date) {
        const days: daysInterface[] = []
        const year = date.getFullYear()
        const month = date.getMonth()
        const startDay = new Date(year, month, 1).getDay()
        const endDate = new Date(year, month + 1, 0).getDate()
        const prevMonthDays = new Date(year, month, 0).getDate()
        for (let d = prevMonthDays - startDay + 1; d <= prevMonthDays; d++) {
            days.push({ date: new Date(year, month - 1, d), filler: true })
        }
        for (let d = 1; d <= endDate; d++) {
            days.push({ date: new Date(year, month, d), filler: false })
        }
        const daysLength = days.length
        for (let d = 1; d <= 42 - daysLength; d++) {
            days.push({ date: new Date(year, month + 1, d), filler: true })
        }
        return days
    }
    function matchDates(date1: Date, date2: Date) {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }
}

export default Calender
