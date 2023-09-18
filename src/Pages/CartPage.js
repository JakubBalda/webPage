import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import FloatingButton from "../Components/FloatingButton";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";
import { useState, useEffect } from "react";
import 'halfmoon/css/halfmoon.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function CartPage({cookies, setCookie, isContactModalOpen, setIsContactModalOpen, setIsLoginModalOpen, isLoginModalOpen, setIsRegisterModalOpen, isRegisterModalOpen, handleFormSwitch, removeCart}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleAmountChange = (bookId) => {
        let newAmount = document.getElementById(bookId).value;
        const currentCart = cookies.cart;
        let bookInCart = currentCart.find((item) => item.bookId === bookId);

        if(newAmount === '' || (newAmount <= bookInCart.maxBookAmount && newAmount > 0)){
            bookInCart.amount = newAmount;
        }else if (newAmount <= 0){
            alert("Ilość musi być większa od 0");
            document.getElementById(bookId).value = 1;
            bookInCart.amount = 1;
        }
        else{
            alert("Maksymalna ilość na stanie to: " + bookInCart.maxBookAmount);
            document.getElementById(bookId).value = 1;
            bookInCart.amount = 1;
        }
        setCookie('cart', currentCart, {path: '/'});

    }

    useEffect(() => {
        console.log(cookies.cart);
    }, [cookies])

    const handleRemoveFromCart = (bookId) => {
        const currentCart = cookies.cart;

        if(currentCart.length > 1){
            let bookInCartIndex = currentCart.findIndex((item) => item.bookId === bookId);
            delete currentCart[bookInCartIndex];
    
            setCookie('cart', currentCart, {path: '/'});
        }else{
            removeCart('cart', {path: '/'})
        }
       
    }

    return(
        <div>
            <LoginModal isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} handleFormSwitch={handleFormSwitch} setCookie={setCookie} cookies={cookies}/>
            <RegisterModal isRegisterModalOpen={isRegisterModalOpen} setIsRegisterModalOpen={setIsRegisterModalOpen}/>

            <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
                <NavbarComponent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} cookies={cookies}/>
                <Sidebar setIsLoginModalOpen={setIsLoginModalOpen} cookies={cookies} setCookie={setCookie}/>
                <ContentWrapper>
                    {cookies.cart === undefined
                    ?
                    (<h1>Koszyk pusty</h1>)
                    :
                    (<div className="d-flex flex-column align-items-center">
                        {cookies.cart.map((book, key)=> {
                            return(
                                <div className="card w-three-quarter d-flex flex-wrap" key={book.bookId}>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-3 pt-5">
                                                <h3>{book.title}</h3>
                                                </div>
                                                <div className="col-2 pt-5">{book.price} zł</div>
                                            <div className="col-3 d-flex justify-content-center">
                                                <input type="number" defaultValue={book.amount} id={book.bookId} className="form-control w-150" onChange={() => {handleAmountChange(book.bookId)}} min={1} max={book.maxBookAmount}/>
                                            </div>
                                            <div className="col-2 pt-5">{parseFloat(book.price * book.amount).toFixed(2)} zł</div>
                                            <div className="col-2 text-right">
                                                <button className="btn btn-danger" onClick={() => {handleRemoveFromCart(book.bookId)}}><FontAwesomeIcon icon={faTrash} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>)
                    }
                    <FloatingButton setIsContactModalOpen={setIsContactModalOpen} isContactModalOpen={isContactModalOpen}/>
                </ContentWrapper>
            </PageWrapper>
        </div>
    )
}