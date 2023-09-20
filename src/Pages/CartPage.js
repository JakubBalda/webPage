import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import FloatingButton from "../Components/FloatingButton";
import { useState, useEffect } from "react";
import 'halfmoon/css/halfmoon.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import OrderModal from "../Modals/OrderModal";
import ConfirmationOrderModal from "../Modals/ConfirmationOrderModal";

export default function CartPage({cookies, setCookie, isContactModalOpen, setIsContactModalOpen, setIsLoginModalOpen, removeCart}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isOrderConfirmationModalOpen, setIsOrderConfirmationModalOpen] = useState(false);

    const [orderData, setOrderData] = useState({
        name: '',
        surname: '',
        city: '',
        street: '',
        houseNumber: '',
        flatNumber: '',
        postal: '',
        mail: '',
        phoneNumber: '',
        deliveryOption: '',
        paymentOption: ''
    })

    const handleModalSwitchToConfirm = () => {
        setIsOrderModalOpen(false);
        setTimeout(() => {
            setIsOrderConfirmationModalOpen(true);
        }, 400);
    }

    const handleModalSwitchToOrder = () => {
        setIsOrderConfirmationModalOpen(false);
        setTimeout(() => {
            setIsOrderModalOpen(true);
        }, 400);
    }

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
        if(window.confirm("Usunąć książkę z koszyka?") === true){
            const currentCart = cookies.cart;

            if(currentCart.length > 1){
                let bookInCartIndex = currentCart.findIndex((item) => item.bookId === bookId);

                if (bookInCartIndex !== -1) {
                    currentCart.splice(bookInCartIndex, 1);
                    setCookie('cart', currentCart, { path: '/' });
                }
            }else{
                removeCart('cart', {path: '/'})
            }
        }
    }

    const handleCartDelete = () => {
        if(window.confirm("Wyczyścić cały koszyk?") === true){
            removeCart('cart', {path: '/'});
        }
    }

    return(
        <div>
            <OrderModal isOrderModalOpen={isOrderModalOpen} setIsOrderModalOpen={setIsOrderModalOpen} orderData={orderData} setOrderData={setOrderData} cookies={cookies} handleModalSwitchToConfirm={handleModalSwitchToConfirm}/>
            <ConfirmationOrderModal isOrderConfirmationModalOpen={isOrderConfirmationModalOpen} setIsOrderConfirmationModalOpen={setIsOrderConfirmationModalOpen} orderData={orderData} setOrderData={setOrderData} cookies={cookies} handleModalSwitchToOrder={handleModalSwitchToOrder}/>

            <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
                <NavbarComponent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} cookies={cookies}/>
                <Sidebar setIsLoginModalOpen={setIsLoginModalOpen} cookies={cookies} setCookie={setCookie} removeCart={removeCart}/>
                <ContentWrapper>
                    {cookies.cart === undefined
                    ?
                    (<h1>Koszyk pusty</h1>)
                    :
                    (<div className="d-flex flex-column align-items-center">
                        <div className="d-flex w-full px-10 justify-content-between">
                            <div className="w-half text-right">
                                <h1 className="mt-10">Twój koszyk</h1>
                            </div>
                            
                            <div className="dropdown dropleft  mt-15 with-arrow">
                                <button className="btn btn-primary border rounded-circle" data-toggle="dropdown" type="button" id="dropdown-toggle-btn-1" aria-haspopup="true" aria-expanded="false">
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                                <ul className="dropdown-menu">
                                    <div><button className="btn btn-danger w-full my-5" onClick={handleCartDelete}>Wyczyść</button></div>
                                    <div><button className="btn btn-primary w-full my-5">Zarezerwuj</button></div>
                                    <div><button className="btn btn-primary w-full my-5" onClick={()=>{setIsOrderModalOpen(true)}}>Zamów</button></div>
                                </ul>
                            </div>
                        </div>
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
                                                <button className="btn btn-danger px-10 border rounded-circle" onClick={() => {handleRemoveFromCart(book.bookId)}}><FontAwesomeIcon icon={faTrash} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>)
                    }
                    {
                        isOrderConfirmationModalOpen || isOrderModalOpen
                        ?
                        (<span></span>)
                        :
                        (<FloatingButton setIsContactModalOpen={setIsContactModalOpen} isContactModalOpen={isContactModalOpen}/>)
                    }
                </ContentWrapper>
            </PageWrapper>
        </div>
    )
}