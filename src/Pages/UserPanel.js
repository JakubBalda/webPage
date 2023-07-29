import React from "react";
import { useState, useEffect } from "react";
import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import axios from 'axios';
import 'halfmoon/css/halfmoon.min.css';

export default function UserPanel({setIsLoginModalOpen, cookies, setCookie}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userProfileData, setUserProfileData] = useState([]);

    useEffect(() => {
        const getUserData = async () => {
            try{
                const res = await axios.get(`http://localhost:5001/api/users/${cookies.user.id}`);
                console.log(res.data);
                setUserProfileData(res.data);
            }catch(err){
                console.log(err)
            }
        }
        getUserData();
    }, [])
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