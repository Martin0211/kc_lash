'use client'
import { useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io';
import Modal from "./ModalSubscribe.jsx"

export default function ButtonSubscribe({ label, className }) {
    const [showModal, setShowModal] = useState(false);

    

    return (
    <>
        <Modal isVisible = {showModal} onClose={() => setShowModal(false)}/>
        <button className={`flex items-center ${className}`} onClick={() => setShowModal(true)}>
            <IoMdNotificationsOutline /> 
            <span>{ label }</span>
        </button>
    </>
    )

}