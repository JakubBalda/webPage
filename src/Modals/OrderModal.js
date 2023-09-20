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

    const [orderDataErrors, setOrderDataErrors] = useState({
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

    const validateOrderDataForm = () => {
        let isValid = true;
        const errors = {};

        if (orderData.name.trim() === "") {
            errors.name = "Imie jest wymagane.";
            isValid = false;
        }

        if(!validator.isAlpha(orderData.name.trim(), ['pl-PL'])){
            errors.name =  "Imie jest niepoprawne."
            isValid = false;
        }

        if(orderData.name.trim().length > 30){
            errors.name = "Imie jest za długie - max 30 znaków."
            isValid = false;
        }

        if (orderData.surname.trim() === "") {
            errors.surname = "Nazwisko jest wymagane.";
            isValid = false;
        }

        if(!validator.isAlpha(orderData.surname.trim(), ['pl-PL'])){
            errors.surname = "Nazwisko jest niepoprawne"
            isValid = false;
        }

        if(orderData.surname.trim().length > 30){
            errors.surname =  "Nazwisko jest za długie - max 30 znaków."
            isValid = false;
        }

        if (orderData.city.trim() === "") {
            errors.city = "Miejscowość jest wymagana.";
            isValid = false;
        }

        if(orderData.city.trim().length > 40){
            errors.city =  "Miejscowość jest za długa - max 40 znaków."
            isValid = false;
        }

        if(!validator.isAlpha(orderData.city.trim().split(" ").join(""), ['pl-PL'])){
            errors.city =  "Miejscowość jest niepoprawna."
            isValid = false;
        }

        if (orderData.street.trim() === "") {
            errors.street = "Ulica jest wymagana.";
            isValid = false;
        }

        if(orderData.street.trim().length > 40){
            errors.street =  "Ulica jest za długa - max 40 znaków."
            isValid = false;
        }

        if (orderData.houseNumber.trim() === "") {
            errors.houseNumber = "Nr domu jest wymagany.";
            isValid = false;
        }

        if (!validator.isAlphanumeric(orderData.houseNumber.trim())) {
            errors.houseNumber = "Nr domu jest niepopawny";
            isValid = false;
        }

        if(orderData.houseNumber.trim().length > 4){
            errors.houseNumber =  "Nr domu jest za długi - max 4 znaki."
            isValid = false;
        }

        if (!validator.isAlphanumeric(orderData.flatNumber.trim())) {
            errors.flatNumber = "Nr mieszkania jest niepopawny";
            isValid = false;
        }

        if(orderData.flatNumber.trim() === ""){
            errors.flatNumber = "";
            isValid = true;
        }

        if(orderData.flatNumber.trim().length > 3){
            errors.flatNumber =  "Nr domu jest za długi - max 3 znaki."
            isValid = false;
        }

        if(!validator.isPostalCode(orderData.postal.trim(), 'PL')){
            errors.postal = "Kod pocztowy jest niepoprawny.";
            isValid = false;
        }

        if (orderData.postal.trim() === "") {
            errors.postal = "Kod pocztowy jest wymagany.";
            isValid = false;
        }

        if(!validator.isEmail(orderData.mail.trim())){
            errors.mail = "E-mail jest niepoprawny.";
            isValid = false;
        }

        if (orderData.mail.trim() === "") {
            errors.mail = "E-mail jest wymagany.";
            isValid = false;
        }
        
        if (orderData.mail.trim().length > 50) {
            errors.phoneNumber = "E-mail jest zbyt długi - max 50 znaków.";
            isValid = false;
        }
        
        if(!validator.isNumeric(orderData.phoneNumber.trim())){
            errors.phoneNumber = "Nr telefonu jest niepoprawny.";
            isValid = false;
        }

        if (orderData.phoneNumber.trim() === "") {
            errors.phoneNumber = "Nr telefonu jest wymagany.";
            isValid = false;
        }

        if (orderData.phoneNumber.trim().length > 9) {
            errors.phoneNumber = "Nr telefonu jest zbyt długi - max 9 cyfr.";
            isValid = false;
        }

        if(orderData.deliveryOption === 'default' || orderData.deliveryOption === '') {
            errors.deliveryOption = "Wybierz opcje dostawy."
            isValid = false;
        }

        if(orderData.paymentOption === 'default' || orderData.paymentOption === '') {
            errors.paymentOption = "Wybierz opcje płatności."
            isValid = false;
        }

        setOrderDataErrors(errors);
        return isValid;
    };

    const handleOrderFormChange = (event) => {
        const {name, value} = event.target;

        console.log(name);
        setOrderData({
            ...orderData,
            [name]: value
        })

        setOrderDataErrors({
            ...orderDataErrors,
            [name]: ""
        });

        if(name === 'deliveryOption'){
            handleDeliveryOptionChange(value)
        }
    }

    const submitOrderData = () => {
        if(validateOrderDataForm()){
            console.log('Validated')
        }
    }

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
                phoneNumber: userData.data.PhoneNumber.substring(3),
                mail: userData.data.Mail,
            })
        }catch(err){
            console.log(err);
        }
    }

    const handleDeliveryOptionChange = (value) => {

        if(value === 'DHL' || value === 'DPD'){
            const paymentOptionSelect = document.getElementById('paymentOption');
            const pickupOption = paymentOptionSelect.querySelector('option[value="pickup"]');

            if (pickupOption) {
                pickupOption.disabled = true;
            }

            if(orderData.paymentOption === 'pickup'){
                paymentOptionSelect.querySelector('option[value="default"]').selected = true;

                setOrderData({
                    ...orderData,
                    paymentOption: ''
                })
            }
            
        } else {
            const paymentOptionSelect = document.getElementById('paymentOption');
            const pickupOption = paymentOptionSelect.querySelector('option[value="pickup"]');

            if (pickupOption) {
              pickupOption.disabled = false;
            }
          }
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
                                    <Input type="text" defaultValue={orderData.name} name="name" onChange={handleOrderFormChange}></Input>
                                    {orderDataErrors.name && <p className="error-message text-danger">{orderDataErrors.name}</p>}
                                </Col>
                                <Col>
                                    <label className="required">Nazwisko</label>
                                    <Input type="text" defaultValue={orderData.surname} name="surname"></Input>
                                    {orderDataErrors.surname && <p className="error-message text-danger">{orderDataErrors.surname}</p>}
                                </Col>
                                <Col>
                                    <label className="required">Miasto</label>
                                    <Input type="text" defaultValue={orderData.city} name="city"></Input>
                                    {orderDataErrors.city && <p className="error-message text-danger">{orderDataErrors.city}</p>}
                                </Col>
                            </FormRow>

                            <FormRow equalSpacing>
                                <Col>
                                    <label className="required">Ulica</label>
                                    <Input type="text" defaultValue={orderData.street} name="street"></Input>
                                    {orderDataErrors.street && <p className="error-message text-danger">{orderDataErrors.street}</p>}
                                </Col>
                                <Col>
                                    <label className="required">Nr domu</label>
                                    <Input type="text" defaultValue={orderData.houseNumber} name="houseNumber"></Input>
                                    {orderDataErrors.houseNumber && <p className="error-message text-danger">{orderDataErrors.houseNumber}</p>}
                                </Col>
                                <Col>
                                    <label>Nr mieszkania</label>
                                    <Input type="text" defaultValue={orderData.flatNumber} name="flatNumber"></Input>
                                    {orderDataErrors.flatNumber && <p className="error-message text-danger">{orderDataErrors.flatNumber}</p>}
                                </Col>
                            </FormRow>

                            <FormRow equalSpacing>
                                <Col>
                                    <label className="required">Kod pocztowy</label>
                                    <Input type="text" defaultValue={orderData.postal} name="postal"></Input>
                                    {orderDataErrors.postal && <p className="error-message text-danger">{orderDataErrors.postal}</p>}
                                </Col>
                                <Col>
                                    <label className="required">Nr telefonu</label>
                                    <Input type="text" defaultValue={orderData.phoneNumber} name="phoneNumber"></Input>
                                    {orderDataErrors.phoneNumber && <p className="error-message text-danger">{orderDataErrors.phoneNumber}</p>}
                                </Col>
                                <Col>
                                    <label className="required">E-mail</label>
                                    <Input type="text" defaultValue={orderData.mail} name="mail"></Input>
                                    {orderDataErrors.mail && <p className="error-message text-danger">{orderDataErrors.mail}</p>}
                                </Col>
                            </FormRow>
                        </Form>
                        <Form className="mt-15">
                            <FormRow equalSpacing>
                                <Col>
                                    <label>Dostawa</label>
                                    <select id="deliveryOption" className="form-control" name="deliveryOption" onChange={handleOrderFormChange}>
                                        <option disabled selected value="default"></option>
                                        <option value="DHL">Kurier DHL (+11,90 zł)</option>
                                        <option value="DPD">Kurier DPD (+11,90 zł)</option>
                                        <option value="personal">Odbiór osobisty</option>
                                    </select>
                                    {orderDataErrors.deliveryOption && <p className="error-message text-danger">{orderDataErrors.deliveryOption}</p>}
                                </Col>

                                <Col>
                                    <label>Płatność</label>
                                    <select id="paymentOption" className="form-control" name="paymentOption" onChange={handleOrderFormChange}>
                                        <option disabled selected value="default"></option>
                                        <option value="BLIK">BLIK</option>
                                        <option value="traditional">Przelew tradycyjny</option>
                                        <option value="pickup">Płatność przy odbiorze</option>
                                    </select>
                                    {orderDataErrors.paymentOption && <p className="error-message text-danger">{orderDataErrors.paymentOption}</p>}
                                </Col>
                            </FormRow>
                        </Form>
                        <div className="d-flex w-full justify-content-around">
                            <button className="btn btn-danger" onClick={handleFormClear}>Anuluj</button>
                            <button className="btn btn-primary" onClick={submitOrderData}>Zatwierdź</button>
                        </div>
                        
                </ModalContent>
            </ModalDialog>
        </Modal>
    )
}