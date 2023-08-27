import React from "react";
import { useState, useEffect } from "react";
import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import axios from 'axios';
import 'halfmoon/css/halfmoon.min.css';
import EditUserDataModal from "../Modals/EditUserDataModal";
import EditUserPasswordModal from "../Modals/EditUserPasswordModal";
import { type } from "@testing-library/user-event/dist/type";

export default function UserPanel({setIsLoginModalOpen, cookies, setCookie}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userProfileData, setUserProfileData] = useState([]);
    const [isEditUserDataModalOpen, setIsEditUserDataModalOpen] = useState(false);
    const [isEditUserPasswordModalOpen, setIsEditUserPasswordModalOpen] = useState(false);
    const [authors, setAuthors] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [searchAuthor, setSearchAuthor] = useState('');
    const [favouriteAuthors, setFavouriteAuthors] = useState([]);


    useEffect(() => {
        const getUserData = async () => {
            try{
                const res = await axios.get(`http://localhost:5001/api/users/${cookies.user.id}`);
                setUserProfileData(res.data);
            }catch(err){
                console.log(err)
            }
        }

        const getAuthors = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/authors/allAuthors`);
                setAuthors(res.data.authors);
            }catch(err){
                console.log(err)
            }
        }
        getUserData();
        getAuthors();
    }, []);

    const handleAuthorSelection = (event) => {
        const authorId = Number(event.target.value);

        if (event.target.checked) {
          setSelectedAuthors((prevAuthors) => [...prevAuthors, authorId]);
        } else {
          setSelectedAuthors((prevAuthors) =>
            prevAuthors.filter((selectedAuthor) => selectedAuthor !== authorId)
          );
        }
      };

      const handeSaveFavouriteAuthors = () =>{
        console.log(selectedAuthors);

        axios.post('http://localhost:5001/api/users/favouriteAuthors', [cookies.user.id, selectedAuthors])
            .then((response) => {
                if(response.data === 'Added' || response.data === 'Updated'){
                    alert('Zmiany zostały zapisane');
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log('Error: '+ error);
            })

      }

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
        <EditUserPasswordModal isEditUserPasswordModalOpen={isEditUserPasswordModalOpen} setIsEditUserPasswordModalOpen={setIsEditUserPasswordModalOpen} cookies={cookies}/>

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
                                <div className="d-flex justify-content-between flex-wrap">
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
                <div className="mt-20 border">
                        <h1 className="mt-10">Moje preferencje</h1>
                        <div className="d-flex flex-wrap">
                            <div className="w-half">
                                <h3>Ulubieni autorzy</h3>
                                <form className='form-inline d-flex justify-content-center mt-10'>
                                    <input type='text' className='form-control' placeholder='Wyszukaj autora' onChange={(e) => setSearchAuthor(e.target.value)}></input>
                                </form>
                                <div>
                                    <div className='overflow-scroll h-150 mt-15'>
                                    {authors.filter((author) => {
                                        let authorData = author.name + ' ' + author.surname;
                                        return authorData.toLowerCase() === '' || authorData.toLowerCase().includes(searchAuthor);
                                    })
                                    .map((author) => (
                                    <div key={author.id} className='form-check'>
                                        <input
                                        type='checkbox'
                                        id={author.id}
                                        value={author.id}
                                        checked={selectedAuthors.includes(author.id)}
                                        onChange={handleAuthorSelection}
                                        className='form-check-input ml-5'
                                        />
                                        <label htmlFor={author.id} className='form-check-label ml-5'>
                                            {author.name + ' ' + author.surname}
                                        </label>
                                    </div>
                                    ))}
                                    </div>
                                </div>
                                <button className="btn btn-primary" onClick={handeSaveFavouriteAuthors}>Zapisz</button>
                            </div>
                            <div className="w-half">
                                <h3>Ulubione gatunki</h3>
                            </div>
                        </div>
                </div>  
                
            </ContentWrapper>
        </PageWrapper>
    </div>
    )
}