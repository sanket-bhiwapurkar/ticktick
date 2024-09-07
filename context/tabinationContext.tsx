import React, { useContext, useState } from 'react';

interface TabinationContextTypes {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const TabinationContext = React.createContext<TabinationContextTypes | undefined>(undefined)

interface TabinationProviderProps {
    defaultTab: string
    children: React.ReactNode
}
export const TabinationProvider: React.FC<TabinationProviderProps> = ({ defaultTab, children }) => {
    const [activeTab, setActiveTab] = useState(defaultTab)
    return <TabinationContext.Provider value={{ activeTab, setActiveTab }} >
        {children}
    </TabinationContext.Provider>
}

export const useTabination = () => {
    const context = useContext(TabinationContext)
    if (!context) throw new Error("Use Tabination Error")
    return context
}