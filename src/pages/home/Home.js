import React from "react";
import "./index.css";
import CardBook from "./components/CardBook";
import defaultUrl from "./../../services/api/api";
import { useHistory } from "react-router-dom";

function Home() {
  const [books, setBooks] = React.useState([]);
  const [paginatedBooks, setPaginationBooks] = React.useState([]);
  const [next, setNext] = React.useState(3);
  const [search, setSearch] = React.useState("");

  let history = useHistory();
  const booksPerPage = 4;

  React.useEffect(() => {
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

          //  Obs : Array triplicado para ser possivel validar
          // a feature de Paginação, para exemplo real, descomentar
          // comente a linha abaixo, por gentileza
          const cloneArray = [...data,...data,...data]
          
          // e descomente essa
          // const cloneArray = [data]
        
          
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

  const GoTo = (route, params ='') => {
    history.push(`/${route}/${params}`);
  };

  const runSearch = (event) =>{
    GoTo('search')
    
  }

  return (
    <div className="container">
        <div className="search-input margin-50">
          <input
          onClick={ () => runSearch()}
         // onChange={(event) => setSearch(event.target.value)}
          className="input"
          placeholder="Search Book"
          />
      </div>
         
      <div className="user-title-container">
        <span className="user-title">
          Hi,
          <span style={{ color: "#FF6978", marginRight: 10 }}>
            &nbsp;Mehmed Al Fatih
          </span>
          <span style={{ width: 24 }}>👋</span>
        </span>
      </div>
      <div className="grid-books">
        {/* {console.log(
          paginatedBooks.filter((book) =>
            book.name.toLowerCase().includes(search.toLowerCase())
          )
        )} */}
        {paginatedBooks
          .filter((book) =>
            book.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((book) => {
            return (
              <>
                <CardBook onClick={() => GoTo('details',book.id)} book={book} />
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

export default Home;
