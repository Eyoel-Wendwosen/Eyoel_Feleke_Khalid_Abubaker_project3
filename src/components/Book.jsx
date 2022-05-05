import React from "react";

const Book = (props) => {
  //   console.log(props);
  return (
    // <div className="book-wrapper">
    <div className="card-book">
      <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388800064l/9648068.jpg" />
      <div className="card-book-infos">
        <h2>{props.book.name}</h2>
        <p>
          Book description with <strong>relevant info</strong>.
        </p>
      </div>
    </div>
    // </div>
  );
};

export default Book;
