import { useState, useEffect } from "react";
import React from "react";
import 'halfmoon/css/halfmoon.min.css';
import axios from 'axios';
import { ContentWrapper, PageWrapper, Badge} from "reacthalfmoon";
import Sidebar from "../Components/Sidebar";
import NavbarComponent from "../Components/Navbar";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";
import { useLocation, useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import EditBookDataModal from "../Modals/EditBookDataModal";

export default function BookPage({cookies, setCookie, handleFormSwitch, setIsLoginModalOpen, isLoginModalOpen, isRegisterModalOpen, setIsRegisterModalOpen}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditBookDataModalOpen, setIsEditBookDataModalOpen] = useState(false);
    const [book, setBook] = useState([])
    const [imageUrl, setImageUrl] = useState('');
    const [fullSize, setFullSize] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);
    const [shouldScroll, setShouldScroll] = useState(false);

    const location = useLocation();
    const isInCorrectSite = location.pathname === '/';
    const { id } = useParams();

    useEffect(() => {
        const getBookById = async () => {
          try {
            await new Promise((resolve) => setTimeout(resolve, 100));

            const res = await axios.get(`http://localhost:5000/api/books/${id}`);
            setBook(res.data);
            setImageUrl(btoa(String.fromCharCode(...new Uint8Array(res.data.imageBlob.data))));
            setLoading(false);
          } catch (err) {
            console.log(err);
            setLoading(false);
          }
        };
    
        getBookById();
      }, [id]);

      useEffect(() => {
        if(shouldScroll){
            const element = document.getElementById('details');

            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setShouldScroll(false);
            }
        }
      }, [shouldScroll]);

      const handleClick = (e) => {
        e.stopPropagation();
        setFullSize(!fullSize); 
      };
      
      const handleTabSwitch = (index) => {
        setShouldScroll(true);
        setTabIndex(index);
      }

      if (loading) {
        return <div>Loading...</div>;
      }

    return(
        <div>
            <LoginModal isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} handleFormSwitch={handleFormSwitch} setCookie={setCookie} cookies={cookies}/>
            <RegisterModal isRegisterModalOpen={isRegisterModalOpen} setIsRegisterModalOpen={setIsRegisterModalOpen}/>
            <EditBookDataModal isEditBookDataModalOpen={isEditBookDataModalOpen} setIsEditBookDataModalOpen={setIsEditBookDataModalOpen} book={book} bookId={id}/>

            <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions >
                <NavbarComponent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isInCorrectSite={isInCorrectSite}/>
                <Sidebar cookies={cookies} setCookie={setCookie} setIsLoginModalOpen={setIsLoginModalOpen} setIsEditBookDataModalOpen={setIsEditBookDataModalOpen} bookId={id}/>
                <ContentWrapper className="bg-light">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-5 d-flex flex-column justify-content-center ">
                                <div className="card mt-50 align-self-center">
                                    <img src={`data:image/jpeg;base64,${imageUrl}`} 
                                    alt={book.imageUrl} 
                                    className={`align-self-center ${fullSize ? 'full-size' : ''}`}
                                    onClick={handleClick}
                                    id="bookImage"></img>
                                </div>
                            </div>
                            <div className="col-7 ">
                                <div className="row h-full">
                                    <div className="card h-fit-content w-full mt-55 d-flex">
                                        <div className="col-6 text-left px-15">
                                            <h1 className="pt-10 font-size-18 font-weight-bold">"{book.title}"</h1>
                                            <div className=" p-5 mt-20 mb-20">
                                                <div className="font-size-14 mt-10"><b>Autor:</b> {book.author}</div>
                                                <div className="font-size-14 mt-10"><b>Wydawnictwo:</b> {book.publisher}</div>
                                                <div className="font-size-14 mt-10 mb-10"><b>Gatunek:</b> {book.genre}</div>
                                            </div>
                                            <a className="cursor-pointer" onClick={() => handleTabSwitch(1)} >Szczegółowe informacje {'>'}</a>
                                        </div>

                                        <div className="col-6">
                                            <div className="border rounded min-h-250 d-flex flex-column justify-content-center">
                                                <div className="d-flex font-size-20 p-5">
                                                <Rating
                                                    items={1}
                                                    style={{ maxWidth: 30 }}
                                                    value={1}
                                                    readOnly
                                                />
                                                <span className="mt-5">5</span>
                                                <Rating
                                                    items={5}
                                                    style={{ maxWidth: 90, marginTop: 10, marginLeft: 15, }}
                                                    value={0}
                                                />
                                                </div>
                                                <div className="font-size-22 font-weight-bold mt-auto mb-20">{book.price.toFixed(2)} zł</div>
                                                <div className="mx-auto form-inline">
                                                        <input type="number" className="w-50 form-control" id="bookAmount" max={book.amount} min={1} ></input>
                                                        <label className="ml-10" htmlFor="bookAmount">z {book.amount}</label>
                                                </div>
                                                    {
                                                        book.amount >= 1 
                                                        ? <div>{book.amount > 1 
                                                                ? <Badge color="success" className="mt-15 mb-5">Produkt dostępny</Badge> 
                                                                : <Badge color="secondary" className="mt-15 mb-5">Ostatnia sztuka</Badge>}
                                                            </div> 
                                                        : <Badge color="danger" className="my-15 mb-5">Produkt niedostępny</Badge>
                                                    }
                                                <button className="btn btn-primary align-self-center mb-auto">Dodaj do koszyka</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <div className="card min-h-600 w-600" id="details">
                                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                                    <TabList>
                                        <Tab>Opis</Tab>
                                        <Tab>Dane szczegółowe</Tab>
                                        <Tab>Podcast</Tab>
                                    </TabList>
                                    <TabPanel>
                                        <p>{book.description}</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <h1 >Dane szczegółowe</h1>
                                        <ul className="mt-50 font-size-14 list-style-none">
                                            <li className=" w-200 mx-auto mt-15"><b>Tytuł:</b> {book.title}</li>
                                            <li className=" w-200 mx-auto mt-15"><b>Autor:</b> {book.author}</li>
                                            <li className=" w-200 mx-auto mt-15"><b>Wydawnictwo:</b> {book.publisher}</li>
                                            <li className=" w-200 mx-auto mt-15"><b>ID książki:</b> {book.id}</li>
                                            <li className=" w-200 mx-auto mt-15"><b>Rok wydania:</b> {book.publishYear}</li>
                                            <li className=" w-200 mx-auto mt-15"><b>Gatunek literacki:</b> {book.genre}</li>
                                            <li className=" w-200 mx-auto mt-15"><b>Ilość stron:</b> {book.pageAmount}</li>
                                            <li className=" w-200 mx-auto mt-15"><b>ISBN:</b> {book.isbn}</li>
                                        </ul>
                                    </TabPanel>
                                    <TabPanel>

                                    </TabPanel>
                                </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
            </PageWrapper>
    </div>

    )
}