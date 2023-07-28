import React from "react";
import { useState } from "react";
import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import axios from 'axios';
import 'halfmoon/css/halfmoon.min.css';
import { useLocation } from 'react-router-dom';

export default function UserPanel({setIsLoginModalOpen, cookies, setCookie}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const location = useLocation();
    const isInCorrectPage = location.pathname === '/';

    return(
    <div>
        <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
            <NavbarComponent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
            <Sidebar setIsLoginModalOpen={setIsLoginModalOpen} cookies={cookies} setCookie={setCookie}/>
            <ContentWrapper>
            
            </ContentWrapper>
        </PageWrapper>
    </div>
    )
}