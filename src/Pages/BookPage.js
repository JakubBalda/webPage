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
        e.stopPropagation(); // Stop event propagation to prevent undesired actions
        setFullSize(!fullSize); // Toggle the state to control the image size
      };

    return(
    <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
        <NavbarComponent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isInCorrectSite={isInCorrectSite}/>
        <Sidebar />
        <ContentWrapper className="bg-light">
            <div className="container-fluid">
                <div className="row h-400 border-bottom">
                    <div className="col-5 d-flex flex-column justify-content-center">
                            <img src={`data:image/jpeg;base64,${imageUrl}`} 
                            alt={book.imageUrl} 
                            className={`align-self-center ${fullSize ? 'full-size' : ''}`}
                            onClick={handleClick}
                            id="bookImage"></img>
                    </div>
                    <div className="col-7 border-left">
                        <div className="row h-full">
                            <div className="col-6 text-left pl-20">
                                <h1 className="pt-70 font-size-24 font-weight-bold">"{book.title}"</h1>
                                <div className="border rounded w-250 h-150 p-10 mt-20">
                                    <div className="font-size-14 mt-10">Autor: {book.author}</div>
                                    <div className="font-size-14 mt-10">Wydawnictwo: {book.publisher}</div>
                                    <div className="font-size-14 mt-10">Gatunek: {book.genre}</div>
                                    <a href="#" className="">Szczegółowe informacje {'>'}</a>
                                </div>
                            </div>
                            <div className="col-6">

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