import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button, ModalContent, ModalDialog, ModalTitle, Modal, Form, Input, FormRow, Col } from "reacthalfmoon";
import validator from 'validator';

export default function EditUserDataModal({isEditUserDataModalOpen, setIsEditUserDataModalOpen, userProfileData}){
    const [userData, setUserData] = useState({
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

    const handleEditUserDataSubmit = () => {
        
    }

    const handleFormReset = () => {
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
                            <Input type="text" placeholder="xyz@gmail.com" name="mail" value={userProfileData.mail} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.mail && <p className="error-message text-danger">{userDataFormErrors.mail}</p>}
                        </Col>
                    </FormRow>
                    
                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Imie</label>
                            <Input type="text" placeholder="Imie" name="name" value={userProfileData.name} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.name && <p className="error-message text-danger">{userDataFormErrors.name}</p>}
                        </Col>
                        <Col>
                            <label className="required">Nazwisko</label>
                            <Input type="text" placeholder="Nazwisko" name="surname" value={userProfileData.surname} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.surname && <p className="error-message text-danger">{userDataFormErrors.surname}</p>}
                        </Col>
                        <Col>
                            <label className="required">Miejscowość</label>
                            <Input type="text" placeholder="Miejscowość" name="city" value={userProfileData.city} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.city && <p className="error-message text-danger">{userDataFormErrors.city}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Ulica</label>
                            <Input type="text" placeholder="Ulica" name="street" value={userProfileData.street} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.street && <p className="error-message text-danger">{userDataFormErrors.street}</p>}
                        </Col>
                        <Col>
                            <label className="required">Nr domu</label>
                            <Input type="text" placeholder="Nr domu" maxlength="4" name="houseNumber" value={userProfileData.houseNumber} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.houseNumber && <p className="error-message text-danger">{userDataFormErrors.houseNumber}</p>}
                        </Col>
                        <Col>
                            <label>Nr mieszkania</label>
                            <Input type="text" placeholder="Nr mieszkania" maxlength="3" name="flatNumber" value={userProfileData.flatNumber} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.flatNumber && <p className="error-message text-danger">{userDataFormErrors.flatNumber}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Kod pocztowy</label>
                            <Input type="text" placeholder="xx-xxx" maxlength="6" name="postal" value={userProfileData.postalCode} onChange={handleEditUserDataInputChange}/>
                            {userDataFormErrors.postal && <p className="error-message text-danger">{userDataFormErrors.postal}</p>}
                        </Col>
                        <Col>
                            <label className="required">Nr telefonu</label>
                            <Input type="text" placeholder="Max 9 cyfr" maxlength="9" name="phoneNumber" value={userProfileData.phoneNumber} onChange={handleEditUserDataInputChange}/>
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