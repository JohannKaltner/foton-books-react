import React,{useRef} from "react";
import "../../home/index.css"; 
import { useHistory } from "react-router-dom";
import defaultUrl from '../../../services/api/api';
import CardBook from '../../home/components/CardBook';

function Search() {
  const [books, setBooks] = React.useState([]);
  const [paginatedBooks, setPaginationBooks] = React.useState([]);
  const [next, setNext] = React.useState(3);
  const [search, setSearch] = React.useState("");
  const inputRef = useRef(null);

  let history = useHistory();
  const booksPerPage = 4;

    React.useEffect(() => {
    inputRef.current.focus();

    GetBooks();
  }, []);

  React.useEffect(() => {
    paginate(0, booksPerPage, false);
  }, [books]);

  React.useEffect(() => {
    paginate(0, booksPerPage, true);
  }, [search]);

  const GetBooks = () => {
    fetch(defaultUrl + "books")
      .then(function (response) {
        response.json().then(function (data) {
          const cloneArray = [...data, ...data, ...data];
          setBooks(cloneArray);
        });
      })
      .catch(function (err) {
        console.log("Erro na Requisição.", err);
      });
  };

  const paginate = (start, end, isFilter) => {
    const paginateBooks = books.slice(start, end);
    const result = isFilter
      ? filtering(books)
      : [...paginatedBooks, ...paginateBooks];
    setPaginationBooks(result);
  };

  const filtering = (array) => {
    return array.filter((book) =>
      book.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const showMore = () => {
    paginate(next, next + booksPerPage, false);
    setNext(next + booksPerPage);
  };

  const GoTo =  (route, params = '')=> {
    history.push(`${route}${params}`);
  };
 

  return (
      <div className="container"> 
          <div className="search-input back" onClick={() => history.goBack()}>
          <img className="icon" src="/back.svg" />
        </div>
      <div className="search-input search">
          <input
          ref={inputRef}
          onChange={(event) => setSearch(event.target.value)}
          className="input"
          placeholder="Search Book"
          />
      </div> 
      <div className="grid-books"> 
        {paginatedBooks
          .filter((book) =>
            book.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((book) => {
            return (
              <>
                <CardBook onClick={() => GoTo('/details/',book.id)} book={book} />
              </>
            );
          })}
      </div>
      <button className="button" onClick={showMore}>
        {!search && <span className="load-more">Load More</span>}
      </button>
    </div>
  );
}

export default Search;
