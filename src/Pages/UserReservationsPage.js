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

    useEffect(() => {
        const getReservations = async () => {
            try{
                const reservations = await axios.get(`http://localhost:5002/api/orders/getReservations/${cookies.user.id}`);
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
                                    <div className='mt-10'><b>Data rezerwacji:</b> {reservation.reservationDate} zł</div>
                                    <div className='mt-10'><b>Data wygaśnięcia:</b> {reservation.expirationDate}</div>
                                    <div className='mt-10'><b>Status:</b> {reservation.status}</div>
                                    <button className='btn btn-primary' onClick={()=>getReservationDetails(reservation.reservationId)}>Szczegóły <FontAwesomeIcon icon={faAnglesRight}/></button>
                                </div>
                            ))}
                        </div>
                    )
                    :
                    (<h1>Brak rezerwacji</h1>)
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