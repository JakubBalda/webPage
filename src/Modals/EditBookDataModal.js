import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, ModalContent, ModalDialog, ModalTitle, Modal, Form, Input, FormRow, Col, TextArea  } from "reacthalfmoon";
import validator from 'validator';

export default function EditBookDataModal({isEditBookDataModalOpen, setIsEditBookDataModalOpen, book}){

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
    })

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
                genre: book.genre
            });

            console.log(bookData);
        }

    }, [book]);

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
    }

    const handleEditBookDataSubmit = () => {

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

                    <FormRow>
                        <Col>
                            <label>Opis</label>
                            <TextArea placeholder="Opis książki" name="description" value={bookData.description} onChange={handleEditBookDataInputChange}></TextArea>
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