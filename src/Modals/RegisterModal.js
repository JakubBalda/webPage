import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button, ModalContent, ModalDialog, ModalTitle, Modal, Form, Input, FormRow, Col } from "reacthalfmoon";


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
        console.log(value);
        setRegisterData({
            ...registerData,
            [name]: value
        });

        setRegisterFormErrors({
            ...registerFormErrors,
            [name]: ""
        });
    };

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
                        </Col>
                        <Col>
                            <label className="required">Hasło</label>
                            <Input type="password" placeholder="Hasło" name="password" onChange={handleRegisterInputChange}/>
                        </Col>
                    </FormRow>
                    
                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Imie</label>
                            <Input type="text" placeholder="Imie" name="name" onChange={handleRegisterInputChange}/>
                        </Col>
                        <Col>
                            <label className="required">Nazwisko</label>
                            <Input type="text" placeholder="Nazwisko" name="surname" onChange={handleRegisterInputChange}/>
                        </Col>
                        <Col>
                            <label className="required">Miejscowość</label>
                            <Input type="text" placeholder="Miejscowość" name="city" onChange={handleRegisterInputChange}/>
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Ulica</label>
                            <Input type="text" placeholder="Ulica" name="street" onChange={handleRegisterInputChange}/>
                        </Col>
                        <Col>
                            <label className="required">Nr domu</label>
                            <Input type="text" placeholder="Nr domu" maxlength="4" name="houseNumber" onChange={handleRegisterInputChange}/>
                        </Col>
                        <Col>
                            <label>Nr mieszkania</label>
                            <Input type="text" placeholder="Nr mieszkania" maxlength="3" name="flatNumber" onChange={handleRegisterInputChange}/>
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Kod pocztowy</label>
                            <Input type="text" placeholder="xx-xxx" maxlength="6" name="postal" onChange={handleRegisterInputChange}/>
                        </Col>
                        <Col>
                            <label className="required">E-mail</label>
                            <Input type="text" placeholder="xyz@gmail.com" name="mail" onChange={handleRegisterInputChange}/>
                        </Col>
                        <Col>
                            <label className="required">Nr telefonu</label>
                            <Input type="text" placeholder="Max 9 cyfr" maxlength="9" name="phoneNumber" onChange={handleRegisterInputChange}/>
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <Button block color="danger" onClick={()=>{setIsRegisterModalOpen(false)}}>Anuluj</Button>
                        </Col>

                        <Col>
                            <Button color="primary" block type="submit">Zarejestruj</Button>
                        </Col>
                    </FormRow>
                </Form>
            </ModalContent>
        </ModalDialog>
    </Modal>
    )
}