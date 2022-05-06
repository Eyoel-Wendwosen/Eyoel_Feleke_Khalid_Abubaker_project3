import React from "react";
import { Rating } from "react-simple-star-rating";

const Book = (props) => {
  const bookYear = new Date(props.book.year);
  const year = bookYear.getFullYear();
  return (
    // <div className="book-wrapper">
    <div className="card-book">
      <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388800064l/9648068.jpg" />
      <div className="card-infos-wrapper">
        <div className="card-book-infos">
          <div className="details">
            <h2>{props.book.name}</h2>
            <h4>Author: {props.book.author}</h4>
            <h4>Genre: {props.book.genre}</h4>
            <h4>Year: {year}</h4>
          </div>
          <div>
            <Rating
              size="1em"
              allowHalfIcon="true"
              readonly="true"
              initialValue={props.book.rating}
              className="home-star-rating"
              // ratingValue={rate}
            ></Rating>
            {/* <p>{props.book.rating}/5</p> */}
          </div>
          {/* <p>
            Book description with <strong>relevant info</strong>.
          </p> */}
        </div>
        <div>
          <p>Created: {props.book.createdAt.substring(0, 10)}</p>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Book;
