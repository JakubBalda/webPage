

export default function BookGenres({onGenreChange, booksAmount, genres}){

    const chnageGenre = (genre) => {
        onGenreChange(genre);
      };

    return (
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
    )
}