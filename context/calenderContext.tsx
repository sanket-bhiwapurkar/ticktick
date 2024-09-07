import React, { Dispatch, SetStateAction, useContext, useState } from 'react'

interface CalenderContextProps {
    today: Date;
    setToday: Dispatch<SetStateAction<Date>>;
    selectedDate: Date;
    setSelectedDate: Dispatch<SetStateAction<Date>>;
}

const CalenderContext = React.createContext<CalenderContextProps | undefined>(undefined)

interface CalenderProviderProps {
    children: React.ReactNode
}

export const CalenderProvider: React.FC<CalenderProviderProps> = ({ children }) => {
    const [today, setToday] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())
    return <CalenderContext.Provider value={{ today, setToday, selectedDate, setSelectedDate }}>
        {children}
    </CalenderContext.Provider>
}

export const useCalender = () => {
    const context = useContext(CalenderContext)
    if (!context) throw new Error("Use Calender Error")
    return context
}