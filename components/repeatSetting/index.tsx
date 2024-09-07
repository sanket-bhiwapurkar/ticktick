import { useCalender } from 'context/calenderContext'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa6'

import { getShortMonth, getShortWeekDay } from 'services/dateServices'
import CustomRepeatSettingModal from '../customRepeatSetting'
import { useAddTickForm } from 'context/addTickFormContext'

const RepeatSetting = () => {
    const { formData, setformData } = useAddTickForm()
    const { repeatType } = formData
    const handleRepeatTypeChange = (repeatType: string) => setformData(prev => ({ ...prev, repeatType }))
    const { selectedDate } = useCalender()
    const repeatOptions = [
        { type: "None", value: null },
        { type: "Daily", value: null },
        { type: "Weekly", value: `(${getShortWeekDay(selectedDate)})` },
        { type: "Monthly", value: `(On ${selectedDate.getDate()} day)` },
        { type: "Yearly", value: `(On ${getShortMonth(selectedDate)} ${selectedDate.getDate()})` },
        { type: "Every Weekday", value: "(Mon-Fri)" },
    ]
    const highlightSelectedOption = (option: string) => option === repeatType ? "text-violet-600" : ""
    const toggleCheckIcon = (option: string) => option === repeatType ? "" : "hidden"
    return (
        <ul className="flex flex-col list-none text-sm">
            {repeatOptions.map((options, i) => i < repeatOptions.length - 1 ? <li key={options.type} className="px-3 py-2"><button className={`flex items-center gap-8 w-full ${highlightSelectedOption(options.type)}`} onClick={() => handleRepeatTypeChange(options.type)}><p>{options.type} <span className={`text-gray-400 ${highlightSelectedOption(options.type)}`}>{options.value}</span></p><FaCheck className={`ms-auto ${toggleCheckIcon(options.type)}`} /></button></li>
                :
                <li key={options.type} className="px-3 py-2 border-y">
                    <button className={`flex items-center gap-8 w-full ${highlightSelectedOption(options.type)}`} onClick={() => handleRepeatTypeChange(options.type)}>
                        <p>Every Weekday <span className={`text-gray-400 ${highlightSelectedOption(options.type)}`}>(Mon - Fri)</span></p>
                        <FaCheck className={`ms-auto ${toggleCheckIcon(options.type)}`} />
                    </button>
                </li>
            )}
            <li className="px-3 py-2">
                <CustomRepeatSettingModal handleRepeatTypeChange={handleRepeatTypeChange} />
            </li>
        </ul>
    )
}

export default RepeatSetting
