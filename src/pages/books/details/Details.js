import React from "react";
import { useParams, useHistory } from "react-router";
import defaultUrl from "../../../services/api/api";
import "./index.css";
import Waves from "./waves";
function Details() {
  const params = useParams();
  const [book, setBook] = React.useState({});
  let history = useHistory();
  React.useEffect(() => {
    GetBookById();
  }, []);

  const GetBookById = () => {
    fetch(defaultUrl + "books/" + params.id)
      .then(function (response) {
        response.json().then(function (data) {
          console.log(data);
          setBook(data[0]);
          console.log(book);
        });
      })
      .catch(function (err) {
        console.log("Erro na Requisição.", err);
      });
  };

  const doExit = () => {
    setBook({});
    history.push("/");
  };

  return (
    <div className="container-detail">
      <div className="detail-header">
        <div className="icon-container" onClick={doExit}>
          <img className="icon" src="/back.svg" />
        </div>
        <div className="circle" />
        <div className="circle-zebra" />
        <div className="circle-zebra-2" />
        <div className="circle-ruby" />
        <div className="image-container">
          <img src={book.image} />
        </div>
        {/* <Waves /> */}
        <div className="title-container">
          <span className="title"> {book.name}</span>
        </div>
        {/* <div className=""> */}
        <span className="book-author"> {book.author}</span>
        <div className="description-container">
          <span className=""> {book.description}</span>
        </div>
      </div>
    </div>
  );
}

export default Details;
