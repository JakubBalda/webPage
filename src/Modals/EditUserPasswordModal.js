import React from "react";
import axios from "axios";
import { useState } from "react";
import validator from 'validator';
import { Button, ModalContent, ModalDialog, ModalTitle, Modal, Form, Input, FormRow, Col } from "reacthalfmoon";

export default function EditUserPasswordModal({isEditUserPasswordModalOpen, setIsEditUserPasswordModalOpen}){

    return (
        <Modal isOpen={isEditUserPasswordModalOpen} toggle={()=>{setIsEditUserPasswordModalOpen(!isEditUserPasswordModalOpen)}}>
        <ModalDialog>
            <ModalContent className="w-half">
                <ModalTitle>Edytuj hasło</ModalTitle>
                <Form>
                    <FormRow equalSpacing>
                        <Col>
                            <Input></Input>
                        </Col>
                    </FormRow>
                    <FormRow equalSpacing>
                        <Col>
                            <Button block color="danger" onClick={()=>{setIsEditUserPasswordModalOpen(false)}}>Anuluj</Button>
                        </Col>

                        <Col>
                            <Button color="secondary" block type="submit">Zapisz</Button>
                        </Col>
                    </FormRow>
                </Form>
            </ModalContent>
        </ModalDialog>
    </Modal>

    );
}