import { ModalContent, ModalDialog, ModalTitle, Modal } from "reacthalfmoon";
import 'halfmoon/css/halfmoon.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function UserReservationModal({isUserReservationModalOpen, setIsUserReservationModalOpen, userReservationDetails, handleModalSwitchToOrder}){

    const cancelReservation = () => {
        if(window.confirm("Czy na pewno chcesz anulować rezerwacje?") === true){
            axios.put('http://localhost:5002/api/orders/cancelReservation', {reservationId: userReservationDetails.reservationId, status: 'Anulowana', cart: userReservationDetails.cart})
                .then((response) => {
                    console.log(response.data)
                    if(response.data == true){
                        alert("Rezerwacja została anulowana.");
                        window.location.reload();
                    }else{
                        alert('Wystąpił błąd, spróbuj ponownie za chwilę.');
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

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
                            <button className="btn btn-primary mr-20" onClick={() => setIsUserReservationModalOpen(false)}><FontAwesomeIcon icon={faCircleLeft} /> Wróć</button>
                            {
                                userReservationDetails.status === 'Oczekująca'
                                ?
                                (<div className="d-flex justify-content-between w-half ml-20">
                                    <button className="btn btn-danger" onClick={cancelReservation}>Anuluj <FontAwesomeIcon icon={faXmark} /></button>
                                    <button className="btn btn-success" onClick={handleModalSwitchToOrder}>Zamów <FontAwesomeIcon icon={faCheck} /></button>
                                </div>)
                                :
                                (<div className="d-flex justify-content-between w-half">
                                    <button className="btn btn-danger" disabled>Anuluj <FontAwesomeIcon icon={faXmark} /></button>
                                    <button className="btn btn-success" disabled>Zamów <FontAwesomeIcon icon={faCheck} /></button>
                                </div>)
                            }
                        </div>
                    </ModalContent>
                </ModalDialog>
            </Modal>
        </div>
    )
}