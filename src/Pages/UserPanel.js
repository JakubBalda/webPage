import React from "react";
import { useState, useEffect } from "react";
import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import axios from 'axios';
import 'halfmoon/css/halfmoon.min.css';
import EditUserDataModal from "../Modals/EditUserDataModal";
import EditUserPasswordModal from "../Modals/EditUserPasswordModal";

export default function UserPanel({setIsLoginModalOpen, cookies, setCookie}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userProfileData, setUserProfileData] = useState([]);
    const [isEditUserDataModalOpen, setIsEditUserDataModalOpen] = useState(false);
    const [isEditUserPasswordModalOpen, setIsEditUserPasswordModalOpen] = useState(false);


    useEffect(() => {
        const getUserData = async () => {
            try{
                const res = await axios.get(`http://localhost:5001/api/users/${cookies.user.id}`);
                setUserProfileData(res.data);
            }catch(err){
                console.log(err)
            }
        }
        getUserData();
    }, []);
    const editUserDataModal = userProfileData && (
        <EditUserDataModal
            isEditUserDataModalOpen={isEditUserDataModalOpen}
            setIsEditUserDataModalOpen={setIsEditUserDataModalOpen}
            userProfileData={userProfileData}
            cookies={cookies}
        />
    );

    return(
    <div>
        {editUserDataModal}
        <EditUserPasswordModal isEditUserPasswordModalOpen={isEditUserPasswordModalOpen} setIsEditUserPasswordModalOpen={setIsEditUserPasswordModalOpen} />

        <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
            <NavbarComponent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
            <Sidebar setIsLoginModalOpen={setIsLoginModalOpen} cookies={cookies} setCookie={setCookie}/>
            <ContentWrapper>
                <div className="d-flex">
                    <div className="card w-quarter d-flex flex-column h-three-quarter">
                        <h1 className="font-size-24">Mój profil</h1>
                            <div className="d-flex flex-column">
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
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-primary mt-15" onClick={() => setIsEditUserDataModalOpen(true)}>Edytuj dane</button>
                                    <button className="btn btn-primary mt-15" onClick={() => setIsEditUserPasswordModalOpen(true)}>Edytuj hasło</button>
                                </div>
                            </div>
                    </div>
                    <div className="d-flex flex-column h-half w-three-quarter">
                        <div className="card h-half mt-70">
                            <h1 className="font-size-24">Moje zamówienia</h1>
                        </div>
                        <div className="card h-half">
                            <h1 className="font-size-24">Moje rezerwacje</h1>
                        </div>
                    </div>
                </div>  
                
            </ContentWrapper>
        </PageWrapper>
    </div>
    )
}