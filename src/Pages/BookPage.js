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
import FloatingButton from "../Components/FloatingButton";

export default function BookPage({cookies, setCookie, handleFormSwitch, setIsLoginModalOpen, isLoginModalOpen, isRegisterModalOpen, setIsRegisterModalOpen, isContactModalOpen, setIsContactModalOpen, removeCart}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isEditBookDataModalOpen, setIsEditBookDataModalOpen] = useState(false);
    const [book, setBook] = useState([])
    const [imageUrl, setImageUrl] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);
    const [shouldScroll, setShouldScroll] = useState(false);
    const [averageBookRating, setAverageBookRating] = useState({
        averageRating: 0,
        rateCount: 0
    })

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

      useEffect(() =>{
        if(cookies.user.id !== undefined){
            try{
                axios.get(`http://localhost:5000/api/books/userRating/${cookies.user.id}/${id}`)
                    .then((response) => {
                        setRating(response.data.Rating);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }catch(err){
                console.log(err);
            }

            
        }
        
        try{
            axios.get(`http://localhost:5000/api/books/averageRating/${id}`)
                .then((response) => {
                    setAverageBookRating({
                        averageRating: response.data.averageRating,
                        rateCount: response.data.rateCount
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
        }catch(err){
            console.log(err);
        }
      }, [rating]);
      
      const handleTabSwitch = (index) => {
        setShouldScroll(true);
        setTabIndex(index);
      }

      const handleBookRate = (ratingValue) => {
        if(cookies.user.id === undefined){
            alert('Aby ocenić musisz być zalogowany!');
        }

        if(ratingValue !== rating){
            if(cookies.user.id !== undefined && rating === 0){
                axios.post('http://localhost:5000/api/books/setBookRating', [ratingValue, cookies.user.id, book.id])
                    .then((resposne) => {
                        console.log(resposne);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }else if (cookies.user.id !== undefined){
                axios.put('http://localhost:5000/api/books/updateBookRating', [ratingValue, cookies.user.id, book.id])
                    .then((resposne) => {
                        console.log(resposne);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
            setRating(ratingValue);
        }
      }

      const deleteCart = () => {
        console.log(cookies);
        removeCart('cart', { path: '/' });
      }

      const addToCart = () => {
        const currentCart = cookies.cart || [];
        console.log(currentCart);

        let bookInCart = currentCart.find((item) => item.bookId === id);
        console.log(currentCart);

        if (bookInCart) {
            let newBookAmount = parseInt(document.getElementById("bookAmount").value, 10)
            console.log(bookInCart.amount);
            if(bookInCart.amount + newBookAmount <= book.amount){
                bookInCart.amount = bookInCart.amount + newBookAmount;
            }else{
                alert('Nie możesz dodać więcej książek niż jest na stanie!');
            }

        } else {
          const newBookInCart = {
            bookId: id,
            title: book.title,
            amount: parseInt(document.getElementById("bookAmount").value, 10),
            price: book.price,
            maxBookAmount: book.amount
          };
          console.log(newBookInCart);
          currentCart.push(newBookInCart);
        }
        console.log(cookies);
        setCookie("cart", currentCart, {path: '/'});
      };

      useEffect(() => {
        const savedCart = cookies.cart;
        console.log(savedCart);
      }, [cookies]);

      useEffect(() => {
        removeCart('cart', { path: '/book' });
      }, [])


      if (loading) {
        return <div>Loading...</div>;
      }

    return(
        <div>
            <LoginModal isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} handleFormSwitch={handleFormSwitch} setCookie={setCookie} cookies={cookies}/>
            <RegisterModal isRegisterModalOpen={isRegisterModalOpen} setIsRegisterModalOpen={setIsRegisterModalOpen}/>
            <EditBookDataModal isEditBookDataModalOpen={isEditBookDataModalOpen} setIsEditBookDataModalOpen={setIsEditBookDataModalOpen} book={book} bookId={id}/>

            <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions >
                <NavbarComponent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isInCorrectSite={isInCorrectSite} cookies={cookies}/>
                <Sidebar cookies={cookies} setCookie={setCookie} setIsLoginModalOpen={setIsLoginModalOpen} setIsEditBookDataModalOpen={setIsEditBookDataModalOpen} bookId={id}/>
                <ContentWrapper className="bg-light">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-5 d-flex flex-column justify-content-center ">
                                <div className="card mt-50 align-self-center">
                                    <img src={`data:image/jpeg;base64,${imageUrl}`} 
                                    alt={book.imageUrl} 
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
                                                <span className="mt-5">{averageBookRating.averageRating}</span>
                                                <Rating
                                                    items={5}
                                                    style={{ maxWidth: 90, marginTop: 10, marginLeft: 15, }}
                                                    value={rating}
                                                    onChange={handleBookRate}
                                                />
                                                <div className="font-size-12 mt-5 ml-5">({averageBookRating.rateCount})</div>
                                                </div>
                                                <div className="font-size-22 font-weight-bold mt-auto mb-20">{book.price.toFixed(2)} zł</div>
                                                <div className="mx-auto form-inline">
                                                        <input type="number" className="w-50 form-control" id="bookAmount" defaultValue={1} max={book.amount} min={1} ></input>
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

                                                    {
                                                        cookies.user.id !== undefined
                                                        ?
                                                            (<button className="btn btn-primary align-self-center mb-auto" onClick={addToCart}>Dodaj do koszyka</button>)
                                                        :
                                                            (<button className="btn btn-primary align-self-center mb-auto" onClick={addToCart} disabled data-toggle='tooltip' data-title={'Zaloguj sie aby dodać do koszyka'} data-placement='bottom'>Dodaj do koszyka</button>)
                                                    }
                                                
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
                                        <p className="font-size-12 p-15">{book.description}</p>
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

                <FloatingButton setIsContactModalOpen={setIsContactModalOpen} isContactModalOpen={isContactModalOpen}/>
                </ContentWrapper>
            </PageWrapper>
    </div>

    )
}