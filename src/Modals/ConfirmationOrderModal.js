import { useState, useEffect } from "react";
import { ModalContent, ModalDialog, ModalTitle, Modal, Form, Input, FormRow, Col } from "reacthalfmoon";
import 'halfmoon/css/halfmoon.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function ConfirmationOrderModal({isOrderConfirmationModalOpen, setIsOrderConfirmationModalOpen, handleModalSwitchToOrder, orderData, setOrderData, cookies, removeCart}){
    const navigate = useNavigate();
    
    const submitOrder = () => {
        axios.post('http://localhost:5002/api/orders/storeNewOrder', [cookies.user.id, orderData, cookies.cart])
            .then((response) => {
                if(response.data){
                    alert("Zamówienie złożone, sprawdź je na swoim profilu.");
                    removeCart("cart", {path: "/"});
                    navigate('/');
                }
                else
                    alert("Wystąpił błąd, spróbuj ponownie za chwile.")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return(
        <Modal full isOpen={isOrderConfirmationModalOpen} toggle={()=>{setIsOrderConfirmationModalOpen(!isOrderConfirmationModalOpen)}}>
            <ModalDialog>
                <ModalContent className="h-full">
                    <ModalTitle>Potwierdź zamówienie</ModalTitle>
                        <span>Sprawdź poprawność danych i złóż zamówienie</span>

                        <div className="d-flex justify-content-around mt-20 font-size-14">
                            <div>
                                <h1>Dane klienta</h1>
                                <p><b>Imie:</b> {orderData.name}</p>
                                <p><b>Nazwisko:</b> {orderData.surname}</p>
                                <p><b>Miasto:</b> {orderData.city}</p>
                                <p><b>Ulica:</b> {orderData.street}</p>
                                <p><b>Nr domu:</b> {orderData.houseNumber}</p>
                                <p><b>Nr mieszkania:</b> {orderData.flatNumber}</p>
                                <p><b>Kod pocztowy:</b> {orderData.postal}</p>
                                <p><b>Mail:</b> {orderData.mail}</p>
                                <p><b>Nu telefonu: </b> {orderData.phoneNumber}</p>
                                <p><b>Opcja dostawy: </b> 
                                    {
                                        orderData.deliveryOption === 'DHL'
                                        ?
                                            ("Kurier DHL (+ 11,90 zł)")
                                        :
                                            <span>
                                                {
                                                    orderData.deliveryOption === "DPD"
                                                    ?
                                                        ("Kurier DPD (+ 11,90 zł)")
                                                    :
                                                        ("Odbiór osobisty")
                                                }
                                            </span>
                                    }
                                </p>
                                <p><b>Opcja płatności: </b>
                                {
                                        orderData.paymentOption === 'BLIK'
                                        ?
                                            ("BLIK")
                                        :
                                            <span>
                                                {
                                                    orderData.paymentOption === "traditional"
                                                    ?
                                                        ("Przelew tradycyjny")
                                                    :
                                                        ("Płatność przy odbiorze")
                                                }
                                            </span>
                                    }
                                </p>
                                
                            </div>
                            <div>
                                <h1>Zamówienie</h1>
                                {
                                    cookies.cart !== undefined
                                    ?
                                    (
                                        <div>
                                        {cookies.cart.map((book, key) => {
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
                        <div className="d-flex justify-content-between mt-20 pt-10">
                            <button className="btn btn-primary" onClick={()=>{handleModalSwitchToOrder()}}> <FontAwesomeIcon icon={faCircleLeft} /> Wróć</button>
                            <div>
                                <span className="mr-20 font-size-14"><b>Cena:</b> {orderData.fullOrderPrice} zł</span>
                                <button className="btn btn-success" onClick={submitOrder}> <FontAwesomeIcon icon={faCheck} /> Zamów</button>
                            </div>
                            
                        </div>
                </ModalContent>
            </ModalDialog>
        </Modal>
    )
}