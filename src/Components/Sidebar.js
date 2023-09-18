import BookGenres from "./BookGenres";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignIn, faUser} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import axios from "axios";
import { CookiesProvider } from "react-cookie";
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar({onGenreChange, setIsLoginModalOpen, cookies, setCookie, setIsEditBookDataModalOpen, bookId, setIsNewBookModalOpen}){
    const [booksAmount, setBooksAmount] = useState(null);
    const [genres, setGenres] = useState([]); 

    const navigate = useNavigate();

    const location = useLocation();
    const isOnMainPage = location.pathname === '/';
    const isOnBookPage = location.pathname.includes('/book/');

    useEffect(() => {
        const getBookAmount = async () => {
          axios.get('http://localhost:5000/api/books/genres/sidebar')
          .then(res => {
            setBooksAmount(res.data.length);
    
            const genres = res.data
            .map(dataItem => dataItem.Genre)
            .filter((genre, index, array) => array.indexOf(genre) === index);
          
            const counts = genres
              .map(genre => ({
                type: genre,
                count: res.data.filter(item => item.Genre === genre).length
              }));
    
              setGenres(counts);
          }).catch(err => {
            console.log(err);
          })
        };
    
        getBookAmount();
      }, [])

      const handleLogOut = () => {
          setCookie("user", '', {path: "/"});
          setCookie("cart", []);
          alert("Pomyślnie wylogowano");
          navigate("/");
      }

      const handleDeleteBook = () => {
          if(window.confirm('Czy na pewno chcesz usunąć książkę?') === true){
            axios.delete(`http://localhost:5000/api/books/${bookId}`)
              .then((response) => {
                  if(response.data === "Deleted"){
                    alert('Książka została usunięta');
                  }else{
                    alert('Wystąpił błąd podczas usuwania książki, spróbuj ponownie później');
                  }
              })
              .catch((error) => {
                console.log('Error: ' + error);
              })
          }
      }

    return(
        <div className="sidebar d-flex flex-column">
          <div>
            <div className='border-bottom'>
              <CookiesProvider>
                {cookies.user ? (
                  <div>
                    <button className='btn btn-primary m-15 w-200 align-self-center' onClick={handleLogOut}>
                      <FontAwesomeIcon icon={faSignIn} />  Wyloguj (<b>{cookies.user.login}</b>)
                    </button>
                    <Link to={'/myProfile'}>
                      <button className='btn m-15 w-200 align-self-center' >
                        <FontAwesomeIcon icon={faUser} />  Profil 
                      </button>
                    </Link>
                  </div>
                ) : (
                  <button className='btn btn-primary m-15 w-200 align-self-center' onClick={()=>{setIsLoginModalOpen(true)}}>
                    <FontAwesomeIcon icon={faSignIn} />  Zaloguj
                  </button>
                )}
                
              </CookiesProvider>
            </div>

            {isOnMainPage ? 
            (<div>
              <div className="dropdown mt-15 with-arrow">
                <button className="btn w-200" data-toggle="dropdown" type="button" id="dropdown-toggle-btn-1" aria-haspopup="true" aria-expanded="false">
                    Książki ({booksAmount})<i className="fa fa-angle-down ml-5" aria-hidden="true"></i>
                </button>
                    <BookGenres onGenreChange={onGenreChange} booksAmount={booksAmount} genres={genres}/>
              </div>
              {cookies.user && cookies.user.role === 'Admin' ? 
                (<div>
                  <button className="btn btn-success mt-20 w-200" onClick={() => {setIsNewBookModalOpen(true)}}>Dodaj książke</button>
                </div>)
              :
                (<div></div>)
              }
              </div>
              ) 
              :
              (<div>
                  {cookies.user.role === 'Admin' && isOnBookPage ?
                    (
                      <div className="">
                        <div>
                          <button className="btn btn-secondary mt-20" onClick={() => {setIsEditBookDataModalOpen(true)}}>Edytuj książke</button>
                        </div>
                        <button className="btn btn-danger mt-20" onClick={handleDeleteBook}>Usuń książke</button>
                      </div>
                    ) 
                    :
                    (<div></div>)
                  }

              </div>)
              }
        </div>
        
      </div>
    )
}