import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button, ModalContent, ModalDialog, ModalTitle, Modal, Form, Input, FormRow, Col } from "reacthalfmoon";
import validator from 'validator';

export default function RegisterModal({isRegisterModalOpen, setIsRegisterModalOpen}){
    const [registerData, setRegisterData] = useState({
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

    const [registerFormErrors, setRegisterFormErrors] = useState({
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

    const handleRegisterInputChange = (e) => {
        const { name, value } = e.target;

        setRegisterData({
            ...registerData,
            [name]: value
        });

        setRegisterFormErrors({
            ...registerFormErrors,
            [name]: ""
        });
    };

    const validateRegisterForm = () => {
        let isValid = true;
        const errors = {};

        if (registerData.login.trim() === "") {
            errors.login = "Login jest wymagany.";
            isValid = false;
        }

        if(registerData.login.trim().length > 30){
            errors.login = "Login jest za długi - max 30 znaków."
            isValid = false;
        }

        if (registerData.password.trim() === "") {
            errors.password = "Hasło jest wymagane.";
            isValid = false;
        }

        if(!validator.isStrongPassword(registerData.password.trim(),{
           minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, maxlength: 40 
            })){
                errors.password = "Hasło musi być silne (max 40 znaków)!";
                isValid = false;
        }

        if (registerData.name.trim() === "") {
            errors.name = "Imie jest wymagane.";
            isValid = false;
        }

        if(!validator.isAlpha(registerData.name.trim(), ['pl-PL'])){
            errors.name =  "Imie jest niepoprawne."
            isValid = false;
        }

        if(registerData.name.trim().length > 30){
            errors.name = "Imie jest za długie - max 30 znaków."
            isValid = false;
        }

        if (registerData.surname.trim() === "") {
            errors.surname = "Nazwisko jest wymagane.";
            isValid = false;
        }

        if(registerData.surname.trim().length > 30){
            errors.surname =  "Nazwisko jest za długie - max 30 znaków."
            isValid = false;
        }

        if(!validator.isAlpha(registerData.surname.trim(), ['pl-PL'])){
            errors.surname = "Nazwisko jest niepoprawne"
            isValid = false;
        }

        if (registerData.city.trim() === "") {
            errors.city = "Miejscowość jest wymagana.";
            isValid = false;
        }

        if(registerData.city.trim().length > 40){
            errors.city =  "Miejscowość jest za długa - max 40 znaków."
            isValid = false;
        }

        if(!validator.isAlpha(registerData.city.trim().split(" ").join(""), ['pl-PL'])){
            errors.city =  "Miejscowość jest niepoprawna."
            isValid = false;
        }

        if (registerData.street.trim() === "") {
            errors.street = "Ulica jest wymagana.";
            isValid = false;
        }

        if(registerData.street.trim().length > 40){
            errors.street =  "Ulica jest za długa - max 40 znaków."
            isValid = false;
        }

        if (registerData.houseNumber.trim() === "") {
            errors.houseNumber = "Nr domu jest wymagany.";
            isValid = false;
        }

        if (!validator.isAlphanumeric(registerData.houseNumber.trim())) {
            errors.houseNumber = "Nr domu jest niepopawny";
            isValid = false;
        }

        if(registerData.houseNumber.trim().length > 4){
            errors.houseNumber =  "Nr domu jest za długi - max 4 znaki."
            isValid = false;
        }

        if (!validator.isAlphanumeric(registerData.flatNumber.trim())) {
            errors.flatNumber = "Nr mieszkania jest niepopawny";
            isValid = false;
        }

        if(registerData.flatNumber.trim() === ""){
            errors.flatNumber = "";
            isValid = true;
        }

        if(registerData.flatNumber.trim().length > 3){
            errors.flatNumber =  "Nr domu jest za długi - max 3 znaki."
            isValid = false;
        }

        if(!validator.isPostalCode(registerData.postal.trim(), 'PL')){
            errors.postal = "Kod pocztowy jest niepoprawny.";
            isValid = false;
        }

        if (registerData.postal.trim() === "") {
            errors.postal = "Kod pocztowy jest wymagany.";
            isValid = false;
        }

        if(!validator.isEmail(registerData.mail.trim())){
            errors.mail = "E-mail jest niepoprawny.";
            isValid = false;
        }

        if (registerData.mail.trim() === "") {
            errors.mail = "E-mail jest wymagany.";
            isValid = false;
        }
        
        if (registerData.mail.trim().length > 50) {
            errors.phoneNumber = "E-mail jest zbyt długi - max 50 znaków.";
            isValid = false;
        }
        
        if(!validator.isNumeric(registerData.phoneNumber.trim())){
            errors.phoneNumber = "Nr telefonu jest niepoprawny.";
            isValid = false;
        }

        if (registerData.phoneNumber.trim() === "") {
            errors.phoneNumber = "Nr telefonu jest wymagany.";
            isValid = false;
        }

        if (registerData.phoneNumber.trim().length > 9) {
            errors.phoneNumber = "Nr telefonu jest zbyt długi - max 9 cyfr.";
            isValid = false;
        }

        setRegisterFormErrors(errors);
        return isValid;
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        if(window.confirm('Czy podane dane są poprawne?') === true){

            if(validateRegisterForm()){
                axios.post('http://localhost:5001/api/users/register', registerData)
                    .then((response) => {
                        switch(response.data){
                            case 'login':
                                alert('Login zajęty');
                                break;
                            case 'mail':
                                alert('E-mail zajęty');
                                break;
                            case 'failed':
                                alert('Sprawdź poprawność danych')
                                break;
                            default:
                                alert('Zarejestrowano poprawnie. Możesz sie zalogować');
                                window.location.reload();
                                break;
                                
                        }
                    })
                    .catch((error) => {
                        console.error('Register failed!', error);
                    });
            };
        }
        
        }

        const handleFormReset = () => {
            setRegisterData({
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

            setRegisterFormErrors({
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
            })
        }

    return(
        <Modal isOpen={isRegisterModalOpen} toggle={()=>{setIsRegisterModalOpen(!isRegisterModalOpen)}}>
        <ModalDialog>
            <ModalContent className="w-half">
                <ModalTitle>Zarejestruj się</ModalTitle>
                <Form>
                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Login</label>
                            <Input type="text" placeholder="Login" name="login" onChange={handleRegisterInputChange}/>
                            {registerFormErrors.login && <p className="error-message text-danger">{registerFormErrors.login}</p>}
                        </Col>
                        <Col>
                            <label className="required">Hasło</label>
                            <Input type="password" placeholder="Hasło" name="password" onChange={handleRegisterInputChange}/>
                            {registerFormErrors.password && <p className="error-message text-danger">{registerFormErrors.password}</p>}
                        </Col>
                    </FormRow>
                    
                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Imie</label>
                            <Input type="text" placeholder="Imie" name="name" onChange={handleRegisterInputChange}/>
                            {registerFormErrors.name && <p className="error-message text-danger">{registerFormErrors.name}</p>}
                        </Col>
                        <Col>
                            <label className="required">Nazwisko</label>
                            <Input type="text" placeholder="Nazwisko" name="surname" onChange={handleRegisterInputChange}/>
                            {registerFormErrors.surname && <p className="error-message text-danger">{registerFormErrors.surname}</p>}
                        </Col>
                        <Col>
                            <label className="required">Miejscowość</label>
                            <Input type="text" placeholder="Miejscowość" name="city" onChange={handleRegisterInputChange}/>
                            {registerFormErrors.city && <p className="error-message text-danger">{registerFormErrors.city}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Ulica</label>
                            <Input type="text" placeholder="Ulica" name="street" onChange={handleRegisterInputChange}/>
                            {registerFormErrors.street && <p className="error-message text-danger">{registerFormErrors.street}</p>}
                        </Col>
                        <Col>
                            <label className="required">Nr domu</label>
                            <Input type="text" placeholder="Nr domu" maxlength="4" name="houseNumber" onChange={handleRegisterInputChange}/>
                            {registerFormErrors.houseNumber && <p className="error-message text-danger">{registerFormErrors.houseNumber}</p>}
                        </Col>
                        <Col>
                            <label>Nr mieszkania</label>
                            <Input type="text" placeholder="Nr mieszkania" maxlength="3" name="flatNumber" onChange={handleRegisterInputChange}/>
                            {registerFormErrors.flatNumber && <p className="error-message text-danger">{registerFormErrors.flatNumber}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Kod pocztowy</label>
                            <Input type="text" placeholder="xx-xxx" maxlength="6" name="postal" onChange={handleRegisterInputChange}/>
                            {registerFormErrors.postal && <p className="error-message text-danger">{registerFormErrors.postal}</p>}
                        </Col>
                        <Col>
                            <label className="required">E-mail</label>
                            <Input type="text" placeholder="xyz@gmail.com" name="mail" onChange={handleRegisterInputChange}/>
                            {registerFormErrors.mail && <p className="error-message text-danger">{registerFormErrors.mail}</p>}
                        </Col>
                        <Col>
                            <label className="required">Nr telefonu</label>
                            <Input type="text" placeholder="Max 9 cyfr" maxlength="9" name="phoneNumber" onChange={handleRegisterInputChange}/>
                            {registerFormErrors.phoneNumber && <p className="error-message text-danger">{registerFormErrors.phoneNumber}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <Button block color="danger" onClick={()=>{setIsRegisterModalOpen(false); handleFormReset();}}>Anuluj</Button>
                        </Col>

                        <Col>
                            <Button color="primary" block type="submit" onClick={handleRegisterSubmit}>Zarejestruj</Button>
                        </Col>
                    </FormRow>
                </Form>
            </ModalContent>
        </ModalDialog>
    </Modal>
    )
}