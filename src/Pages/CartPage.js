import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import FloatingButton from "../Components/FloatingButton";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";
import { useState, useEffect } from "react";

export default function CartPage({cookies, setCookie, isContactModalOpen, setIsContactModalOpen, setIsLoginModalOpen, isLoginModalOpen, setIsRegisterModalOpen, isRegisterModalOpen, handleFormSwitch, cart}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return(
        <div>
            <LoginModal isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} handleFormSwitch={handleFormSwitch} setCookie={setCookie} cookies={cookies}/>
            <RegisterModal isRegisterModalOpen={isRegisterModalOpen} setIsRegisterModalOpen={setIsRegisterModalOpen}/>

            <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
                <NavbarComponent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} cookies={cookies}/>
                <Sidebar setIsLoginModalOpen={setIsLoginModalOpen} cookies={cookies} setCookie={setCookie}/>
                <ContentWrapper>
                    <FloatingButton setIsContactModalOpen={setIsContactModalOpen} isContactModalOpen={isContactModalOpen}/>
                </ContentWrapper>
            </PageWrapper>
        </div>
    )
}