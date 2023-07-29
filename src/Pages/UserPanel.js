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
    const [isDataInEditionMode, setIsDataInEditionMode] = useState(false);

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
                <div className="card w-quarter d-flex flex-column">
                <h1 className="font-size-24">Mój profil</h1>

                    {isDataInEditionMode?
                        (
                        <div>
                            <div className="text-left">
                                <div className="font-size-12">Imie: <b>{userProfileData.name}</b></div>
                                <div className="font-size-12">Nazwisko: <b>{userProfileData.surname}</b></div>
                                <div className="font-size-12">E-mail: <b>{userProfileData.mail}</b></div>
                                <div className="font-size-12">Login: <b>{userProfileData.login}</b></div>
                                <div className="font-size-12">Miejscowość: <b>{userProfileData.city}</b></div>
                                <div className="font-size-12">Ulica: <b>{userProfileData.street}</b></div>
                                <div className="font-size-12">Nr domu: <b>{userProfileData.houseNumber}</b></div>
                                <div className="font-size-12">Nr mieszkania: <b>{userProfileData.flatNumber}</b></div>
                                <div className="font-size-12">Kod pocztowy: <b>{userProfileData.postalCode}</b></div>
                                <div className="font-size-12">Nr telefonu: <b>{userProfileData.phoneNumber}</b></div>
                            </div>
                            <button className="btn btn-secondary mt-15 w-half" onClick={() => setIsDataInEditionMode(false)}>Zapisz</button>
                        </div>   
                        )
                        :
                        (
                            <div>
                                <div className="text-left">
                                    <div className="font-size-12">Imie: <b>{userProfileData.name}</b></div>
                                    <div className="font-size-12">Nazwisko: <b>{userProfileData.surname}</b></div>
                                    <div className="font-size-12">E-mail: <b>{userProfileData.mail}</b></div>
                                    <div className="font-size-12">Login: <b>{userProfileData.login}</b></div>
                                    <div className="font-size-12">Miejscowość: <b>{userProfileData.city}</b></div>
                                    <div className="font-size-12">Ulica: <b>{userProfileData.street}</b></div>
                                    <div className="font-size-12">Nr domu: <b>{userProfileData.houseNumber}</b></div>
                                    <div className="font-size-12">Nr mieszkania: <b>{userProfileData.flatNumber}</b></div>
                                    <div className="font-size-12">Kod pocztowy: <b>{userProfileData.postalCode}</b></div>
                                    <div className="font-size-12">Nr telefonu: <b>{userProfileData.phoneNumber}</b></div>
                                </div>
                                <button className="btn btn-primary mt-15 w-half" onClick={() => setIsDataInEditionMode(true)}>Edytuj dane</button>
                            </div>
                        )
                    }
            </div>  
                
            </ContentWrapper>
        </PageWrapper>
    </div>
    )
}