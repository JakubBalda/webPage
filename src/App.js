import './App.css';
import {Route, Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import 'semantic-ui-css/semantic.min.css'
import BookPage from './Pages/BookPage';
import React from "react";
import { useCookies } from "react-cookie"
import { useState } from 'react';
import UserPanel from './Pages/UserPanel';
import ContactModal from './Modals/ContactModal';
import { CookiesProvider } from 'react-cookie';
import CartPage from './Pages/CartPage';
import UserOrdersPage from './Pages/UserOrdersPage';

function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  const [cart, setCart, removeCart] = useCookies(["cart"]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleFormSwitch = () => {
    setIsLoginModalOpen(false);
    setTimeout(() => {
        setIsRegisterModalOpen(true);
    }, 400);
}

  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <div className="App">
    <ContactModal isContactModalOpen={isContactModalOpen} setIsContactModalOpen={setIsContactModalOpen} />

      <Routes>
        <Route index element={<HomePage cookies={cookies} setCookie={setCookie} handleFormSwitch={handleFormSwitch}
                                  setIsLoginModalOpen={setIsLoginModalOpen} isLoginModalOpen={isLoginModalOpen}
                                  setIsRegisterModalOpen={setIsRegisterModalOpen} isRegisterModalOpen={isRegisterModalOpen}
                                  setIsContactModalOpen={setIsContactModalOpen} isContactModalOpen={isContactModalOpen} 
                                  cart={cart} removeCart={removeCart}/>}>
        </Route>

        <Route path='/book/:id' element={<BookPage cookies={cookies} setCookie={setCookie} handleFormSwitch={handleFormSwitch}
                                            setIsLoginModalOpen={setIsLoginModalOpen} isLoginModalOpen={isLoginModalOpen}
                                            setIsRegisterModalOpen={setIsRegisterModalOpen} isRegisterModalOpen={isRegisterModalOpen}
                                            setIsContactModalOpen={setIsContactModalOpen} isContactModalOpen={isContactModalOpen}
                                            setCart={setCart} cart={cart} removeCart={removeCart}/>}>
        </Route>

        <Route path='/myProfile' element={<UserPanel cookies={cookies} setCookie={setCookie} setIsLoginModalOpen={setIsLoginModalOpen}
                                            setIsContactModalOpen={setIsContactModalOpen} isContactModalOpen={isContactModalOpen} 
                                            cart={cart} removeCart={removeCart}/>}>
        </Route>

        <Route path='/cart' element={<CartPage cookies={cookies} setCookie={setCookie} isContactModalOpen={isContactModalOpen} setIsContactModalOpen={setIsContactModalOpen} 
                                        cart={cart} setIsLoginModalOpen={setIsLoginModalOpen} isLoginModalOpen={isLoginModalOpen}
                                        setIsRegisterModalOpen={setIsRegisterModalOpen} isRegisterModalOpen={isRegisterModalOpen}
                                        handleFormSwitch={handleFormSwitch} removeCart={removeCart}/>}>
        </Route>

        <Route path='/myOrders' element={<UserOrdersPage cookies={cookies} setCookie={setCookie} removeCart={removeCart}
                                              isContactModalOpen={isContactModalOpen} setIsContactModalOpen={setIsContactModalOpen} />}> 
        
        </Route>
      </Routes>
    </div>
    </CookiesProvider>
  );
}

export default App;
