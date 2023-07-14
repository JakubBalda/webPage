import React, { useState, useEffect } from 'react';
import 'halfmoon/css/halfmoon.min.css';
import axios from 'axios';
import { Pagination, PageItem } from 'reacthalfmoon';

export default function AllBooks({ search, bookGenre }) {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [filteredData, setFilteredData] = useState([]);
  const [sortOption, setSortOption] = useState('title-asc');

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/books');
        setBooks(res.data.books);
      } catch (err) {
        console.log(err);
      }
    };

    getBooks();
  }, []);

  useEffect(() => {
    const filteredBooks = books.filter((book) => {
      const titleMatch = search.toLowerCase() === '' || book.title.toLowerCase().includes(search);
      const genreMatch = bookGenre.toLowerCase() === '' || bookGenre === book.genre;
      return titleMatch && genreMatch;
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
  }, [books, search, bookGenre, sortOption]);

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

  return (
    <div className='d-flex bg-light flex-column'>
      <div className='container-fluid'>
        <div className='row d-flex'>
          <div className='col-3'>
            <div className='d-flex flex-column mt-50 ml-50'>
              <div className='form text-left pr-50'>
                <label htmlFor='sortOption' className='ml-5'>
                  Sortuj:
                </label>
                <select id='sortOption' className='form-control' value={sortOption} onChange={handleSortChange}>
                  <option value='title-asc'>Tytuł (Rosnąco)</option>
                  <option value='title-desc'>Tytuł (Malejąco)</option>
                  <option value='price-asc'>Cena (Rosnąco)</option>
                  <option value='price-desc'>Cena (Malejąco)</option>
                </select>
              </div>
            </div>
            <div className='h-600 w-200 ml-50 mt-50 mr-0 pl-0 pr-0 pt-10 card d-flex flex-column position-relative'>
              <div className='content-title font-size-20 ml-20 mt-10 mr-auto'>{'>'} Filtry</div>
                
            </div>
          </div>
          <div className='col-9'>
            <div className='d-flex justify-content-center'>
              <div className='d-flex flex-wrap justify-content-center'>
                {paginatedData.map((book, key) => {
                  let imageUrl = btoa(String.fromCharCode(...new Uint8Array(book.imageBlob.data)));

                  return (
                    <div className='card w-200 h-320 p-0 d-flex flex-column mt-70' data-toggle='tooltip' data-title={book.title} data-placement='top' key={book.id}>
                      <img src={`data:image/jpeg;base64,${imageUrl}`} className='w-100 mt-15 align-self-center' alt={book.imageUrl}></img>
                      <div className='content p-0'>
                        <div className='content-title p-0 font-size-12 text-truncate'>"{book.title}"</div>
                        <p className='text-muted'>{book.author}</p>
                        <p className='text-muted'>{book.price.toFixed(2)} zł</p>
                        <div className='text-center'>
                          <a href='#' className='btn'>
                            Zobacz
                          </a>
                        </div>
                      </div>
                    </div>
                  );
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
