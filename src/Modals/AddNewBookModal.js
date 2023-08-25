import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, ModalContent, ModalDialog, ModalTitle, Modal, Form, Input, FormRow, Col, TextArea  } from "reacthalfmoon";
import validator from 'validator';

export default function AddNewBookModal({isAddNewBookModalOpen, setIsNewBookModalOpen}){
    const [bookData, setBookData] = useState({
        title: '',
        authorName: '',
        authorSurname: '',
        isbn: '',
        description: '',
        price: '',
        amount: '',
        publisher: '',
        pageAmount: '',
        publishYear: '',
        genre: '',
        bookPhotoUrl: ''
    })

    const [bookImage, setBookImage] = useState(null);

    const [bookDataFormErrors, setBookDataFormErrors] = useState({
        title: '',
        authorName: '',
        authorSurname: '',
        isbn: '',
        description: '',
        price: '',
        amount: '',
        publisher: '',
        pageAmount: '',
        publishYear: '',
        genre: '',
        bookPhotoUrl: ''
    })

    const validateAddNewBookDataForm = () => {
        let isValid = true;
        const errors = {};

        if(bookData.title.trim() === ""){
            isValid = false;
            errors.title = "Tytuł jest wymagany.";
        }

        if(bookData.title.trim().length > 100){
            isValid = false;
            errors.title = "Tytuł jest zbyt długi - max 100 znaków.";
        }

        if(bookData.authorName.trim() === ""){
            isValid = false;
            errors.authorName = "Imie autora jest wymagane.";
        }

        if(bookData.authorSurname.trim() === ""){
            isValid = false;
            errors.authorSurname = "Nazwisko autora jest wymagane.";
        }

        if(bookData.isbn.trim() === ""){
            isValid = false;
            errors.isbn = "ISBN jest wymagany.";
        }

        if(bookData.isbn.trim().length !== 13 ){
            isValid = false;
            errors.isbn = "ISBN jest niepoprawny - 13 znaków wymagane.";
        }
        if(bookData.price.toString() === ""){
            isValid = false;
            errors.price = "Cena jest wymagana.";
        }
        
        if(!validator.isCurrency(bookData.price.toString())){
            isValid = false;
            errors.price = "Niepoprawny format ceny.";
        }

        if(!validator.isInt(bookData.amount.toString(), {min: 0, max: 254})){
            isValid = false;
            errors.amount = "Ilość musi być liczbą naturalną. Max - 254"
        }

        if(bookData.amount.toString() === ""){
            isValid = false;
            errors.amount = "Ilość jest wymagana.";
        }

        if(bookData.publisher.trim() === ""){
            isValid = false;
            errors.publisher = "Wydawnictwo jest wymagane.";
        }

        if(bookData.publisher.trim().length > 100){
            isValid = false;
            errors.publisher = "Wydawnictwo jest zbyt długie - max 100 znaków.";
        }

        if(bookData.publishYear.toString() === ""){
            isValid = false;
            errors.publishYear = "Rok wydania jest wymagany.";
        }

        if(!validator.isInt(bookData.publishYear.toString(), {min: 0})){
            isValid = false;
            errors.publishYear = "Rok wydania musi być liczbą naturalną"
        }

        if(bookData.genre.trim() === ""){
            isValid = false;
            errors.genre = "Gatunek jest wymagany.";
        }

        if(bookData.genre.trim().length > 40){
            isValid = false;
            errors.genre = "Gatunek za długi - max 40 znaków.";
        }

        if(!validator.isInt(bookData.pageAmount.toString(), {min: 0})){
            isValid = false;
            errors.pageAmount = "Ilość stron musi być liczbą naturalną."
        }

        if(bookData.pageAmount.toString() === ""){
            isValid = false;
            errors.pageAmount = "Ilość stron jest wymagana.";
        }
        console.log(bookData.description);
        if(bookData.description !== 'null'){
            if(bookData.description !== "" && bookData.description.trim().length > 500){
                isValid = false;
                errors.description = 'Opis zbyt długi.';
            }
        }

        setBookDataFormErrors(errors);
        return isValid;
    }

    const handleAddNewBookDataInputChange = (e) => {
        const { name, value } = e.target
        setBookData({
            ...bookData,
            [name]: value
        });

        setBookDataFormErrors({
            ...bookDataFormErrors,
            [name]: ""
        });
    }

    //TO:DO napraw kiedyś wgrywanie okładki
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setBookImage(file);
    }

    const handleAddNewBookDataSubmit = () => {
        const formData = new FormData();
        formData.append('bookImage', bookImage);

        for (const key in bookData){
            formData.append(key, bookData[key]);
        }

        if(validateAddNewBookDataForm()){
            if(window.confirm('Czy dane są poprawne?') === true){
                axios.post(`http://localhost:5000/api/books/new`, formData)
                .then((response) => {
                    if(response.data === 'Added'){
                        alert('Książka została dodana.');
                        window.location.reload();
                    }else{
                        alert(response.data);
                    }
                })
                .catch((error) => {
                    console.log('Error: '+ error);
                })
            }
        }
    }

    const handleFormReset = () => {
        setBookData({
            title: '',
            authorName: '',
            authorSurname: '',
            isbn: '',
            description: '',
            price: '',
            amount: '',
            publisher: '',
            pageAmount: '',
            publishYear: '',
            genre: '',
            bookPhoto: '',
            bookPhotoUrl: ''
        })
    }
    return(
        <Modal isOpen={isAddNewBookModalOpen} toggle={()=>{setIsNewBookModalOpen(!isAddNewBookModalOpen)}}>
        <ModalDialog>
            <ModalContent className="w-half">
                <ModalTitle>Dodaj nową książke</ModalTitle>
                <Form>
                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Tytuł</label>
                            <Input type="text" placeholder="Tytuł" name="title" value={bookData.title} onChange={handleAddNewBookDataInputChange}/>
                            {bookDataFormErrors.title && <p className="error-message text-danger">{bookDataFormErrors.title}</p>}
                        </Col>
                        <Col>
                            <label className="required">Gatunek</label>
                            <Input type="text" placeholder="Gatunek" name="genre" value={bookData.genre} onChange={handleAddNewBookDataInputChange}/>
                            {bookDataFormErrors.genre && <p className="error-message text-danger">{bookDataFormErrors.genre}</p>}
                        </Col>
                    </FormRow>
                    
                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Imie autora</label>
                            <Input type="text" placeholder="Imie" name="authorName" value={bookData.authorName} onChange={handleAddNewBookDataInputChange}/>
                            {bookDataFormErrors.authorName && <p className="error-message text-danger">{bookDataFormErrors.authorName}</p>}
                        </Col>
                        <Col>
                            <label className="required">Nazwisko autora</label>
                            <Input type="text" placeholder="Nazwisko" name="authorSurname" value={bookData.authorSurname} onChange={handleAddNewBookDataInputChange}/>
                            {bookDataFormErrors.authorSurname && <p className="error-message text-danger">{bookDataFormErrors.authorSurname}</p>}
                        </Col>
                        <Col>
                            <label className="required">ISBN</label>
                            <Input type="text" placeholder="ISBN" name="isbn" value={bookData.isbn} onChange={handleAddNewBookDataInputChange}/>
                            {bookDataFormErrors.isbn && <p className="error-message text-danger">{bookDataFormErrors.isbn}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Wydawnictwo</label>
                            <Input type="text" placeholder="Wydawnictwo" name="publisher" value={bookData.publisher} onChange={handleAddNewBookDataInputChange}/>
                            {bookDataFormErrors.publisher && <p className="error-message text-danger">{bookDataFormErrors.publisher}</p>}
                        </Col>
                        <Col>
                            <label className="required">Rok wydania</label>
                            <Input type="text" placeholder="Rok wydania" maxLength="4" name="publishYear" value={bookData.publishYear} onChange={handleAddNewBookDataInputChange}/>
                            {bookDataFormErrors.publishYears && <p className="error-message text-danger">{bookDataFormErrors.publishYear}</p>}
                        </Col>
                        <Col>
                            <label className="required">Ilość stron</label>
                            <Input type="text" placeholder="Ilość stron" maxLength="3" name="pageAmount" value={bookData.pageAmount} onChange={handleAddNewBookDataInputChange}/>
                            {bookDataFormErrors.pageAmount && <p className="error-message text-danger">{bookDataFormErrors.pageAmount}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Ilość</label>
                            <Input type="text" placeholder="Na stanie" maxLength="6" name="amount" value={bookData.amount} onChange={handleAddNewBookDataInputChange}/>
                            {bookDataFormErrors.amount && <p className="error-message text-danger">{bookDataFormErrors.amount}</p>}
                        </Col>
                        <Col>
                            <label className="required">Cena</label>
                            <Input type="text" placeholder="Cena" name="price" value={bookData.price} onChange={handleAddNewBookDataInputChange}/>
                            {bookDataFormErrors.price && <p className="error-message text-danger">{bookDataFormErrors.price}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Okładka</label>
                            <Input type="file" accept="image/*" placeholder="Okładka" name="bookPhoto" onChange={handleImageChange}/>
                            {bookDataFormErrors.bookPhoto && <p className="error-message text-danger">{bookDataFormErrors.bookPhoto}</p>}
                        </Col>
                        <Col>
                            <label>Nazwa pliku</label>
                            <Input type="text" placeholder="Nazwa pliku" name="bookPhotoUrl" value={bookData.bookPhotoUrl} onChange={handleAddNewBookDataInputChange}/>
                            {bookDataFormErrors.bookPhotoUrl && <p className="error-message text-danger">{bookDataFormErrors.bookPhotoUrl}</p>}
                        </Col>
                    </FormRow>

                    <FormRow>
                        <Col>
                            <label>Opis</label>
                            {bookData.description === 'null' || bookData.description === "" ?
                            (
                                <TextArea placeholder="Opis książki" name="description" onChange={handleAddNewBookDataInputChange}></TextArea>
                            ) 
                            :
                            (
                                <TextArea placeholder="Opis książki" name="description" value={bookData.description} onChange={handleAddNewBookDataInputChange}></TextArea>
                            )};
                                {bookDataFormErrors.description && <p className="error-message text-danger">{bookDataFormErrors.description}</p>}

                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <Button block color="danger" onClick={()=>{setIsNewBookModalOpen(false); handleFormReset()}}>Anuluj</Button>
                        </Col>

                        <Col>
                            <Button color="secondary" block type="submit" onClick={handleAddNewBookDataSubmit}>Zapisz</Button>
                        </Col>
                    </FormRow>
                </Form>
            </ModalContent>
        </ModalDialog>
    </Modal>
    )
}