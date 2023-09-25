import { ModalContent, ModalDialog, ModalTitle, Modal } from "reacthalfmoon";
import 'halfmoon/css/halfmoon.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';

export default function UserReservationModal({isUserReservationModalOpen, setIsUserReservationModalOpen, userReservationDetails}){
    return(
        <div>
            <Modal isOpen={isUserReservationModalOpen} toggle={()=>{setIsUserReservationModalOpen(!isUserReservationModalOpen)}}>
                <ModalDialog>
                    <ModalContent className="w-three-quarter">
                        <ModalTitle className="d-flex justify-content-around mb-10">
                            <div>
                                Rezerwacja nr: {userReservationDetails.reservationId}
                            </div>
                            <div>
                                {(() => {
                                    console.log(userReservationDetails.status)
                                    switch (userReservationDetails.status) {
                                    case 'Anulowana':
                                        return <div>Status: <span className="text-danger">{userReservationDetails.status}</span></div>;
                                    case 'Oczekująca':
                                        return (<div>Status: <span className="text-secondary">{userReservationDetails.status}</span></div>);
                                    case 'Zakończona':
                                        return (<div>Status: <span className="text-success">{userReservationDetails.status}</span></div>);
                                    default:
                                        return <div></div>;
                                    }
                                })()}
                            </div>
                        </ModalTitle>
                    </ModalContent>
                </ModalDialog>
            </Modal>
        </div>
    )
}