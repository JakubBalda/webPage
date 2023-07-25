import BookGenres from "./BookGenres";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignIn, faUser} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import axios from "axios";


export default function Sidebar({onGenreChange, setIsLoginModalOpen}){
    const [booksAmount, setBooksAmount] = useState(null);
    const [genres, setGenres] = useState([]); 

    useEffect(() => {
        const getBookAmount = async () => {
          axios.get('http://localhost:5000/api/books/genres')
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

    return(
        <div className="sidebar d-flex flex-column">
      <div>
            <div className='border-bottom'>
                <button className='btn btn-primary m-15 w-200 align-self-center' onClick={()=>{setIsLoginModalOpen(true)}}>
                    <FontAwesomeIcon icon={faSignIn} />  Zaloguj
                </button>
                <button className='btn m-15 w-200 align-self-center'>
                    <FontAwesomeIcon icon={faUser} />  Profil
                </button>
            </div>

            <div className="dropdown mt-15 with-arrow">
                <button className="btn w-200" data-toggle="dropdown" type="button" id="dropdown-toggle-btn-1" aria-haspopup="true" aria-expanded="false">
                    Książki ({booksAmount})<i className="fa fa-angle-down ml-5" aria-hidden="true"></i>
                </button>

                <BookGenres onGenreChange={onGenreChange} booksAmount={booksAmount} genres={genres}/>
            </div>
        </div>
        
        </div>
    )
}