import React from "react";
import { Modal, ModalContent, ModalDialog, ModalTitle } from "reacthalfmoon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCheck} from '@fortawesome/free-solid-svg-icons';

export default function ContactModal({isBooksReservationModalOpen, setIsBooksReservationModalOpen, cookies}){
    return(
        <div>
            <Modal isOpen={isBooksReservationModalOpen} toggle={()=>{setIsBooksReservationModalOpen(!isBooksReservationModalOpen)}}>
                <ModalDialog>
                    <ModalContent>
                        <ModalTitle>Zarezerwuj</ModalTitle>
                        <div>
                            <div>
                                Możesz zarezerwować wybrane książki dla siebie na okres <b>3 dni</b>.
                                W ciągu tych dni masz czas na złożenie zamówienia. 
                                Po upłynięciu czasu, Twoja rezerwacja zostanie anulowana automatycznie i książki wrócą na stan.
                                <p className="mt-10">Czy na pewno chcesz zarezerwować wybrane pozycje?</p>
                            </div>
                            <div className="d-flex justify-content-around mt-15">
                                <button className="btn btn-danger" onClick={() => setIsBooksReservationModalOpen(false)}> <FontAwesomeIcon icon={faCircleLeft}/> Wróć</button>
                                <button className="btn btn-success">Zarezerwuj <FontAwesomeIcon icon={faCheck}/></button>
                            </div>
                        </div>
                    </ModalContent>
                </ModalDialog>
            </Modal>
        </div>
    )
}