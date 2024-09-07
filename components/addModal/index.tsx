'use client'
import React from 'react'
import { FaPaperPlane, FaPlus, FaRegFontAwesome } from "react-icons/fa6";
import Popup from "reactjs-popup";
import CustomizeAddModal from '../customizeAddModal.tsx';
import { IconButton } from '../button/index';
import { useAddTickForm } from 'context/addTickFormContext';

const AddModal = () => {
    const { formData, setformData } = useAddTickForm()
    const handleOnTickChange = (e: React.ChangeEvent<HTMLInputElement>) => setformData(prev => ({ ...prev, tick: e.target.value }))
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
    }
    return (
        <Popup trigger={<button type="button" className="fixed bottom-0 right-0 me-3 mb-3 flex items-center justify-center bg-violet-600 text-white text-3xl w-10 h-10 rounded-full shadow"><FaPlus /></button>
        } modal nested >
            {function (close) {
                return (
                    <form onSubmit={(e) => handleSubmit(e)} className="p-2 rounded-lg bg-violet-50 shadow-lg !w-full">
                        <input type="text" className="outline-none bg-transparent mb-4 text w-full" placeholder="What would you like to do?" value={formData.tick} onChange={(e) => handleOnTickChange(e)} />
                        <div className="flex items-center gap-3 text-sm">
                            <CustomizeAddModal />
                            <button type="button">
                                <FaRegFontAwesome />
                            </button>
                            <IconButton icon={<FaPaperPlane />} type='submit'></IconButton>
                        </div>
                    </form>)
            }}
        </Popup>
    )
}

export default AddModal
