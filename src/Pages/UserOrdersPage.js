import axios from 'axios';
import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import 'halfmoon/css/halfmoon.min.css';
import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useState, useEffect } from "react";
import FloatingButton from "../Components/FloatingButton";

export default function UserOrdersPage({cookies, isContactModalOpen, setIsContactModalOpen, setCookie}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return(
        <div>
            <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
                <NavbarComponent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} cookies={cookies}/>
                <Sidebar cookies={cookies} setCookie={setCookie}/>

                <ContentWrapper>

                    <FloatingButton setIsContactModalOpen={setIsContactModalOpen} isContactModalOpen={isContactModalOpen}/>
                </ContentWrapper>
            </PageWrapper>
        </div>
    )
}