import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, ModalContent, ModalDialog, ModalTitle, Modal, Form, Input, FormRow, Col, TextArea  } from "reacthalfmoon";
import validator from 'validator';

export default function EditBookDataModal({isEditBookDataModalOpen, setIsEditBookDataModalOpen, book, bookId}){

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
        oldAuthorName: '',
        oldAuthorSurname: '',
        bookPhoto: null,
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
        bookPhoto: '',
        bookPhotoUrl: ''
    })

    useEffect(() => {
        if(book.length === undefined){
            const author = book.author.split(' ');
            setBookData({
                title: book.title,
                authorName: author[0],
                authorSurname: author[1],
                isbn: book.isbn,
                description: book.description,
                price: book.price,
                amount: book.amount,
                publisher: book.publisher,
                pageAmount: book.pageAmount,
                publishYear: book.publishYear,
                genre: book.genre,
                oldAuthorName: author[0],
                oldAuthorSurname: author[1],
                oldIsbn: book.isbn,
                bookPhotoUrl: book.imageUrl,
                bookPhoto: ''
            });

        }

    }, [book]);

    const validateEditBookDataForm = () => {
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
        if(bookData.description !== 'null' || bookData.description !== "" && bookData.description.trim().length > 500){
            isValid = false;
            errors.description = 'Opis zbyt długi.';
        }

        setBookDataFormErrors(errors);
        return isValid;
    }

    const handleEditBookDataInputChange = (e) => {
        const { name, value } = e.target
        setBookData({
            ...bookData,
            [name]: value
        });

        setBookDataFormErrors({
            ...bookDataFormErrors,
            [name]: ""
        });

        console.log(bookData);
    }

    //TO:DO Spróbuj naprawić upload okładki kiedyś
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const { name } = e.target

        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageDataURL = e.target.result;
            console.log(imageDataURL);

        };
        reader.readAsBinaryString(file);
    }
}

    const readFileAsArrayBuffer = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
          reader.readAsArrayBuffer(file);
        });
      };

    const handleEditBookDataSubmit = () => {
        if(validateEditBookDataForm()){
            if(window.confirm('Czy dane są poprawne?') === true){
                axios.put(`http://localhost:5000/api/books/${bookId}`, bookData)
                .then((response) => {
                    alert(response.data);
                    window.location.reload();
                })
                .catch((error) => {
                    console.log('Error: '+ error);
                })
            }
        }
    }

    const handleFormReset = () => {
        const author = book.author.split(' '); 
        setBookData({
            title: book.title,
            authorName: author[0],
            authorSurname: author[1],
            isbn: book.isbn,
            description: book.description,
            price: book.price,
            amount: book.amount,
            publisher: book.publisher,
            pageAmount: book.pageAmount,
            publishYear: book.publishYear,
            genre: book.genre,
            bookPhotoUrl: book.imageURL,
            bookPhoto: null
        })
    }

    return(
        <Modal isOpen={isEditBookDataModalOpen} toggle={()=>{setIsEditBookDataModalOpen(!isEditBookDataModalOpen)}}>
        <ModalDialog>
            <ModalContent className="w-half">
                <ModalTitle>Edytuj dane książki</ModalTitle>
                <Form>
                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Tytuł</label>
                            <Input type="text" placeholder="Tytuł" name="title" value={bookData.title} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.title && <p className="error-message text-danger">{bookDataFormErrors.title}</p>}
                        </Col>
                        <Col>
                            <label className="required">Gatunek</label>
                            <Input type="text" placeholder="Gatunek" name="genre" value={bookData.genre} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.genre && <p className="error-message text-danger">{bookDataFormErrors.genre}</p>}
                        </Col>
                    </FormRow>
                    
                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Imie autora</label>
                            <Input type="text" placeholder="Imie" name="authorName" value={bookData.authorName} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.authorName && <p className="error-message text-danger">{bookDataFormErrors.authorName}</p>}
                        </Col>
                        <Col>
                            <label className="required">Nazwisko autora</label>
                            <Input type="text" placeholder="Nazwisko" name="authorSurname" value={bookData.authorSurname} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.authorSurname && <p className="error-message text-danger">{bookDataFormErrors.authorSurname}</p>}
                        </Col>
                        <Col>
                            <label className="required">ISBN</label>
                            <Input type="text" placeholder="ISBN" name="isbn" value={bookData.isbn} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.isbn && <p className="error-message text-danger">{bookDataFormErrors.isbn}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Wydawnictwo</label>
                            <Input type="text" placeholder="Wydawnictwo" name="publisher" value={bookData.publisher} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.publisher && <p className="error-message text-danger">{bookDataFormErrors.publisher}</p>}
                        </Col>
                        <Col>
                            <label className="required">Rok wydania</label>
                            <Input type="text" placeholder="Rok wydania" maxLength="4" name="publishYear" value={bookData.publishYear} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.publishYears && <p className="error-message text-danger">{bookDataFormErrors.publishYear}</p>}
                        </Col>
                        <Col>
                            <label className="required">Ilość stron</label>
                            <Input type="text" placeholder="Ilość stron" maxLength="3" name="pageAmount" value={bookData.pageAmount} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.pageAmount && <p className="error-message text-danger">{bookDataFormErrors.pageAmount}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Ilość</label>
                            <Input type="text" placeholder="Na stanie" maxLength="6" name="amount" value={bookData.amount} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.amount && <p className="error-message text-danger">{bookDataFormErrors.amount}</p>}
                        </Col>
                        <Col>
                            <label className="required">Cena</label>
                            <Input type="text" placeholder="Cena" name="price" value={bookData.price} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.price && <p className="error-message text-danger">{bookDataFormErrors.price}</p>}
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label>Okładka</label>
                            <Input type="file" accept="image/*" placeholder="Okładka" name="bookPhoto" onChange={handleImageChange}/>
                            {bookDataFormErrors.bookPhoto && <p className="error-message text-danger">{bookDataFormErrors.bookPhoto}</p>}
                        </Col>
                        <Col>
                            <label>Nazwa pliku</label>
                            <Input type="text" placeholder="Nazwa pliku" name="bookPhotoUrl" value={bookData.bookPhotoUrl} onChange={handleEditBookDataInputChange}/>
                            {bookDataFormErrors.bookPhotoUrl && <p className="error-message text-danger">{bookDataFormErrors.bookPhotoUrl}</p>}
                        </Col>
                    </FormRow>

                    <FormRow>
                        <Col>
                            <label>Opis</label>
                            {bookData.description === 'null' || bookData.description === "" ?
                            (
                                <TextArea placeholder="Opis książki" name="description" onChange={handleEditBookDataInputChange}></TextArea>
                            ) 
                            :
                            (
                                <TextArea placeholder="Opis książki" name="description" value={bookData.description} onChange={handleEditBookDataInputChange}></TextArea>
                            )};
                                {bookDataFormErrors.description && <p className="error-message text-danger">{bookDataFormErrors.description}</p>}

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