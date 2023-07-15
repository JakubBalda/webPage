import 'halfmoon/css/halfmoon.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faCartShopping} from '@fortawesome/free-solid-svg-icons';

export default function NavbarComponent({onSearchChange, isSidebarOpen, setIsSidebarOpen}){

  return (
      <nav className="navbar d-flex justify-content-between">
        <div className="navbar-content">
          <button className="btn btn-action" type="button" onClick={() => {setIsSidebarOpen(!isSidebarOpen)}}>
            <FontAwesomeIcon icon={faBars}/>
          </button>
          <a href='/' className="navbar-brand">
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
