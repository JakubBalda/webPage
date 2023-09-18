import React from "react";
import 'halfmoon/css/halfmoon.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

export default function NavbarComponent({onSearchChange, isSidebarOpen, setIsSidebarOpen, cookies}){
  const location = useLocation();
  const isInCorrectPage = location.pathname === '/';

  return (
      <nav className="navbar d-flex justify-content-between">
        <div className="navbar-content">
          <button className="btn btn-action" type="button" onClick={() => {setIsSidebarOpen(!isSidebarOpen)}}>
            <FontAwesomeIcon icon={faBars}/>
          </button>
          <a href='/' className="navbar-brand">
            <span className='font-weight-bold'>Book</span><span>Store</span>
          </a>
        </div>
        <form className="d-flex">
          { isInCorrectPage 
            ? 
            (<input type="text" placeholder="Wyszukaj tytuł" className="form-control w-400" onChange={(e) => onSearchChange(e.target.value)}></input>)
            : 
            (<input type="text" placeholder="Wyszukaj tytuł" className="form-control w-400 disabled" disabled onChange={(e) => onSearchChange(e.target.value)}></input> )
          }
        </form>
        {  cookies.cart !== undefined
          ?
          (<button className="btn btn-primary"><FontAwesomeIcon icon={faCartShopping} /></button>)
          :
          (<button className="btn btn-primary" data-toggle='tooltip' data-title={'Koszyk pusty'} data-placement='left' disabled><FontAwesomeIcon icon={faCartShopping} /></button>)
        }
      </nav>  
  )
};
