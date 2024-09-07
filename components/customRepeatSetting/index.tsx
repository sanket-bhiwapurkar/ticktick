import React, { ReactNode, useEffect, useState } from 'react'
import { FaAngleRight, FaCheck, FaXmark } from 'react-icons/fa6'
import Popup from 'reactjs-popup'
import WheelPicker from '../wheelPicker'
import { DATECOMPS, DAYS, MONTHS_FULL, WEEK_NUMBER, WEEKDAYS_FULL } from 'constant'
import { ButtonBase } from '../button'
import { useAddTickForm } from 'context/addTickFormContext'
import CalenderInput from '../calenderInput'

const daysStrings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

interface CustomRepeatSettingModalProps {
    handleRepeatTypeChange: (repeatType: string) => void
}

const CustomRepeatSettingModal: React.FC<CustomRepeatSettingModalProps> = ({ handleRepeatTypeChange }) => {
    const { formData, setformData } = useAddTickForm()
    const { repeatCustomSetting, repeatType } = formData
    const { enableStartDate, startDate, enableEndDate, endDate, everyXValue, everyXType, skipWeekends, weeklyOn, monthlyOn, yearlyOnMonthOf, yearlyOnXthWeek, yearlyOnWeekday } = repeatCustomSetting
    const handleEnableStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformData(prev => ({ ...prev, repeatCustomSetting: { ...prev.repeatCustomSetting, enableStartDate: e.target.checked } }))
    }
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformData(prev => ({ ...prev, repeatCustomSetting: { ...prev.repeatCustomSetting, startDate: e.target.value } }))
    }
    const handleEnableEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformData(prev => ({ ...prev, repeatCustomSetting: { ...prev.repeatCustomSetting, enableEndDate: e.target.checked } }))
    }
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformData(prev => ({ ...prev, repeatCustomSetting: { ...prev.repeatCustomSetting, endDate: e.target.value } }))
    }
    const handleSkipWeekendsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformData(prev => ({ ...prev, repeatCustomSetting: { ...prev.repeatCustomSetting, skipWeekends: e.target.checked } }))
    }
    const handleEveryXValueChange = (everyXValue: number | string | any) => {
        setformData(prev => ({ ...prev, repeatCustomSetting: { ...prev.repeatCustomSetting, everyXValue } }))
    }
    const handleEveryXTypeChange = (everyXType: number | string | any) => {
        setformData(prev => ({ ...prev, repeatCustomSetting: { ...prev.repeatCustomSetting, everyXType } }))
    }
    const handleWeekDayClick = (weekday: string) => {
        (weeklyOn.includes(weekday)) ?
            setformData(prev => ({ ...prev, repeatCustomSetting: { ...prev.repeatCustomSetting, weeklyOn: prev.repeatCustomSetting.weeklyOn.filter(week => weekday !== week) } }))
            :
            setformData(prev => ({ ...prev, repeatCustomSetting: { ...prev.repeatCustomSetting, weeklyOn: [...prev.repeatCustomSetting.weeklyOn, weekday] } }))
    }
    const handleMonthyOnChange = (day: number) => {
        (monthlyOn.includes(day)) ?
            setformData(prev => ({ ...prev, repeatCustomSetting: { ...prev.repeatCustomSetting, monthlyOn: prev.repeatCustomSetting.monthlyOn.filter(d => day !== d) } }))
            :
            setformData(prev => ({ ...prev, repeatCustomSetting: { ...prev.repeatCustomSetting, monthlyOn: [...prev.repeatCustomSetting.monthlyOn, day] } }))
    }
    const handleYearlyOnMonthOfChange = (yearlyOnMonthOf: number | string | any) => {
        setformData(prev => ({ ...prev, repeatCustomSetting: { ...prev.repeatCustomSetting, yearlyOnMonthOf } }))
    }
    const handleYearlyOnXthWeekChange = (yearlyOnXthWeek: number | string | any) => {
        setformData(prev => ({ ...prev, repeatCustomSetting: { ...prev.repeatCustomSetting, yearlyOnXthWeek } }))
    }
    const handleYearlyOnWeekdayChange = (yearlyOnWeekday: number | string | any) => {
        setformData(prev => ({ ...prev, repeatCustomSetting: { ...prev.repeatCustomSetting, yearlyOnWeekday } }))
    }

    return (
        <Popup trigger={<button className="flex items-center gap-8 w-full">
            <p>Custom</p>
            <FaAngleRight className="ms-auto" />
        </button>} onOpen={() => handleRepeatTypeChange("Custom")} modal>
            {function (close) {
                return <div className='flex flex-col gap-3 bg-violet-50 shadow-lg border rounded-lg h-[calc(100vh-10px)] p-3 overflow-auto hide-scrollbar'>
                    <div className='flex items-center gap-2'>
                        <ButtonBase><FaXmark onClick={close} /></ButtonBase>
                        <p className='font-semibold text-xl'>Custom</p>
                        <ButtonBase className='ms-auto'><FaCheck /></ButtonBase>
                    </div>
                    {/* Enable Start Date */}
                    <div className='p-3 rounded-lg bg-white shadow-lg'>
                        <div className='flex items-center justify-between'>
                            <label htmlFor="enablestartdate" className='text-sm'>Enable Start Date</label>
                            <input type="checkbox" id='enablestartdate' checked={enableStartDate} onChange={(e) => handleEnableStartDateChange(e)} />
                        </div>
                        {enableStartDate && <div className='flex items-center justify-between mt-3'>
                            <label htmlFor="startdate" className='text-sm'>Start Date</label>
                            <input type="date" id='startdate' className='text-sm border-b' value={startDate} onChange={(e) => handleStartDateChange(e)} />
                        </div>}
                    </div>
                    {/* Enable End Date */}
                    <div className='p-3 rounded-lg bg-white shadow-lg'>
                        <div className='flex items-center justify-between'>
                            <label htmlFor="enableenddate" className='text-sm'>Enable End Date</label>
                            <input type="checkbox" id='enableenddate' checked={enableEndDate} onChange={(e) => handleEnableEndDateChange(e)} />
                        </div>
                        {enableEndDate && <div className='flex items-center justify-between mt-3'>
                            <label htmlFor="enddate" className='text-sm'>End Date</label>
                            <input type="date" id='enddate' className='text-sm border-b' value={endDate} onChange={e => handleEndDateChange(e)} />
                        </div>}
                    </div>
                    {/* Frequency */}
                    <div className='p-3 rounded-lg bg-white shadow-lg'>
                        <p className='text-sm'>Frequency</p>
                        <div className='flex items-center justify-around'>
                            <p>Every</p>
                            <WheelPicker options={DAYS} exportChange={handleEveryXValueChange} />
                            <WheelPicker options={DATECOMPS} exportChange={handleEveryXTypeChange} />
                        </div>
                    </div>
                    {/* Description */}
                    <p className='text-xs p-1'>Lorem ipsum dolor sit amet consectetur.</p>
                    {/* Skip Weekends */}
                    {everyXType === "Day" && <div className='p-3 rounded-lg bg-white shadow-lg'>
                        <div className='flex items-center justify-between'>
                            <label htmlFor="skipweekends" className='text-sm'>Skip Weekends</label>
                            <input type="checkbox" id='skipweekends' checked={skipWeekends} onChange={(e) => handleSkipWeekendsChange(e)} />
                        </div>
                    </div>}
                    {/* Week */}
                    {everyXType === "Week" && <div className='p-3 rounded-lg bg-white shadow-lg'>
                        <p className='text-sm mb-3'>Week</p>
                        <div className='flex flex-wrap gap-2'>
                            {daysStrings.map(eachday => {
                                const highlightClass = weeklyOn.includes(eachday) ? "bg-violet-600 text-white" : "bg-violet-50"
                                return (<button key={eachday} type='button' className={`h-8 px-4 rounded-2xl ${highlightClass}`} onClick={() => handleWeekDayClick(eachday)}>{eachday}</button>)
                            })}
                        </div>
                    </div>}
                    {/* Month */}
                    {everyXType === "Month" && <div className='p-3 rounded-lg bg-white shadow-lg'><CalenderInput exportChange={handleMonthyOnChange} selectedDays={monthlyOn} /></div>}
                    {/* Year */}
                    {everyXType === "Year" && <div className='p-3 rounded-lg bg-white shadow-lg'>
                        <div className='flex justify-between'>
                            <WheelPicker options={MONTHS_FULL} exportChange={handleYearlyOnMonthOfChange} />
                            <WheelPicker options={WEEK_NUMBER} exportChange={handleYearlyOnXthWeekChange} />
                            <WheelPicker options={WEEKDAYS_FULL} exportChange={handleYearlyOnWeekdayChange} />
                        </div>
                    </div>}
                </div>
            }}
        </Popup>
    )
}

export default CustomRepeatSettingModal
