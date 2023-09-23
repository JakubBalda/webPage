import axios from 'axios';
import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import 'halfmoon/css/halfmoon.min.css';
import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useState, useEffect } from "react";
import FloatingButton from "../Components/FloatingButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

export default function UserOrdersPage({cookies, isContactModalOpen, setIsContactModalOpen, setCookie, removeCart}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userOrders, setUserOrders] = useState([]);
        
    useEffect(() => {
        const getUserOrders = async () => {
            try{
                const orders = await axios.get(`http://localhost:5002/api/orders/getOrders/${cookies.user.id}`);
                console.log(orders.data.orders);
                setUserOrders(orders.data.orders);
            }catch(error){
                console.log(error);
            }
        }

        getUserOrders();
    }, [])

    return(
        <div>
            <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
                <NavbarComponent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} cookies={cookies}/>
                <Sidebar cookies={cookies} setCookie={setCookie} removeCart={removeCart}/>

                <ContentWrapper className="d-flex flex-column align-items-center">
                    {userOrders.map((order) => (
                        <div className='card w-three-quarter d-flex justify-content-between' id={order.orderId}>
                            <div className='mt-10'><b>ID zamówienia:</b> {order.orderId}</div>
                            <div className='mt-10'><b>Wartość zamówienia:</b> {order.fullOrderPrice} zł</div>
                            <div className='mt-10'><b>Dostawa:</b> {order.deliveryOption}</div>
                            <div className='mt-10'><b>Płatność:</b> {order.paymentOption}</div>
                            <button className='btn btn-primary'>Szczegóły <FontAwesomeIcon icon={faAnglesRight}/></button>
                        </div>
                    ))}
                    <FloatingButton setIsContactModalOpen={setIsContactModalOpen} isContactModalOpen={isContactModalOpen}/>
                </ContentWrapper>
            </PageWrapper>
        </div>
    )
}