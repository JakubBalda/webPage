import React from "react";
import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import AllBooks from "../Components/AllBooks";
import SlideShow from "../Components/SlideShow";
import { ContentWrapper, PageWrapper, Button, ModalContent, ModalDialog, ModalTitle, Modal, Form, FormGroup, Input, FormRow, Col } from "reacthalfmoon";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";

export default function HomePage(){
    const [search, setSearch] = useState('');
    const [bookGenre, setBookGenre] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const [loginData, setLoginData] = useState({
        login: '',
        password: ''
    });

    const [loginFormErrors, setLoginFormErrors] = useState({
        login: '',
        password: '',
        wrongData: ''
    });

    const location = useLocation();
    const isInCorrectSite = location.pathname === '/';

    const handleFormSwitch = () => {
        setIsLoginModalOpen(false);
        setTimeout(() => {
            setIsRegisterModalOpen(true);
        }, 400);
    }

    const handleInputChange = (e) => {
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

    const validateForm = () => {
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

        if(validateForm()){
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
<div>
    <Modal isOpen={isLoginModalOpen} toggle={()=>{setIsLoginModalOpen(!isLoginModalOpen)}}>
        <ModalDialog>
            <ModalContent>
                <ModalTitle>Zaloguj się</ModalTitle>
                <Form >
                    <FormGroup>
                        <label className="required">Login</label>
                        <Input type="text" placeholder="Login" name="login" value={loginData.login} onChange={handleInputChange}/>
                        {loginFormErrors.login && <p className="error-message text-danger">{loginFormErrors.login}</p>}
                    </FormGroup>
                    <FormGroup>
                        <label className="required">Hasło</label>
                        <Input type="password" placeholder="Hasło" name="password" value={loginData.password} onChange={handleInputChange} />
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

    <Modal isOpen={isRegisterModalOpen} toggle={()=>{setIsRegisterModalOpen(!isRegisterModalOpen)}}>
        <ModalDialog>
            <ModalContent className="w-half">
                <ModalTitle>Zarejestruj się</ModalTitle>
                <Form>
                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Login</label>
                            <Input type="text" placeholder="Login" />
                        </Col>
                        <Col>
                            <label className="required">Hasło</label>
                            <Input type="password" placeholder="Hasło" />
                        </Col>
                    </FormRow>
                    
                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Imie</label>
                            <Input type="text" placeholder="Imie" />
                        </Col>
                        <Col>
                            <label className="required">Nazwisko</label>
                            <Input type="text" placeholder="Nazwisko" />
                        </Col>
                        <Col>
                            <label className="required">Miejscowość</label>
                            <Input type="text" placeholder="Miejscowość" />
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Ulica</label>
                            <Input type="text" placeholder="Ulica" />
                        </Col>
                        <Col>
                            <label className="required">Nr domu</label>
                            <Input type="text" placeholder="Nr domu" maxlength="4"/>
                        </Col>
                        <Col>
                            <label>Nr mieszkania</label>
                            <Input type="text" placeholder="Nr mieszkania" maxlength="3"/>
                        </Col>
                    </FormRow>

                    <FormRow equalSpacing>
                        <Col>
                            <label className="required">Kod pocztowy</label>
                            <Input type="text" placeholder="xx-xxx" maxlength="6"/>
                        </Col>
                        <Col>
                            <label className="required">E-mail</label>
                            <Input type="text" placeholder="xyz@gmail.com" />
                        </Col>
                        <Col>
                            <label className="required">Nr telefonu</label>
                            <Input type="text" placeholder="Max 9 cyfr" maxlength="9"/>
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
        
    <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
        <NavbarComponent onSearchChange={setSearch} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isInCorrectSite={isInCorrectSite}/>
        <Sidebar onGenreChange={setBookGenre} setIsLoginModalOpen={setIsLoginModalOpen}/>
        <ContentWrapper>
            <SlideShow />
            <AllBooks search={search} bookGenre={bookGenre}/>
        </ContentWrapper>
    </PageWrapper>
</div>
)
};
