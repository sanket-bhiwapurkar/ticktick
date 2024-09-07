import { DAYS, WEEKDAYS_SHORT } from 'constant'
import React from 'react'
import { matchDates } from 'services/dateServices'

interface CalenderInputProps {
    exportChange: (day: number) => void;
    selectedDays: number[];
}

const CalenderInput: React.FC<CalenderInputProps> = ({ exportChange, selectedDays }) => {
    return (
        <div className='text-violet-600 grid grid-cols-7'>
            {DAYS.slice(0, 31).map((eachday: number, i) => {
                const highlightSelectedDate = selectedDays.includes(eachday) ? "bg-violet-600 !text-white" : ""
                return <div key={i} className='flex justify-center py-1'><button key={i} className={`w-8 h-8 rounded-full ${highlightSelectedDate}`} onClick={() => exportChange(eachday)}>{eachday}</button></div>
            })}
        </div>
    )
}

export default CalenderInput
