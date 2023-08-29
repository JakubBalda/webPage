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

function App() {
  const [cookies, setCookie] = useCookies(["user"]);
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
    <div className="App">
    <ContactModal isContactModalOpen={isContactModalOpen} setIsContactModalOpen={setIsContactModalOpen} />

      <Routes>
        <Route index element={<HomePage cookies={cookies} setCookie={setCookie} handleFormSwitch={handleFormSwitch}
                                  setIsLoginModalOpen={setIsLoginModalOpen} isLoginModalOpen={isLoginModalOpen}
                                  setIsRegisterModalOpen={setIsRegisterModalOpen} isRegisterModalOpen={isRegisterModalOpen}
                                  setIsContactModalOpen={setIsContactModalOpen} isContactModalOpen={isContactModalOpen}/>}></Route>

        <Route path='/book/:id' element={<BookPage cookies={cookies} setCookie={setCookie} handleFormSwitch={handleFormSwitch}
                                            setIsLoginModalOpen={setIsLoginModalOpen} isLoginModalOpen={isLoginModalOpen}
                                            setIsRegisterModalOpen={setIsRegisterModalOpen} isRegisterModalOpen={isRegisterModalOpen}
                                            setIsContactModalOpen={setIsContactModalOpen} isContactModalOpen={isContactModalOpen}/>}></Route>

        <Route path='/myProfile' element={<UserPanel cookies={cookies} setCookie={setCookie} setIsLoginModalOpen={setIsLoginModalOpen}
                                            setIsContactModalOpen={setIsContactModalOpen} isContactModalOpen={isContactModalOpen}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
