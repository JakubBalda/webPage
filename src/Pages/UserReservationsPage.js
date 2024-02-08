import axios from 'axios';
import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import 'halfmoon/css/halfmoon.min.css';
import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useState, useEffect } from "react";
import FloatingButton from "../Components/FloatingButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import UserReservationModal from '../Modals/UserReservationModal';
import OrderModal from '../Modals/OrderModal';
import ConfirmationOrderModal from '../Modals/ConfirmationOrderModal';

export default function UserReservationsPage({cookies, setCookie, isContactModalOpen, setIsContactModalOpen, removeCart}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserReservationModalOpen, setIsUserReservationModalOpen] = useState(false);
    const [userReservations, setUserReservations] = useState([]);
    const [userReservationDetails, setUserReservationDetails] = useState({});
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
        paymentOption: '',
        fullOrderPrice: 0.0
    })

    const handleModalSwitchToConfirm = () => {
        setCookie('cart', userReservationDetails.cart, {path: '/'});
        setIsOrderModalOpen(false);
        calculateFullOrderPrice()
        setTimeout(() => {
            setIsOrderConfirmationModalOpen(true);
        }, 400);
    }

    const handleModalSwitchToOrder = () => {
        removeCart('cart', {path: '/'});
        setIsUserReservationModalOpen(false);
        setIsOrderConfirmationModalOpen(false);
        setTimeout(() => {
            setIsOrderModalOpen(true);
        }, 400);
    }

    const calculateFullOrderPrice = () => {
        let orderPrice = 0.0;

        for(let book of userReservationDetails.cart){
            orderPrice = orderPrice + (book.amount * book.price);
        }

        if(orderData.deliveryOption === 'DHL' || orderData.deliveryOption === 'DPD'){
            orderPrice = orderPrice + 11.90;
        }

        setOrderData({
            ...orderData,
            fullOrderPrice: orderPrice.toFixed(2)
        });
    }

    const getReservationDetails = (reservation) => {
        setUserReservationDetails(reservation);
        setIsUserReservationModalOpen(true)
    }

    useEffect(() => {
        const getReservations = async () => {
            try{
                const reservations = await axios.get(`http://localhost:5002/api/orders/getReservations/${cookies.user?.id}`);
                console.log(reservations.data.reservations);
                setUserReservations(reservations.data.reservations);
            }catch(err){
                console.log(err);
            }
            
        }
        
        getReservations();
    }, [])

    return(
        <div>
            <UserReservationModal isUserReservationModalOpen={isUserReservationModalOpen} setIsUserReservationModalOpen={setIsUserReservationModalOpen} userReservationDetails={userReservationDetails} handleModalSwitchToOrder={handleModalSwitchToOrder}/>
            <OrderModal isOrderModalOpen={isOrderModalOpen} setIsOrderModalOpen={setIsOrderModalOpen} orderData={orderData} setOrderData={setOrderData} cookies={cookies} handleModalSwitchToConfirm={handleModalSwitchToConfirm}/>
            <ConfirmationOrderModal isOrderConfirmationModalOpen={isOrderConfirmationModalOpen} setIsOrderConfirmationModalOpen={setIsOrderConfirmationModalOpen} orderData={orderData} setOrderData={setOrderData} cookies={cookies} handleModalSwitchToOrder={handleModalSwitchToOrder} removeCart={removeCart} isFromReservation={true} reservationId={userReservationDetails.reservationId}/>

            <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
                <NavbarComponent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} cookies={cookies}/>
                <Sidebar cookies={cookies} setCookie={setCookie} removeCart={removeCart}/>

                <ContentWrapper>
                    {
                        
                        userReservations !== undefined && userReservations.length > 0
                    ?
                    (
                        <div className="d-flex flex-wrap flex-column align-items-center">
                            {userReservations.map((reservation) => (
                                <div className='card w-three-quarter d-flex justify-content-between' id={reservation.reservationId}>
                                    <div className='mt-10'><b>ID rezerwacji:</b> {reservation.reservationId}</div>
                                    <div className='mt-10'><b>Data rezerwacji:</b> {reservation.reservationDate}</div>
                                    <div className='mt-10'><b>Data wygaśnięcia:</b> {reservation.expirationDate}</div>
                                    <div className='mt-10'><b>Status:</b> {reservation.status}</div>
                                    <button className='btn btn-primary' onClick={()=>getReservationDetails(reservation)}>Szczegóły <FontAwesomeIcon icon={faAnglesRight}/></button>
                                </div>
                            ))}
                        </div>
                    )
                    :
                    (<h1>Brak rezerwacji</h1>)
                    }
                    
                    {isUserReservationModalOpen || isOrderConfirmationModalOpen || isOrderModalOpen
                    ?
                        (<div></div>)
                    :
                        (<FloatingButton setIsContactModalOpen={setIsContactModalOpen} isContactModalOpen={isContactModalOpen}/>)
                    }
                    
                </ContentWrapper>
            </PageWrapper>
        </div>
    )
}