import { useState, useEffect } from "react";
import 'halfmoon/css/halfmoon.min.css';
import axios from 'axios';
import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import Sidebar from "../Components/Sidebar";
import NavbarComponent from "../Components/Navbar";
import { useLocation, useParams } from 'react-router-dom';


export default function BookPage(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [book, setBook] = useState([])
    const [imageUrl, setImageUrl] = useState('');
    const [fullSize, setFullSize] = useState(false);

    const location = useLocation();
    const isInCorrectSite = location.pathname === '/';
    const { id } = useParams();

    useEffect(() => {
        const getBookById = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/api/books/${id}`);
            setBook(res.data);
            setImageUrl(btoa(String.fromCharCode(...new Uint8Array(res.data.imageBlob.data))));
          } catch (err) {
            console.log(err);
          }
        };
    
        getBookById();
      }, []);

      const handleClick = (e) => {
        e.stopPropagation();
        setFullSize(!fullSize); 
      };

    return(
    <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
        <NavbarComponent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isInCorrectSite={isInCorrectSite}/>
        <Sidebar />
        <ContentWrapper className="bg-light">
            <div className="container-fluid">
                <div className="row h-400 border-bottom">
                    <div className="col-5 d-flex flex-column justify-content-center">
                        <div className="card h-445 w-300 align-self-center">
                            <img src={`data:image/jpeg;base64,${imageUrl}`} 
                            alt={book.imageUrl} 
                            className={`align-self-center ${fullSize ? 'full-size' : ''}`}
                            onClick={handleClick}
                            id="bookImage"></img>
                        </div>
                    </div>
                    <div className="col-7 border-left">
                        <div className="row h-full">
                            <div className="card h-445 w-full mt-55 d-flex">
                                <div className="col-6 text-left pl-20">
                                    <h1 className="pt-20 font-size-24 font-weight-bold mt-15">"{book.title}"</h1>
                                    <div className="border rounded w-200 h-100 p-10 mt-20 mb-10">
                                        <div className="font-size-14 mt-10">Autor: {book.author}</div>
                                        <div className="font-size-14 mt-10">Wydawnictwo: {book.publisher}</div>
                                        <div className="font-size-14 mt-10">Gatunek: {book.genre}</div>
                                    </div>
                                    <a href="#" className="ml-5">Szczegółowe informacje {'>'}</a>
                                </div>

                                <div className="col-6">
                                    <div className="border rounded h-250 d-flex flex-column justify-content-center">
                                        <div className="font-size-22 font-weight-bold mt-auto mb-20">{book.price} zł</div>
                                        <div className="mx-auto form-inline">
                                                <input type="number" className="w-50 form-control" id="bookAmount" max={book.amount} min={1}></input>
                                                <label className="ml-10" htmlFor="bookAmount">z {book.amount}</label>
                                        </div>
                                            {
                                                book.amount >= 1 
                                                ? <div>{book.amount > 1 
                                                        ? <div className="text-success">Produkt dostępny</div> 
                                                        : <div className="text-secondary">Ostatnia sztuka</div>}
                                                    </div> 
                                                : <div className="text-danger">Produkt niedostępny</div>
                                            }
                                        <button className="btn btn-primary w-150 align-self-center mb-auto">Dodaj do koszyka</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">

                    </div>
                </div>
            </div>
        </ContentWrapper>
    </PageWrapper>
    )
}