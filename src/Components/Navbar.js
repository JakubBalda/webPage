import {useState, useEffect} from 'react';
import 'halfmoon/css/halfmoon.min.css';
import {PageWrapper} from 'reacthalfmoon';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faCartShopping, faSignIn, faUser} from '@fortawesome/free-solid-svg-icons';

export default function NavbarComponent({onSearchChange, onGenreChange}){

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const chnageGenre = (genre) => {
    onGenreChange(genre);
  };

  return (
    <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
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

      <div className="sidebar d-flex flex-column">
        <div className='border-bottom'>
          <button className='btn btn-primary m-15 w-200 align-self-center'>
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

          <div className="dropdown-menu dropdown-menu-center h-250 overflow-scroll" aria-labelledby="dropdown-toggle-btn-1">
              <div>
                <a href="#" className="dropdown-item" onClick={() => chnageGenre('')}>&gt; Wszystkie ({booksAmount})</a>
                <div className="dropdown-divider"></div>
              </div>
          {genres.map((genre, key) => {
            return (
              <div key={key}>
                <a href="#" className="dropdown-item" onClick={() => chnageGenre(genre.type)}>&gt; {genre.type} ({genre.count})</a>
                <div className="dropdown-divider"></div>
              </div>
            );
          })}
           
          </div>
        </div>
      </div>
  </PageWrapper>

  )
};
