import {useState, useEffect} from 'react';
import 'halfmoon/css/halfmoon.min.css';
import {PageWrapper} from 'reacthalfmoon';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faCartShopping} from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';

export default function NavbarComponent({onSearchChange, isSidebarOpen, setIsSidebarOpen}){

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


  return (
      <nav className="navbar d-flex justify-content-between">
        <div className="navbar-content">
          <button className="btn btn-action" type="button" onClick={() => {setIsSidebarOpen(!isSidebarOpen)}}>
            <FontAwesomeIcon icon={faBars}/>
          </button>
          <a className="navbar-brand">
            BookStore
          </a>
        </div>
        <form className="d-flex">
          <input type="text" placeholder="Wyszukaj tytuł" className="form-control w-400" onChange={(e) => onSearchChange(e.target.value)}></input>
        </form>
        <button className="btn btn-primary"><FontAwesomeIcon icon={faCartShopping} /></button>
      </nav>  
  )
};
