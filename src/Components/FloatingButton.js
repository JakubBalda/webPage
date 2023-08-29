import React from 'react';
import 'halfmoon/css/halfmoon.min.css';
import { FaPhoneAlt } from "react-icons/fa";


export default function FloatingButton({setIsContactModalOpen, isContactModalOpen}){
    
    return(
        <div>
            <div style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: '1000' }}>
                <button className="btn btn-primary btn-floating" onClick={() => {setIsContactModalOpen(!isContactModalOpen)}}>
                    <FaPhoneAlt />
                </button>
            </div>
        </div>
    )
}