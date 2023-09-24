import axios from 'axios';
import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import 'halfmoon/css/halfmoon.min.css';
import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { useState, useEffect } from "react";
import FloatingButton from "../Components/FloatingButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import UserOrderModal from '../Modals/UserOrderModal';

export default function UserOrdersPage({cookies, isContactModalOpen, setIsContactModalOpen, setCookie, removeCart}){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserOrderModalOpen, setIsUserOrderModalOpen] = useState(false);
    const [userOrders, setUserOrders] = useState([]);
    const [userOrderData, setUserOrderData] = useState({
        orderId: Number,
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
        fullOrderPrice: '',
        cart: [],
        status: '',
        orderDate: ''
    })
        
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

    const getOrderDetails = async (orderId) => {
        try{
            const orderDetails = await axios.get(`http://localhost:5002/api/orders/getOrderDetails/${orderId}`);
            console.log(orderDetails.data);
            if(orderDetails !== undefined){
                setUserOrderData({
                    orderId: orderDetails.data.orderId,
                    name: orderDetails.data.name,
                    surname: orderDetails.data.surname,
                    city: orderDetails.data.city,
                    street: orderDetails.data.street,
                    houseNumber: orderDetails.data.houseNumber,
                    flatNumber: orderDetails.data.flatNumber,
                    postal: orderDetails.data.postal,
                    mail: orderDetails.data.mail,
                    phoneNumber: orderDetails.data.phoneNumber,
                    deliveryOption: orderDetails.data.deliveryOption,
                    paymentOption: orderDetails.data.paymentOption,
                    fullOrderPrice: orderDetails.data.fullOrderPrice,
                    cart: JSON.parse(orderDetails.data.cart),
                    status: orderDetails.data.status,
                    orderDate: orderDetails.data.orderDate
                })
                setIsUserOrderModalOpen(true);
            }
        }catch(error){
            console.log(error);
        }
        
    }

    return(
        <div>
            <UserOrderModal isUserOrderModalOpen={isUserOrderModalOpen} setIsUserOrderModalOpen={setIsUserOrderModalOpen} userOrderData={userOrderData} setUserOrderData={setUserOrderData}/>

            <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
                <NavbarComponent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} cookies={cookies}/>
                <Sidebar cookies={cookies} setCookie={setCookie} removeCart={removeCart}/>

                <ContentWrapper>
                    {
                        
                        userOrders !== undefined && userOrders.length > 0
                    ?
                    (
                        <div className="d-flex flex-wrap flex-column align-items-center">
                            {userOrders.map((order) => (
                                <div className='card w-three-quarter d-flex justify-content-between' id={order.orderId}>
                                    <div className='mt-10'><b>ID zamówienia:</b> {order.orderId}</div>
                                    <div className='mt-10'><b>Wartość zamówienia:</b> {order.fullOrderPrice} zł</div>
                                    <div className='mt-10'><b>Dostawa:</b> {order.deliveryOption}</div>
                                    <div className='mt-10'><b>Płatność:</b> {order.paymentOption}</div>
                                    <button className='btn btn-primary' onClick={()=>getOrderDetails(order.orderId)}>Szczegóły <FontAwesomeIcon icon={faAnglesRight}/></button>
                                </div>
                            ))}
                        </div>
                    )
                    :
                    (<h1>Brak zamówień</h1>)
                    }
                    
                    {isUserOrderModalOpen
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