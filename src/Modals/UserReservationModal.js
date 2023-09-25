import { ModalContent, ModalDialog, ModalTitle, Modal } from "reacthalfmoon";
import 'halfmoon/css/halfmoon.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function UserReservationModal({isUserReservationModalOpen, setIsUserReservationModalOpen, userReservationDetails}){
    return(
        <div>
            <Modal isOpen={isUserReservationModalOpen} toggle={()=>{setIsUserReservationModalOpen(!isUserReservationModalOpen)}}>
                <ModalDialog>
                    <ModalContent className="w-three-quarter h-three-quarter d-flex flex-column justify-content-between">
                        <div>
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
                            <div className="d-flex justify-content-around mt-20 font-size-12">
                                    <div>
                                        <h2 className="mb-20">Dane rezerwacji</h2>
                                        <p><b>Data rezerwacji:</b> {userReservationDetails.reservationDate}</p>
                                        <p><b>Data wygaśnięcia:</b> {userReservationDetails.expirationDate}</p>
                                    </div>
                                    <div>
                                        <h2>Zarezerwowane książki</h2>
                                        {
                                        userReservationDetails.cart !== undefined
                                        ?
                                        (
                                            <div>
                                            {userReservationDetails.cart.map((book, key) => {
                                                return(
                                                    <p><b>Tytuł:</b> "{book.title}" (x{book.amount})</p>
                                                )
                                            })}
                                            </div>
                                        )
                                        :
                                        (<div></div>)
                                    }
                                    </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around bottom-0">
                            <button className="btn btn-primary" onClick={() => setIsUserReservationModalOpen(false)}><FontAwesomeIcon icon={faCircleLeft} /> Wróć</button>
                            <button className="btn btn-danger">Anuluj <FontAwesomeIcon icon={faXmark} /></button>
                            <button className="btn btn-success">Zamów <FontAwesomeIcon icon={faCheck} /></button>
                        </div>
                    </ModalContent>
                </ModalDialog>
            </Modal>
        </div>
    )
}