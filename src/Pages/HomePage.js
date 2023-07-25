import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import AllBooks from "../Components/AllBooks";
import SlideShow from "../Components/SlideShow";
import { ContentWrapper, PageWrapper, Button, ModalContent, ModalDialog, ModalTitle, Modal, Form, FormGroup, Input } from "reacthalfmoon";
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
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5001/api/users/login', loginData)
            .then((response) => {
                // Handle the API response here, e.g., show success message or redirect the user
                console.log('Login successful!', response.data);
            })
            .catch((error) => {
                // Handle errors here, e.g., show error message
                console.error('Login failed!', error);
            });
    };

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
                    </FormGroup>
                    <FormGroup>
                        <label className="required">Hasło</label>
                        <Input type="password" placeholder="Hasło" name="password" value={loginData.password} onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
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
            <ModalContent>
                <ModalTitle>Zarejestruj się</ModalTitle>
                <Form>
                    <FormGroup>
                        <label className="required">Login</label>
                        <Input type="text" placeholder="Login" />
                    </FormGroup>
                    <FormGroup>
                        <label className="required">Hasło</label>
                        <Input type="password" placeholder="Hasło" />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" block type="submit">Zarejestruj</Button>
                    </FormGroup>
                </Form>
                <Button block color="danger" onClick={()=>{setIsRegisterModalOpen(false)}}>Anuluj</Button>
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
