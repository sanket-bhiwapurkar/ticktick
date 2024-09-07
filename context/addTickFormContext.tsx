'use client'
import React, { useContext, useState } from 'react'

interface RepeatCustomSetting {
    enableStartDate: boolean;
    startDate: string | number | readonly string[] | undefined;
    enableEndDate: boolean;
    endDate: string | number | readonly string[] | undefined;
    everyXValue: number;
    everyXType: string;
    skipWeekends: boolean;
    weeklyOn: string[];
    monthlyOn: number[];
    yearlyOnMonthOf: string;
    yearlyOnXthWeek: string;
    yearlyOnWeekday: string;
}

interface FormData {
    tick: string;
    hour: number;
    minute: number;
    meridiem: string;
    repeatType: string;
    repeatCustomSetting: RepeatCustomSetting;
}

interface AddTickFormContextTypes {
    formData: FormData;
    setformData: React.Dispatch<React.SetStateAction<FormData>>;
}

const AddTickFormContext = React.createContext<AddTickFormContextTypes | undefined>(undefined)

interface addTickFormProviderProps {
    children: React.ReactNode;
}

export const AddTickFormProvider: React.FC<addTickFormProviderProps> = ({ children }) => {
    const [formData, setformData] = useState<FormData>({
        tick: "",
        hour: 12,
        minute: 0,
        meridiem: "AM",
        repeatType: "None",
        repeatCustomSetting: {
            enableStartDate: false,
            startDate: "",
            enableEndDate: false,
            endDate: "",
            everyXValue: 1,
            everyXType: "Day",
            skipWeekends: false,
            weeklyOn: [],
            monthlyOn: [],
            yearlyOnMonthOf: "January",
            yearlyOnXthWeek: "First",
            yearlyOnWeekday: "Sunday"
        }
    })
    return <AddTickFormContext.Provider value={{ formData, setformData }}>
        {children}
    </AddTickFormContext.Provider>
}

export const useAddTickForm = () => {
    const context = useContext(AddTickFormContext)
    if (!context) throw new Error("Error in useAddTickForm")
    return context
}