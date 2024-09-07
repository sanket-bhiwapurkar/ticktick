'use client'
import React from 'react'
import { FaCalendarDays, FaCheck, FaXmark } from "react-icons/fa6";
import Popup from "reactjs-popup";
import { TabButtons, TabinationItem } from '../tabination';
import { TabinationProvider } from 'context/tabinationContext';
import Calender from '../calender';
import TimeSetting from '../timeSetting';
import RepeatSetting from '../repeatSetting';
import { CalenderProvider } from 'context/calenderContext';
import { ButtonBase, TextButton } from '../button';
import { useAddTickForm } from 'context/addTickFormContext';

const CustomizeAddModal = () => {
    const { formData, setformData } = useAddTickForm()
    const { hour, minute, meridiem } = formData
    const handleHourChange = (hour: number) => setformData(prev => ({ ...prev, hour }))
    const handleMinuteChange = (minute: number) => setformData(prev => ({ ...prev, minute }))
    const handleMeridiemChange = (meridiem: string) => setformData(prev => ({ ...prev, meridiem }))
    return (
        <Popup trigger={<button type="button" className="flex items-center gap-1 text-violet-600">
            <FaCalendarDays />
            Today
        </button>
        } modal nested >
            {function (close) {
                return (
                    <div className='flex flex-col gap-3 shadow-lg bg-violet-50 border rounded-lg p-3'>
                        <div className='flex items-center gap-2'>
                            <ButtonBase><FaXmark onClick={close} /></ButtonBase>
                            <ButtonBase className='ms-auto'><FaCheck /></ButtonBase>
                        </div>
                        <CalenderProvider>
                            <Calender variant='preview' />
                            <TabinationProvider defaultTab='Time'>
                                <TabButtons tabs={["Time", "Repeat"]} />
                                <TabinationItem tabId='Time'>
                                    <TimeSetting hour={hour} handleHourChange={handleHourChange} minute={minute} handleMinuteChange={handleMinuteChange} meridiem={meridiem} handleMeridiemChange={handleMeridiemChange} />
                                </TabinationItem>
                                <TabinationItem tabId='Repeat'>
                                    <RepeatSetting />
                                </TabinationItem>
                            </TabinationProvider>
                        </CalenderProvider>
                        <div className='flex justify-end gap-3 w-full'>
                            <TextButton onClick={close}>CANCEL</TextButton>
                            <TextButton>OK</TextButton>
                        </div>
                    </div>)
            }}
        </Popup >
    )
}

export default CustomizeAddModal

