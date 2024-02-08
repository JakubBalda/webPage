import React from "react";
import axios from "axios";
import { useState } from "react";
import validator from 'validator';
import { Button, ModalContent, ModalDialog, ModalTitle, Modal, Form, Input, FormRow, Col } from "reacthalfmoon";

export default function EditUserPasswordModal({isEditUserPasswordModalOpen, setIsEditUserPasswordModalOpen, cookies}){
    const [userNewPassword, setUserNewPassword] = useState({
        newPassword: '',
        repeatNewPassword: ''
    });

    const [userNewPasswordErrors, setUserNewPasswordErrors] = useState({
        newPassword: '',
        repeatNewPassword: ''
    });

    const validateUserNewPassword = () => {
        const errors = {};
        let isValid = true;

        if(!validator.isStrongPassword(userNewPassword.newPassword.trim(),{
            minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, maxlength: 40 
             })){
                 errors.newPassword = "Hasło musi być silne (max 40 znaków)!";
                 isValid = false;
         }

         if(userNewPassword.newPassword !== userNewPassword.repeatNewPassword){
            errors.repeatNewPassword = "Hasła muszą być identyczne!";
            isValid = false;
         }
         setUserNewPasswordErrors(errors);
         return isValid;
    }

    const handleEditUserPasswordInputChange = (e) => {
        const { name, value } = e.target;
        console.log(value);
        setUserNewPassword({
            ...userNewPassword,
            [name]: value
        });

        setUserNewPasswordErrors({
            ...userNewPasswordErrors,
            [name]: ""
        });
    }

    const handleEditUserPasswordSubmit = () => {

        if(validateUserNewPassword() && window.confirm('Na pewno chcesz zmienić hasło?') === true){
            axios.put(`http://localhost:5001/api/users/updatePassword/${cookies.user?.id}`, userNewPassword)
                .then((response) => {
                    console.log(response.data);
                    alert("Hasło zostało zaktualizowane");
                    setIsEditUserPasswordModalOpen(false);
                    handleFormReset();
                })
                .catch((error) => {
                    console.log('Error: ' + error);
                    alert("Wystąpił nieoczekiwany błąd, spróbuj ponowienie za chwilę");
                })
        }
    }

    const handleFormReset = () => {
        setUserNewPassword({
            newPassword: '',
            repeatNewPassword: ''
        });

        setUserNewPasswordErrors({
            newPassword: '',
            repeatNewPassword: ''
        })
    }

    return (
        <Modal isOpen={isEditUserPasswordModalOpen} toggle={()=>{setIsEditUserPasswordModalOpen(!isEditUserPasswordModalOpen)}}>
        <ModalDialog>
            <ModalContent className="w-half">
                <ModalTitle>Edytuj hasło</ModalTitle>
                <Form>
                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Nowe hasło</label>
                            <Input type="password" placeholder="Nowe hasło" name="newPassword" value={userNewPassword.newPassword} onChange={handleEditUserPasswordInputChange}></Input>
                            {userNewPasswordErrors.newPassword && <p className="error-message text-danger">{userNewPasswordErrors.newPassword}</p>}
                        </Col>
                        <Col>
                            <label className="required">Powtórz nowe hasło</label>
                            <Input type="password" placeholder="Powtórz nowe hasło" name="repeatNewPassword" value={userNewPassword.repeatNewPassword} onChange={handleEditUserPasswordInputChange}></Input>
                            {userNewPasswordErrors.repeatNewPassword && <p className="error-message text-danger">{userNewPasswordErrors.repeatNewPassword}</p>}
                        </Col>
                    </FormRow>
                    <FormRow equalSpacing>
                        <Col>
                            <Button block color="danger" onClick={()=>{setIsEditUserPasswordModalOpen(false); handleFormReset()}}>Anuluj</Button>
                        </Col>

                        <Col>
                            <Button color="secondary" block type="submit" onClick={handleEditUserPasswordSubmit}>Zapisz</Button>
                        </Col>
                    </FormRow>
                </Form>
            </ModalContent>
        </ModalDialog>
    </Modal>

    );
}