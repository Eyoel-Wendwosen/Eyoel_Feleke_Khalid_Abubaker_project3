import React from "react";
import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Axios from "axios";
const Review = (props) => {
  const logged = useSelector((state) => state.auth.value);
  // console.log(props.review.ownerId, logged);

  function deleteReview() {
    Axios.delete("/api/review/" + props.review._id)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <Container>
      <div className="review d-flex flex-column justify-content-between">
        <div>
          <h4>{props.review.subject}</h4>
          <hr />
          <p>{props.review.text}</p>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start gap-2 review-user">
            <img
              src="https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
              className="avatar-bordered"
            />
            <p>Username</p>
          </div>
          {logged.userId === props.review.ownerId && (
            <div className="d-flex gap-2">
              <Button className="logged-user-btn">Edit</Button>
              <Button className="logged-user-btn" onClick={deleteReview}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Review;
