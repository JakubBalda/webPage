import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, ModalContent, ModalDialog, ModalTitle, Modal, Form, Input, FormRow, Col } from "reacthalfmoon";
import validator from 'validator';

export default function EditUserDataModal({isEditUserDataModalOpen, setIsEditUserDataModalOpen, userProfileData}){
    const [userData, setUserData] = useState({
        login: '',
        name: '',
        surname: '',
        city: '',
        street: '',
        houseNumber: '',
        flatNumber: '',
        postal: '',
        mail: '',
        phoneNumber: ''
    });

    const [userDataFormErrors, setUserDataFormErrors] = useState({
        login: '',
        password: '',
        name: '',
        surname: '',
        city: '',
        street: '',
        houseNumber: '',
        flatNumber: '',
        postal: '',
        mail: '',
        phoneNumber: ''
    });

    useEffect(() => {
        if(userProfileData.length === undefined){
            console.log(userProfileData);
            setUserData({
                login: userProfileData.login,
                name: userProfileData.name,
                surname: userProfileData.surname,
                city: userProfileData.city,
                street: userProfileData.street,
                houseNumber: userProfileData.houseNumber,
                flatNumber: userProfileData.flatNumber,
                postal: userProfileData.postalCode,
                mail: userProfileData.mail,
                phoneNumber: userProfileData.phoneNumber.substring(3)
            });
        }

    }, [userProfileData]);

    const validateEditUserDataForm = () => {
        let isValid = true;
        const errors = {};

        console.log(userData);

        if (userData.login.trim() === "") {
            errors.login = "Login jest wymagany.";
            isValid = false;
        }

        if(userData.login.trim().length > 30){
            errors.login = "Login jest za długi - max 30 znaków."
            isValid = false;
        }

        if (userData.name.trim() === "") {
            errors.name = "Imie jest wymagane.";
            isValid = false;
        }

        if(!validator.isAlpha(userData.name.trim())){
            errors.name =  "Imie jest niepoprawne."
            isValid = false;
        }

        if(userData.name.trim().length > 30){
            errors.name = "Imie jest za długie - max 30 znaków."
            isValid = false;
        }

        if (userData.surname.trim() === "") {
            errors.surname = "Nazwisko jest wymagane.";
            isValid = false;
        }

        if(userData.surname.trim().length > 30){
            errors.surname =  "Nazwisko jest za długie - max 30 znaków."
            isValid = false;
        }

        if (userData.city.trim() === "") {
            errors.city = "Miejscowość jest wymagana.";
            isValid = false;
        }

        if(userData.city.trim().length > 40){
            errors.city =  "Miejscowość jest za długa - max 40 znaków."
            isValid = false;
        }

        if(!validator.isAlpha(userData.city.trim().split(" ").join(""), ['pl-PL'])){
            errors.city =  "Miejscowość jest niepoprawna."
            isValid = false;
        }

        if (userData.street.trim() === "") {
            errors.street = "Ulica jest wymagana.";
            isValid = false;
        }

        if(userData.street.trim().length > 40){
            errors.street =  "Ulica jest za długa - max 40 znaków."
            isValid = false;
        }

        if (userData.houseNumber.trim() === "") {
            errors.houseNumber = "Nr domu jest wymagany.";
            isValid = false;
        }

        if (!validator.isAlphanumeric(userData.houseNumber.trim())) {
            errors.houseNumber = "Nr domu jest niepopawny";
            isValid = false;
        }

        if(userData.houseNumber.trim().length > 4){
            errors.houseNumber =  "Nr domu jest za długi - max 4 znaki."
            isValid = false;
        }

        if (!validator.isAlphanumeric(userData.flatNumber.trim())) {
            errors.flatNumber = "Nr mieszkania jest niepopawny";
            isValid = false;
        }

        if(userData.flatNumber.trim() === ""){
            errors.flatNumber = "";
            isValid = true;
        }

        if(userData.flatNumber.trim().length > 3){
            errors.flatNumber =  "Nr domu jest za długi - max 3 znaki."
            isValid = false;
        }

        if(!validator.isPostalCode(userData.postal.trim(), 'PL')){
            errors.postal = "Kod pocztowy jest niepoprawny.";
            isValid = false;
        }

        if (userData.postal.trim() === "") {
            errors.postal = "Kod pocztowy jest wymagany.";
            isValid = false;
        }

        if(!validator.isEmail(userData.mail.trim())){
            errors.mail = "E-mail jest niepoprawny.";
            isValid = false;
        }

        if (userData.mail.trim() === "") {
            errors.mail = "E-mail jest wymagany.";
            isValid = false;
        }
        
        if (userData.mail.trim().length > 50) {
            errors.phoneNumber = "E-mail jest zbyt długi - max 50 znaków.";
            isValid = false;
        }
        
        if(!validator.isNumeric(userData.phoneNumber.trim())){
            errors.phoneNumber = "Nr telefonu jest niepoprawny.";
            isValid = false;
        }

        if (userData.phoneNumber.trim() === "") {
            errors.phoneNumber = "Nr telefonu jest wymagany.";
            isValid = false;
        }

        if (userData.phoneNumber.trim().length > 9) {
            errors.phoneNumber = "Nr telefonu jest zbyt długi - max 9 cyfr.";
            isValid = false;
        }

        setUserDataFormErrors(errors);
        return isValid;
    };

    const handleEditUserDataInputChange = (e) => {
        const { name, value } = e.target;
        console.log(value);
        setUserData({
            ...userData,
            [name]: value
        });

        setUserDataFormErrors({
            ...userDataFormErrors,
            [name]: ""
        });
        
    }

    const handleEditUserDataSubmit = (e) => {
        e.preventDefault();

        if(validateEditUserDataForm()){
            console.log("Validation correct")
        }
    }

    const handleFormReset = () => {
        console.log(userProfileData);

        setUserData({
            login: userProfileData.login,
            name: userProfileData.name,
            surname: userProfileData.surname,
            city: userProfileData.city,
            street: userProfileData.street,
            houseNumber: userProfileData.houseNumber,
            flatNumber: userProfileData.flatNumber,
            postal: userProfileData.postalCode,
            mail: userProfileData.mail,
            phoneNumber: userProfileData.phoneNumber
        });
    }

    return (
        <Modal isOpen={isEditUserDataModalOpen} toggle={()=>{setIsEditUserDataModalOpen(!isEditUserDataModalOpen)}}>
        <ModalDialog>
            <ModalContent className="w-half">
                <ModalTitle>Edytuj dane</ModalTitle>
                <Form>
                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Login</label>
                            <Input type="text" placeholder="Login" name="login" value={userData.login} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.login && <p className="error-message text-danger">{userDataFormErrors.login}</p>}
                        </Col>
                        <Col>
                            <label className="required">E-mail</label>
                            <Input type="text" placeholder="xyz@gmail.com" name="mail" value={userData.mail} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.mail && <p className="error-message text-danger">{userDataFormErrors.mail}</p>}
                        </Col>
                    </FormRow>
                    
                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Imie</label>
                            <Input type="text" placeholder="Imie" name="name" value={userData.name} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.name && <p className="error-message text-danger">{userDataFormErrors.name}</p>}
                        </Col>
                        <Col>
                            <label className="required">Nazwisko</label>
                            <Input type="text" placeholder="Nazwisko" name="surname" value={userData.surname} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.surname && <p className="error-message text-danger">{userDataFormErrors.surname}</p>}
                        </Col>
                        <Col>
                            <label className="required">Miejscowość</label>
                            <Input type="text" placeholder="Miejscowość" name="city" value={userData.city} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.city && <p className="error-message text-danger">{userDataFormErrors.city}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Ulica</label>
                            <Input type="text" placeholder="Ulica" name="street" value={userData.street} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.street && <p className="error-message text-danger">{userDataFormErrors.street}</p>}
                        </Col>
                        <Col>
                            <label className="required">Nr domu</label>
                            <Input type="text" placeholder="Nr domu" maxLength="4" name="houseNumber" value={userData.houseNumber} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.houseNumber && <p className="error-message text-danger">{userDataFormErrors.houseNumber}</p>}
                        </Col>
                        <Col>
                            <label>Nr mieszkania</label>
                            <Input type="text" placeholder="Nr mieszkania" maxLength="3" name="flatNumber" value={userData.flatNumber} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.flatNumber && <p className="error-message text-danger">{userDataFormErrors.flatNumber}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Kod pocztowy</label>
                            <Input type="text" placeholder="xx-xxx" maxLength="6" name="postal" value={userData.postal} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.postal && <p className="error-message text-danger">{userDataFormErrors.postal}</p>}
                        </Col>
                        <Col>
                            <label className="required">Nr telefonu</label>
                            <Input type="text" placeholder="Max 9 cyfr" maxLength="9" name="phoneNumber" value={userData.phoneNumber} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.phoneNumber && <p className="error-message text-danger">{userDataFormErrors.phoneNumber}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <Button block color="danger" onClick={()=>{setIsEditUserDataModalOpen(false); handleFormReset()}}>Anuluj</Button>
                        </Col>

                        <Col>
                            <Button color="secondary" block type="submit" onClick={handleEditUserDataSubmit}>Zapisz</Button>
                        </Col>
                    </FormRow>
                </Form>
            </ModalContent>
        </ModalDialog>
    </Modal>
    )
}