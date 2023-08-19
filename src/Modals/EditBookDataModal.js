import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, ModalContent, ModalDialog, ModalTitle, Modal, Form, Input, FormRow, Col } from "reacthalfmoon";
import validator from 'validator';

export default function EditBookDataModal({isEditBookDataModalOpen, setIsEditBookDataModalOpen, book}){

    const [bookData, setBookData] = useState({

    })

    const [bookDataFormErrors, setBookDataFormErrors] = useState({

    })

    const handleEditBookDataInputChange = () => {

    }

    const handleEditBookDataSubmit = () => {
        
    }

    const handleFormReset = () => {

    }

    return(
        <Modal isOpen={isEditBookDataModalOpen} toggle={()=>{setIsEditBookDataModalOpen(!isEditBookDataModalOpen)}}>
        <ModalDialog>
            <ModalContent className="w-half">
                <ModalTitle>Edytuj dane</ModalTitle>
                <Form>
                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Login</label>
                            <Input type="text" placeholder="Login" name="login" value={bookData.login} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.login && <p className="error-message text-danger">{bookDataFormErrors.login}</p>}
                        </Col>
                        <Col>
                            <label className="required">E-mail</label>
                            <Input type="text" placeholder="xyz@gmail.com" name="mail" value={bookData.mail} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.mail && <p className="error-message text-danger">{bookDataFormErrors.mail}</p>}
                        </Col>
                    </FormRow>
                    
                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Imie</label>
                            <Input type="text" placeholder="Imie" name="name" value={bookData.name} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.name && <p className="error-message text-danger">{bookDataFormErrors.name}</p>}
                        </Col>
                        <Col>
                            <label className="required">Nazwisko</label>
                            <Input type="text" placeholder="Nazwisko" name="surname" value={bookData.surname} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.surname && <p className="error-message text-danger">{bookDataFormErrors.surname}</p>}
                        </Col>
                        <Col>
                            <label className="required">Miejscowość</label>
                            <Input type="text" placeholder="Miejscowość" name="city" value={bookData.city} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.city && <p className="error-message text-danger">{bookDataFormErrors.city}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Ulica</label>
                            <Input type="text" placeholder="Ulica" name="street" value={bookData.street} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.street && <p className="error-message text-danger">{bookDataFormErrors.street}</p>}
                        </Col>
                        <Col>
                            <label className="required">Nr domu</label>
                            <Input type="text" placeholder="Nr domu" maxLength="4" name="houseNumber" value={bookData.houseNumber} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.houseNumber && <p className="error-message text-danger">{bookDataFormErrors.houseNumber}</p>}
                        </Col>
                        <Col>
                            <label>Nr mieszkania</label>
                            <Input type="text" placeholder="Nr mieszkania" maxLength="3" name="flatNumber" value={bookData.flatNumber} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.flatNumber && <p className="error-message text-danger">{bookDataFormErrors.flatNumber}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Kod pocztowy</label>
                            <Input type="text" placeholder="xx-xxx" maxLength="6" name="postal" value={bookData.postal} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.postal && <p className="error-message text-danger">{bookDataFormErrors.postal}</p>}
                        </Col>
                        <Col>
                            <label className="required">Nr telefonu</label>
                            <Input type="text" placeholder="Max 9 cyfr" maxLength="9" name="phoneNumber" value={bookData.phoneNumber} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.phoneNumber && <p className="error-message text-danger">{bookDataFormErrors.phoneNumber}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <Button block color="danger" onClick={()=>{setIsEditBookDataModalOpen(false); handleFormReset()}}>Anuluj</Button>
                        </Col>

                        <Col>
                            <Button color="secondary" block type="submit" onClick={handleEditBookDataSubmit}>Zapisz</Button>
                        </Col>
                    </FormRow>
                </Form>
            </ModalContent>
        </ModalDialog>
    </Modal>
    )
}