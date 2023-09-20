import { useState, useEffect } from "react";
import { ModalContent, ModalDialog, ModalTitle, Modal, Form, Input, FormRow, Col } from "reacthalfmoon";
import 'halfmoon/css/halfmoon.min.css';

export default function ConfirmationOrderModal({isOrderConfirmationModalOpen, setIsOrderConfirmationModalOpen, handleModalSwitchToOrder, orderData, setOrderData, cookies}){

    return(
        <Modal full isOpen={isOrderConfirmationModalOpen} toggle={()=>{setIsOrderConfirmationModalOpen(!isOrderConfirmationModalOpen)}}>
            <ModalDialog >
                <ModalContent className="h-full">
                    <ModalTitle>Dane do zamównienia</ModalTitle>
                        <button className="btn btn-primary" onClick={()=>{handleModalSwitchToOrder()}}>Wróć</button>

                </ModalContent>
            </ModalDialog>
        </Modal>
    )
}