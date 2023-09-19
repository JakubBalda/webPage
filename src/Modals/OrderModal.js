import axios from "axios";
import { Button, ModalContent, ModalDialog, ModalTitle, Modal, Form, Input, FormRow, Col, TextArea  } from "reacthalfmoon";
import validator from 'validator';
import { useState, useEffect } from "react";

export default function OrderModal({isOrderModalOpen, setIsOrderModalOpen, cookies}){
    const [orderData, setOrderData] = useState({
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
        paymentOption: ''
    })

    const handleUserDataLoad = async () => {
        try{
            const userData = await axios.get(`http://localhost:5001/api/users/orderData/${cookies.user.id}`);
            console.log(userData.data);

            setOrderData({
                ...orderData,
                name: userData.data.Name,
                surname: userData.data.Surname,
                street: userData.data.Street,
                city: userData.data.City,
                postal: userData.data.Postal,
                houseNumber: userData.data.HouseNumber,
                flatNumber: userData.data.FlatNumber,
                phoneNumber: userData.data.PhoneNumber,
                mail: userData.data.Mail,
            })
        }catch(err){
            console.log(err);
        }
    }

    const handleDeliveryOptionChange = (event) => {
        const { name, value } = event.target;

        setOrderData({
            ...orderData,
            [name]: value
        })

        if(value === 'DHL' || value === 'DPD'){
            const paymentOptionSelect = document.getElementById('paymentOption');
            const pickupOption = paymentOptionSelect.querySelector('option[value="pickup"]');

            if (pickupOption) {
                pickupOption.disabled = true;
            }

            if(orderData.paymentOption === 'pickup'){
                paymentOptionSelect.querySelector('option[value="default"]').selected = true;
                orderData.paymentOption = '';
            }
            
        } else {
            const paymentOptionSelect = document.getElementById('paymentOption');
            const pickupOption = paymentOptionSelect.querySelector('option[value="pickup"]');

            if (pickupOption) {
              pickupOption.disabled = false;
            }
          }
    }

    const handlePaymentOptionChange = (event) => {
        const { name, value } = event.target;

        setOrderData({
            ...orderData,
            [name]: value
        })
    }

    const handleFormClear = () => {
        setOrderData({
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
            paymentOption: ''
        })

        document.getElementById('paymentOption').querySelector('option[value="default"]').selected = true;
        document.getElementById('deliveryOption').querySelector('option[value="default"]').selected = true;
        setIsOrderModalOpen(false);
    }

    useEffect(() => {
        console.log(orderData)
    },[orderData])

    return(
        <Modal isOpen={isOrderModalOpen} toggle={()=>{setIsOrderModalOpen(!isOrderModalOpen)}}>
            <ModalDialog>
                <ModalContent className="w-half">
                    <ModalTitle>Dane do zamówienia</ModalTitle>
                        <span>Podaj dane do zamówienia lub <a className="text-decoration-underline cursor-pointer" onClick={handleUserDataLoad}>załaduj</a> dane z konta</span>
                        <Form className="mt-15 border-bottom">
                            <FormRow equalSpacing>
                                <Col>
                                    <label className="required">Imie</label>
                                    <Input></Input>
                                </Col>
                                <Col>
                                    <label className="required">Nazwisko</label>
                                    <Input></Input>
                                </Col>
                                <Col>
                                    <label className="required">Miasto</label>
                                    <Input></Input>
                                </Col>
                            </FormRow>

                            <FormRow equalSpacing>
                                <Col>
                                    <label className="required">Ulica</label>
                                    <Input></Input>
                                </Col>
                                <Col>
                                    <label className="required">Nr domu</label>
                                    <Input></Input>
                                </Col>
                                <Col>
                                    <label>Nr mieszkania</label>
                                    <Input></Input>
                                </Col>
                            </FormRow>

                            <FormRow equalSpacing>
                                <Col>
                                    <label className="required">Kod pocztowy</label>
                                    <Input></Input>
                                </Col>
                                <Col>
                                    <label className="required">Nr telefonu</label>
                                    <Input></Input>
                                </Col>
                                <Col>
                                    <label className="required">E-mail</label>
                                    <Input></Input>
                                </Col>
                            </FormRow>
                        </Form>
                        <Form className="mt-15">
                            <FormRow equalSpacing>
                                <Col>
                                    <label>Dostawa</label>
                                    <select id="deliveryOption" className="form-control" name="deliveryOption" onChange={handleDeliveryOptionChange}>
                                        <option disabled selected value="default"></option>
                                        <option value="DHL">Kurier DHL</option>
                                        <option value="DPD">Kurier DPD</option>
                                        <option value="personal">Odbiór osobisty</option>
                                    </select>
                                </Col>

                                <Col>
                                    <label>Płatność</label>
                                    <select id="paymentOption" className="form-control" name="paymentOption" onChange={handlePaymentOptionChange}>
                                        <option disabled selected value="default"></option>
                                        <option value="BLIK">BLIK</option>
                                        <option value="traditional">Przelew tradycyjny</option>
                                        <option value="pickup">Płatność przy odbiorze</option>
                                    </select>
                                </Col>
                            </FormRow>
                        </Form>
                        <div className="d-flex w-full justify-content-around">
                            <button className="btn btn-danger" onClick={handleFormClear}>Anuluj</button>
                            <button className="btn btn-primary">Zatwierdź</button>
                        </div>
                        
                </ModalContent>
            </ModalDialog>
        </Modal>
    )
}