import { useState, useEffect } from "react";
import 'halfmoon/css/halfmoon.min.css';
import axios from 'axios';
import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import Sidebar from "../Components/Sidebar";
import NavbarComponent from "../Components/Navbar";


export default function BookPage({bookID}){
    const [search, setSearch] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return(
    <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
        <NavbarComponent onSearchChange={setSearch} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
        <Sidebar />
        <ContentWrapper>

        </ContentWrapper>
    </PageWrapper>
    )
}