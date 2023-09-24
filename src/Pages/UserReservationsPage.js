import axios from 'axios';
import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import 'halfmoon/css/halfmoon.min.css';
import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useState, useEffect } from "react";
import FloatingButton from "../Components/FloatingButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

export default function UserReservationsPage({cookies, setCookie, isContactModalOpen, setIsContactModalOpen, removeCart}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserReservationModalOpen, setIsUserReservationModalOpen] = useState(false);
    const [userReservations, setUserReservations] = useState([]);

    const getReservationDetails = async () => {
        
    }

    return(
        <div>
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
                                <div className='card w-three-quarter d-flex justify-content-between' id={reservation.orderId}>
                                    <div className='mt-10'><b>ID zamówienia:</b> {reservation.orderId}</div>
                                    <div className='mt-10'><b>Wartość zamówienia:</b> {reservation.fullOrderPrice} zł</div>
                                    <div className='mt-10'><b>Dostawa:</b> {reservation.deliveryOption}</div>
                                    <div className='mt-10'><b>Płatność:</b> {reservation.paymentOption}</div>
                                    <button className='btn btn-primary' onClick={()=>getReservationDetails(reservation.orderId)}>Szczegóły <FontAwesomeIcon icon={faAnglesRight}/></button>
                                </div>
                            ))}
                        </div>
                    )
                    :
                    (<h1>Brak zamówień</h1>)
                    }
                    
                    {isUserReservationModalOpen
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