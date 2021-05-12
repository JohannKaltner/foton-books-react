import React from "react";
import "../index.css";
function CardBook({ book, onClick }) {
  const formatText = (text) => {
    // if (text.length > 20) {
    //   const formattedText = [
    //     text.split(" ")[0],
    //     text.split(" ")[1],
    //     text.split(" ")[2],
    //   ].join(" ");
    //   return formattedText;
    // } else
    return text;
  };

  console.log(book.name);

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
