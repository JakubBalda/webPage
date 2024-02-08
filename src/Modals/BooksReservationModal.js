import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalDialog, ModalTitle } from "reacthalfmoon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCheck} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function ContactModal({isBooksReservationModalOpen, setIsBooksReservationModalOpen, cookies, removeCart}){
    const [reservationData, setReservationData] = useState({
        userId: '',
        cart: [],
    });
    const navigate = useNavigate();

    const handleReservationSubmit = async () => {
        console.log(Date())
        try{
            await axios.post('http://localhost:5002/api/orders/storeNewReservation', reservationData)
                .then((response) => {
                    console.log(response.data);
                    if(response.data === true){
                        alert('Rezerwacja złożona, możesz sprawdzić ją na swoim profilu');
                        removeCart('cart', {path: '/'});
                        navigate('/');
                    }else{
                        alert('Wystąpił błąd, spróbuj ponownie za chwilę.');
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        setReservationData({
            userId: cookies.user?.id,
            cart: cookies.cart
        });
    }, []);

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
                                <button className="btn btn-success" onClick={handleReservationSubmit}>Zarezerwuj <FontAwesomeIcon icon={faCheck}/></button>
                            </div>
                        </div>
                    </ModalContent>
                </ModalDialog>
            </Modal>
        </div>
    )
}