import React from "react";
import { Modal, ModalContent, ModalDialog, ModalTitle } from "reacthalfmoon";

export default function ContactModal({isContactModalOpen, setIsContactModalOpen}){
    return(
        <div>
            <Modal isOpen={isContactModalOpen} toggle={()=>{setIsContactModalOpen(!isContactModalOpen)}}>
            <ModalDialog>
                <ModalContent>
                    <ModalTitle>Kontakt</ModalTitle>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-6 text-left">
                                <p><b>Telefon: </b>+48 665 048 559</p>
                                <p><b>E-mail: </b>balda.jakub@gmail.com</p>
                            </div>
                            <div className="col-6">
                                <p><b>Miasto: </b>Piekary Śląskie</p>
                                <p><b>Adres: </b>Wyszyńskiego 54</p>
                                <p><b>Kod pocztowy: </b>41-940</p>
                            </div>
                        </div>
                    </div>
                    <ModalTitle className="mt-15">Godziny otwarcia</ModalTitle>
                    <p>Pn-Pt: 9:00 - 19:00</p>
                    <p>Weekend: 10:00 - 18:00</p>
                </ModalContent>
            </ModalDialog>
        </Modal>
        </div>
    )
}