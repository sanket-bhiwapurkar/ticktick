import React, { useEffect, useRef } from 'react'

interface WheelPickerProps {
    options: string[] | number[];
    exportChange: (x: number | string | any) => void
}

const WheelPicker: React.FC<WheelPickerProps> = ({ options, exportChange }) => {
    const pickerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const picker = pickerRef.current
        if (!picker) return
        const handleScroll = () => {
            const scrollYPos = picker.scrollTop
            const index = Math.floor(scrollYPos / 32)
            exportChange(options[index])
        }
        picker.addEventListener('scroll', handleScroll)
        return () => picker.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <div ref={pickerRef} className='h-40 overflow-y-auto snap-y snap-mandatory hide-scrollbar relative'>
            <div className='sticky z-10 h-16 w-full top-0 bg-white opacity-70'></div>
            {options.map((option, i) => <div key={i} className='flex items-center justify-center snap-center h-8 min-w-11 option'>
                {option}
            </div>)}
            <div className='sticky z-10 h-16 w-full bottom-0 bg-white opacity-70'></div>
        </div>
    )
}

export default WheelPicker
