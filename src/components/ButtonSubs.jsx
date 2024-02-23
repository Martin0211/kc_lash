'use client'
import { useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io';
import Modal from "./ModalSubscribe"

export default function ButtonSubscribe({ isVisible }) {
    const [showModal, setShowModal] = useState(false);

    

    return (
    <>
        <Modal isVisible = {showModal} onClose={() => setShowModal(false)}/>
        <button className='flex items-center bg-slate-200 text-black rounded-full h-8 px-3 text-sm space-x-1' onClick={() => setShowModal(true)}>
            <IoMdNotificationsOutline /> 
            <span>subscribe</span>
        </button>
    </>
    )

}