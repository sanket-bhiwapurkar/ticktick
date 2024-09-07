import React, { useState } from 'react'
import styles from './index.module.css'
import { HOURS, MINUTES_SKIP_5 } from 'constant'

interface TimeSettingProps {
    hour: number;
    handleHourChange: (hour: number) => void
    minute: number;
    handleMinuteChange: (minute: number) => void;
    meridiem: string;
    handleMeridiemChange: (meridiem: string) => void;
}

const TimeSetting: React.FC<TimeSettingProps> = ({ hour, handleHourChange, minute, handleMinuteChange, meridiem, handleMeridiemChange }) => {
    const [activeTimeInput, setActiveTimeInput] = useState<'hour' | 'minute'>('hour')
    const handleHourOptionClick = () => setActiveTimeInput('hour')
    const handleMinuteOptionClick = () => setActiveTimeInput('minute')
    const handleAMClick = () => handleMeridiemChange("AM")
    const handlePMClick = () => handleMeridiemChange("PM")
    const handleHourClick = (hour: number) => handleHourChange(hour)
    const handleMinuteClick = (minute: number) => handleMinuteChange(minute)
    const highlightTimeInput = (timeInput: string) => activeTimeInput === timeInput ? "text-violet-600" : "text-violet-300"
    const highlightMeridiemInput = (m: string) => m === meridiem ? "text-violet-600" : "text-violet-300"
    return (
        <div className='flex flex-col items-center'>
            <div className="flex items-center gap-2 font-bold text-4xl">
                <button className={`text-bold ${highlightTimeInput('hour')}`} onClick={handleHourOptionClick}>{hour}</button>
                <p className="mb-2 text-violet-300">:</p>
                <button className={`text-bold ${highlightTimeInput('minute')}`} onClick={handleMinuteOptionClick}>{minute}</button>
                <div className="flex flex-col text-xs font-bold">
                    <button className={highlightMeridiemInput("AM")} onClick={handleAMClick}>AM</button>
                    <button className={highlightMeridiemInput("PM")} onClick={handlePMClick}>PM</button>
                </div>
            </div>

            {activeTimeInput === 'hour' && <div className={`${styles.watch} bg-violet-50`}>
                <div className={`${styles.hand} bg-violet-600`} style={{ transform: `rotate(${30 * (hour)}deg)` }}></div>
                {HOURS.map((h: number) => {
                    const highlightClass = h === hour ? "bg-violet-600 text-white" : ""
                    return (
                        <button key={h} type="button" className={`${styles.hour} ${highlightClass}`} style={{ transform: `translate(-50%, -50%) rotate(${30 * h}deg)` }} onClick={() => handleHourClick(h)}><span style={{ transform: `rotate(-${30 * h}deg)` }}>{h}</span>
                        </button>)
                })}
            </div>}
            {activeTimeInput === 'minute' && <div className={`${styles.watch} bg-violet-50`}>
                <div className={`${styles.hand} bg-violet-600`} style={{ transform: `rotate(${30 * (minute / 5)}deg)` }}></div>
                {MINUTES_SKIP_5.map((m: number, i: number) => {
                    const highlightClass = m === minute ? "bg-violet-600 text-white" : ""
                    return (
                        <button key={m} type="button" className={`${styles.hour} ${highlightClass}`} style={{ transform: `translate(-50%, -50%) rotate(${30 * (i)}deg)` }} onClick={() => handleMinuteClick(m)}><span style={{ transform: `rotate(-${30 * (i)}deg)` }}>{m}</span>
                        </button>)
                })}
            </div>}
        </div >
    )
}

export default TimeSetting
