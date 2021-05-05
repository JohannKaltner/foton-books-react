import React from "react";
import "../index.css";
function CardBook({ book, onClick }) {
  const formatText = (text) => {
    if (text.length > 20) {
      return text.split(" ")[0];
    } else return text;
  };

  return (
    <div className="card" onClick={onClick}>
      <div className="card-image">
        <img src={book.image} />
      </div>
      <div className="card-title">
        <h3>{formatText(book.name)}</h3>
      </div>
      <div className="author">
        <span>by {book.author}</span>
      </div>
    </div>
  );
}
export default CardBook;
