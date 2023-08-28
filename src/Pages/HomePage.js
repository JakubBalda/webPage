import React from "react";
import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import AllBooks from "../Components/AllBooks";
import SlideShow from "../Components/SlideShow";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";
import AddNewBookModal from "../Modals/AddNewBookModal";
import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import { useState } from "react"; 

export default function HomePage({cookies, setCookie, handleFormSwitch, isLoginModalOpen, setIsLoginModalOpen, isRegisterModalOpen, setIsRegisterModalOpen}){
    const [search, setSearch] = useState('');
    const [bookGenre, setBookGenre] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAddNewBookModalOpen, setIsNewBookModalOpen] = useState(false);

    return(
<div>
    <LoginModal isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} handleFormSwitch={handleFormSwitch} setCookie={setCookie} cookies={cookies}/>
    <RegisterModal isRegisterModalOpen={isRegisterModalOpen} setIsRegisterModalOpen={setIsRegisterModalOpen}/>
    <AddNewBookModal isAddNewBookModalOpen={isAddNewBookModalOpen} setIsNewBookModalOpen={setIsNewBookModalOpen}/>    

    <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
        <NavbarComponent onSearchChange={setSearch} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
        <Sidebar onGenreChange={setBookGenre} setIsLoginModalOpen={setIsLoginModalOpen} cookies={cookies} setCookie={setCookie} setIsNewBookModalOpen={setIsNewBookModalOpen}/>
        <ContentWrapper>
            <SlideShow />
            <AllBooks search={search} bookGenre={bookGenre} cookies={cookies}/>
        </ContentWrapper>
    </PageWrapper>
</div>
)
};
