import { ModalContent, ModalDialog, ModalTitle, Modal } from "reacthalfmoon";
import 'halfmoon/css/halfmoon.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';

export default function UserOrderModal({isUserOrderModalOpen, setIsUserOrderModalOpen, userOrderData, setUserOrderData}){
    const turnOffModal = () => {
        setUserOrderData({
            orderId: Number,
            name: '',
            surname: '',
            city: '',
            street: '',
            houseNumber: '',
            flatNumber: '',
            postal: '',
            mail: '',
            phoneNumber: '',
            deliveryOption: '',
            paymentOption: '',
            fullOrderPrice: '',
            cart: [],
            status: '',
            orderDate: ''
        })
        setIsUserOrderModalOpen(false)
    };

    return(
       <Modal isOpen={isUserOrderModalOpen} toggle={()=>{setIsUserOrderModalOpen(!isUserOrderModalOpen)}}>
            <ModalDialog>
                <ModalContent className="w-three-quarter d-flex flex-column justify-content-between">
                    <div>
                        <ModalTitle className="d-flex justify-content-around mb-10">
                            <div>
                                Zamówienie nr: {userOrderData.orderId}
                            </div>
                            <div>
                                {(() => {
                                    console.log(userOrderData.status)
                                    switch (userOrderData.status) {
                                    case 'Nie opłacone':
                                        return <div>Status: <span className="text-danger">{userOrderData.status}</span></div>;
                                    case 'Opłacone':
                                    case 'Wysłane':
                                    case 'Przygotowane do odbioru':
                                        return <div>Status: <span className="text-secondary">{userOrderData.status}</span></div>;
                                    case 'Zakończone':
                                        return <div>Status: <span className="text-success">{userOrderData.status}</span></div>;
                                    default:
                                        return <div></div>;
                                    }
                                })()}
                            </div>
                            <div>
                                Data: {userOrderData.orderDate}
                            </div>

                        </ModalTitle>
                        <div className="d-flex justify-content-around mt-20 font-size-12">
                                <div>
                                    <h1>Dane klienta</h1>
                                    <p><b>Imie:</b> {userOrderData.name}</p>
                                    <p><b>Nazwisko:</b> {userOrderData.surname}</p>
                                    <p><b>Miasto:</b> {userOrderData.city}</p>
                                    <p><b>Ulica:</b> {userOrderData.street}</p>
                                    <p><b>Nr domu:</b> {userOrderData.houseNumber}</p>
                                    <p><b>Nr mieszkania:</b> {userOrderData.flatNumber}</p>
                                    <p><b>Kod pocztowy:</b> {userOrderData.postal}</p>
                                    <p><b>Mail:</b> {userOrderData.mail}</p>
                                    <p><b>Nu telefonu: </b> {userOrderData.phoneNumber}</p>
                                    <p><b>Opcja dostawy: </b>{userOrderData.deliveryOption}</p>
                                    <p><b>Opcja płatności: </b>{userOrderData.paymentOption}</p>
                                    
                                </div>
                                <div>
                                    <h1>Zamówienie</h1>
                                    {
                                        userOrderData.cart !== undefined
                                        ?
                                        (
                                            <div>
                                            {userOrderData.cart.map((book, key) => {
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

                        <div className="d-flex justify-content-around">
                            <button className="btn btn-danger mt-20" onClick={() => turnOffModal()}><FontAwesomeIcon icon={faCircleLeft}/>Wróć</button>
                            <div className="mt-20 font-size-14"><b>Cena:</b> {userOrderData.fullOrderPrice} zł</div>
                        </div>
                </ModalContent>
            </ModalDialog>
       </Modal>
    )
}