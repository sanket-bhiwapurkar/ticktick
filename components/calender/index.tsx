'use client'
import React, { useState } from 'react'
import "@/styles/global.css";
import { useCalender } from 'context/calenderContext';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { getShortMonth, matchDates } from 'services/dateServices';
import { WEEKDAYS_SHORT } from 'constant';
import { useAddTickForm } from 'context/addTickFormContext';

interface daysInterface { date: Date, filler: boolean }

interface CalenderProps {
    variant: "input" | "preview";
}

const Calender: React.FC<CalenderProps> = ({ variant }) => {
    const { today, selectedDate, setSelectedDate } = useCalender()
    const [navigationDate, setNavigationDate] = useState(new Date())
    const { formData, setformData } = useAddTickForm()
    const monthString = getShortMonth(navigationDate)
    const days = daysInMonth(navigationDate)
    const previewRenderer = (date: Date) => {
        if (variant !== "preview") return ""
        const upcomingDate = date >= selectedDate
        const weekdayMatch = date.getDay() === selectedDate.getDay()
        const monthDayMatch = date.getDate() === selectedDate.getDate()
        const monthMatch = date.getMonth() === selectedDate.getMonth()
        const weekdays = 0 < date.getDay() && date.getDay() < 6
        const diffTime = Math.ceil(Math.abs(date - selectedDate) / (1000 * 60 * 60 * 24));
        const highlightClass = "bg-violet-100 text-violet-600"
        switch (formData.repeatType) {
            case "Daily":
                return upcomingDate ? highlightClass : ""
            case "Weekly":
                return upcomingDate && weekdayMatch ? highlightClass : ""
            case "Monthly":
                return upcomingDate && monthDayMatch ? highlightClass : ""
            case "Yearly":
                return upcomingDate && monthMatch && monthDayMatch ? highlightClass : ""
            case "Every Weekday":
                return upcomingDate && weekdays ? highlightClass : ""
            case "Custom":
                const { everyXValue, everyXType, skipWeekends, weeklyOn, monthlyOn, yearlyOnMonthOf, yearlyOnXthWeek, yearlyOnWeekday } = formData.repeatCustomSetting
                switch (everyXType) {
                    case "Day":
                        return upcomingDate && diffTime % everyXValue === 0 ? highlightClass : ""
                    // TODO:
                    default:
                        break;
                }
            default:
                return null;
        }
    }
    return (
        <div>
            <div className='flex items-center gap-3 mb-3'>
                <p className='font-bold me-auto'>{`${monthString} ${navigationDate.getFullYear()}`}</p>
                <button onClick={goPrevMonth}><FaAngleLeft /></button>
                <button onClick={goNextMonth}><FaAngleRight /></button>
            </div>
            <div className='text-red-600 grid grid-cols-7'>
                {WEEKDAYS_SHORT.map((eachDay, i) => <p key={i} className='text-gray-400 text-sm text-center' >{eachDay}</p>)}
                {days.map((eachday: daysInterface, i) => {
                    const fadeFillerDates = eachday.filler ? "text-gray-400" : "text-violet-600"
                    const highlightToday = matchDates(today, eachday.date) && !eachday.filler ? "bg-black text-white" : ""
                    const highlightSelectedDate = matchDates(selectedDate, eachday.date) && !eachday.filler ? "!bg-violet-600 !text-white" : ""
                    return <div key={i} className='flex justify-center py-1'><button key={i} className={`w-8 h-8 rounded-full ${fadeFillerDates} ${highlightToday} ${highlightSelectedDate} ${previewRenderer(eachday.date)}`} onClick={() => handleDateClick(eachday.date)}>{eachday.date.getDate()}</button></div>
                })}
            </div>
        </div>
    )

    function handleDateClick(date: Date) {
        setSelectedDate(date)
    }

    function goPrevMonth() {
        setNavigationDate(prev => {
            const newDate = new Date(prev)
            newDate.setMonth(new Date(prev).getMonth() - 1, 1);
            return newDate
        })
    }
    function goNextMonth() {
        setNavigationDate(prev => {
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
}

export default Calender
