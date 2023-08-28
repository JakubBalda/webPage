import React, { useState, useEffect } from 'react';
import 'halfmoon/css/halfmoon.min.css';
import axios from 'axios';
import { Pagination, PageItem } from 'reacthalfmoon';
import { Link } from 'react-router-dom';

export default function AllBooks({ search, bookGenre, cookies, setBookGenre }) {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState('title-asc');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [searchAuthor, setSearchAuthor] = useState('');
  const [favouriteAuthors, setFavouriteAuthors] = useState([]);
  const [favouriteGenres, setFavouriteGenres] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books');
        setBooks(res.data.books);
      } catch (err) {
        console.log(err);
      }
    };

    const getPreferences = async () => {
      try{
          const res = await axios.get(`http://localhost:5001/api/users/getUserPreferences/${cookies.user.id}`);
          console.log(res.data);
          setFavouriteAuthors(res.data[0]);
          setFavouriteGenres(res.data[1]);
      }catch(err){
          console.log(err)
      }
  }

    getBooks();

    if(cookies.user.id !== undefined)
      getPreferences();
  }, []);

  useEffect(() => {
    const filteredBooks = books.filter((book) => {
      const titleMatch = search.toLowerCase() === '' || book.title.toLowerCase().includes(search.toLowerCase());
      const genreMatch = bookGenre.length === 0 || bookGenre.includes(book.genre);
      const minValueMatch = minValue.toLowerCase() === '' || minValue <= book.price;
      const maxValueMatch = maxValue.toLowerCase() === '' || maxValue >= book.price;
      const authorMatch = selectedAuthors.length === 0 || selectedAuthors.includes(book.author);

      return titleMatch && genreMatch && minValueMatch && maxValueMatch && authorMatch;
    });

    const sortedBooks = filteredBooks.sort((a, b) => {
      const [criteria, order] = sortOption.split('-');
      const compareA = a[criteria];
      const compareB = b[criteria];

      if (compareA < compareB) {
        return order === 'asc' ? -1 : 1;
      }
      if (compareA > compareB) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(sortedBooks);
    setCurrentPage(1);
  }, [books, search, bookGenre, sortOption, minValue, maxValue, selectedAuthors]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const calculateTotalPages = () => {
    return Math.ceil(filteredData.length / itemsPerPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = calculateTotalPages();

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    setSortOption(selectedSortOption);
  };

  const handleMinValue = (event) => {
    const selectedMinValue = event.target.value;
    setMinValue(selectedMinValue);
  }

  const handleMaxValue = (event) => {
    const selectedMaxValue = event.target.value;
    setMaxValue(selectedMaxValue);
  }

  const handleAuthorSelection = (event) => {
    const author = event.target.value;

    if (event.target.checked) {
      setSelectedAuthors((prevAuthors) => [...prevAuthors, author]);
    } else {
      setSelectedAuthors((prevAuthors) =>
        prevAuthors.filter((selectedAuthor) => selectedAuthor !== author)
      );
    }
  };

  const handleResetAuthors = () => {
    setSelectedAuthors([]);
  };

  const handlePreferenceSelect = (event) => {
    const preference = event.target.value;

    switch(preference){
      case 'authors':{
        setSelectedAuthors(favouriteAuthors);
        setBookGenre([]);
        break;
      }
      case 'genres':{
        setBookGenre(favouriteGenres);
        setSelectedAuthors([]);
        break;
      }
    }
  }

  const handlePreferencesReset = () => {
    document.getElementById('preferencesOption').value = 'default';
    setSelectedAuthors([]);
    setBookGenre([]);
  }

  const uniqueAuthors = Array.from(new Set(books.map((book) => book.author)));

  return (
    <div className='d-flex bg-light flex-column'>
      <div className='container-fluid'>
        <div className='row d-flex'>
          <div className='col-3'>
            <div className='d-flex flex-column mt-50 ml-50'>
              <div className='form text-left pr-50'>
                <label htmlFor='sortOption' className='ml-5 font-size-14'>
                  Sortuj:
                </label>
                <select id='sortOption' className='form-control' value={sortOption} onChange={handleSortChange}>
                  <option value='title-asc'>Tytuł (A - Z)</option>
                  <option value='title-desc'>Tytuł (Z - A)</option>
                  <option value='price-asc'>Cena (Rosnąco)</option>
                  <option value='price-desc'>Cena (Malejąco)</option>
                </select>
              </div>
            </div>
            <div className=' w-200 ml-50 mt-50 mr-0 pl-0 pr-0 pt-10 card d-flex flex-column position-relative'>
              <div className='content-title font-size-20 mt-10 text-center'>Filtruj</div>
              <span className='mt-50 ml-15 text-left font-size-14'>Cena:</span>
                <div className='form-inline mt-5'>
                  <label htmlFor='minValue' className='ml-10'>Od:</label>
                  <input id='minValue' type='text' className='form-control mr-15' value={minValue} onChange={handleMinValue}/>

                  <label htmlFor='maxValue'>Od:</label>
                  <input id='maxValue' type='text' className='form-control mr-10' value={maxValue} onChange={handleMaxValue}/>
                </div>

                <div className='text-left mt-15'>
                <span className='mt-50 ml-15 text-left font-size-14'>Autorzy:</span>
                <form className='form-inline d-flex justify-content-center mt-10'>
                  <input type='text' className='form-control' placeholder='Wyszukaj autora' onChange={(e) => setSearchAuthor(e.target.value)}></input>
                </form>
                <div className='overflow-scroll h-150 mt-15'>
                {uniqueAuthors.filter((author) => {
                  return author.toLowerCase() === '' || author.toLowerCase().includes(searchAuthor.toLowerCase());
                })
                .map((author) => (
                  <div key={author} className='form-check'>
                    <input
                      type='checkbox'
                      id={author}
                      value={author}
                      checked={selectedAuthors.includes(author)}
                      onChange={handleAuthorSelection}
                      className='form-check-input ml-5'
                    />
                    <label htmlFor={author} className='form-check-label ml-5'>
                      {author}
                    </label>
                  </div>
                ))}
                </div>
              </div>
              <div className='text-center'>
                <button className='btn btn-primary mt-20 w-100' onClick={handleResetAuthors}>Resetuj autorów</button>
              </div>
              {cookies.user.id !== undefined ?
              (
                <div className='mt-50 text-left w-full'>
                  <span className='mt-50 ml-15 font-size-14'>Preferencje:</span>
                  <select className='form-control mt-10' id='preferencesOption' onChange={handlePreferenceSelect}>
                      <option disabled selected value='default'></option>
                      <option value='authors'>Ulubieni autorzy</option>
                      <option value='genres'>Ulubione gatunki</option>
                  </select>
                  <div className='text-center'>
                    <button className='btn btn-primary mt-10 w-100' onClick={handlePreferencesReset}>Resetuj</button>
                  </div>
                </div>
              )
              :
                (<div></div>)
              }
            </div>
          </div>
          <div className='col-9'>
            <div className='d-flex justify-content-center'>
              <div className='d-flex flex-wrap justify-content-center'>
                {paginatedData.map((book, key) => {
                  let imageUrl
                  if(book.imageBlob){
                    imageUrl = btoa(String.fromCharCode(...new Uint8Array(book.imageBlob.data)));
                  }
                  return (
                    <div className='card w-200 h-320 p-0 d-flex flex-column mt-70' data-toggle='tooltip' data-title={book.title} data-placement='top' key={book.id}>
                      <img src={`data:image/jpeg;base64,${imageUrl}`} className='w-100 mt-15 align-self-center' alt={book.imageUrl}></img>
                      <div className='content p-0'>
                        <div className='content-title p-0 font-size-12 text-truncate'>"{book.title}"</div>
                        <p className='text-muted'>{book.author}</p>
                        <p className='text-muted'>{book.price.toFixed(2)} zł</p>
                        <div className='text-center'>
                        <Link to={`/book/${book.id}`}>
                            <a href='#' className='btn'>
                              Zobacz  
                            </a>
                        </Link>
                        </div>
                      </div>
                    </div>);
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Pagination>
        <PageItem onClick={handlePrevPage}>
          <span>{'<'}</span>
        </PageItem>
        <PageItem onClick={handleFirstPage}>1</PageItem>
        <PageItem>...</PageItem>
        <PageItem active>{currentPage}</PageItem>
        <PageItem>...</PageItem>
        <PageItem onClick={handleLastPage}>{totalPages}</PageItem>
        <PageItem onClick={handleNextPage}>
          <span>{'>'}</span>
        </PageItem>
      </Pagination>
    </div>
  );
}
