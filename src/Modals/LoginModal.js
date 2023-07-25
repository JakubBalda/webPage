import React from "react";
import axios from "axios";
import { useState } from "react";

import {ModalContent, ModalDialog, ModalTitle, Modal, Form, FormGroup, Button, Input} from 'reacthalfmoon'
export default function LoginModal({isLoginModalOpen, setIsLoginModalOpen, handleFormSwitch}){
    const [loginData, setLoginData] = useState({
        login: '',
        password: ''
    });

    const [loginFormErrors, setLoginFormErrors] = useState({
        login: '',
        password: '',
        wrongData: ''
    });

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });

        setLoginFormErrors({
            ...loginFormErrors,
            [name]: ""
        });
    };

    const validateLoginForm = () => {
        let isValid = true;
        const errors = {};

        if (loginData.login.trim() === "") {
            errors.login = "Login jest wymagany.";
            console.log(errors.login);
            isValid = false;
        }

        if (loginData.password === "") {
            errors.password = "Hasło jest wymagane.";
            console.log(errors.password);

            isValid = false;
        }

        setLoginFormErrors(errors);
        return isValid;
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        if(validateLoginForm()){
            axios.post('http://localhost:5001/api/users/login', loginData)
                .then((response) => {
                    console.log(response.data);
                        if(response.data === 'Failed'){
                            setLoginFormErrors({
                                ...loginFormErrors,
                                wrongData: "Błędny login lub hasło!"
                        });
                    }
                })
                .catch((error) => {
                    console.error('Login failed!', error);
                });
            };
        }
    
return(
    <Modal isOpen={isLoginModalOpen} toggle={()=>{setIsLoginModalOpen(!isLoginModalOpen)}}>
        <ModalDialog>
            <ModalContent>
                <ModalTitle>Zaloguj się</ModalTitle>
                <Form >
                    <FormGroup>
                        <label className="required">Login</label>
                        <Input type="text" placeholder="Login" name="login" value={loginData.login} onChange={handleLoginInputChange}/>
                        {loginFormErrors.login && <p className="error-message text-danger">{loginFormErrors.login}</p>}
                    </FormGroup>
                    <FormGroup>
                        <label className="required">Hasło</label>
                        <Input type="password" placeholder="Hasło" name="password" value={loginData.password} onChange={handleLoginInputChange} />
                        {loginFormErrors.wrongData && <p className="error-message text-danger">{loginFormErrors.wrongData}</p>}
                    </FormGroup>
                    <FormGroup>
                        {loginFormErrors.password && <p className="error-message text-danger">{loginFormErrors.password}</p>}
                        <Button color="primary" block type="submit" onClick={handleLoginSubmit}>Zaloguj</Button>
                    </FormGroup>
                </Form>
                <Button block color="danger" onClick={()=>{setIsLoginModalOpen(false)}}>Anuluj</Button>
                 Nie masz jeszcze konta? <a className="cursor-pointer" 
                 onClick={handleFormSwitch}>Zarejestruj się</a>
            </ModalContent>
        </ModalDialog>
    </Modal>
)
}