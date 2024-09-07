import { useTabination } from 'context/tabinationContext';
import React, { ReactNode, useContext, useState } from 'react';

interface TabinationProps {
    tabs: string[];
}

export const TabButtons: React.FC<TabinationProps> = ({ tabs }) => {
    const { activeTab, setActiveTab } = useTabination()

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className='flex items-center gap-3'>
            {tabs.map(eachTab => {
                const isActive = eachTab === activeTab;
                const textClass = isActive ? "text-violet-600" : "text-gray-400";
                const underlineClass = isActive ? "bg-violet-600" : "bg-transparent";
                return (
                    <button
                        type='button'
                        key={eachTab}
                        onClick={() => handleTabClick(eachTab)}
                        className="flex flex-col items-center"
                    >
                        <p className={textClass}>{eachTab}</p>
                        <div className={`w-full h-1 rounded-full ${underlineClass}`}></div>
                    </button>
                );
            })}
        </div>
    );
};

interface TabinationItemProps {
    tabId: string;
    children: React.ReactNode;
}

export const TabinationItem: React.FC<TabinationItemProps> = ({ tabId, children }) => {
    const { activeTab } = useTabination()
    return activeTab === tabId ? <>{children}</> : null;
};

