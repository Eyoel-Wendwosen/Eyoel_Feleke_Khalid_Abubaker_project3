import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import Axios from "axios";
import { Rating } from "react-simple-star-rating";
const Review = (props) => {
  const logged = useSelector((state) => state.auth.value);

  const [reviewUser, setReviewUser] = useState("");
  const [putReview, setPutReview] = useState(false);
  const [newReview, setNewReview] = useState({
    subject: props.review.subject,
    text: props.review.text,
    rating: props.review.rating,
    bookId: props.review.bookId,
    ownerId: props.review.ownerId,
  });

  useEffect(() => {
    if (!props.review.ownerId) {
      return;
    }
    Axios.get("/api/user/" + props.review.ownerId).then(function (response) {
      setReviewUser(response.data);
    });
  }, [props]);

  function deleteReview() {
    Axios.delete("/api/review/" + props.review._id)
      .then(function (response) {
        props.onChange();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function editReview() {
    Axios.put("/api/review/" + props.review._id, {
      review: {
        ...newReview,
        bookId: props.review.bookId,
        ownerId: props.review.ownerId,
      },
    })
      .then(function (response) {
        setPutReview(false);
        props.onChange();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleRating = (rate) => {
    setNewReview((prev) => ({
      ...prev,
      rating: rate / 2 / 10,
    }));
  };
  return (
    <Container>
      {putReview ? (
        <div className="edited-review d-flex flex-column justify-content-between">
          <Form>
            <fieldset disabled={!logged ? true : false}>
              <div className="d-flex justify-content-between">
                <Form.Group className="mb-1">
                  <Form.Control
                    type="text"
                    placeholder="subject"
                    value={newReview.subject}
                    onChange={(e) =>
                      setNewReview((prev) => ({
                        ...prev,
                        subject: e.target.value,
                      }))
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Rating
                    size="2em"
                    allowHalfIcon="true"
                    onClick={handleRating}
                    readonly={!logged ? true : false}
                    initialValue={newReview.rating}
                    // ratingValue={rate}
                  ></Rating>
                </Form.Group>
              </div>
              <hr />
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  id="disabledTextInput"
                  value={newReview.text}
                  placeholder={
                    !logged
                      ? "Please sign up or login to write a review"
                      : "Your Review"
                  }
                  onChange={(e) =>
                    setNewReview((prev) => ({
                      ...prev,
                      text: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button
                  className="logged-user-btn"
                  type="reset"
                  onClick={editReview}
                >
                  Submit
                </Button>

                <Button
                  className="logged-user-btn"
                  onClick={() => setPutReview((prev) => !prev)}
                >
                  Cancel
                </Button>
              </div>
            </fieldset>
          </Form>
        </div>
      ) : (
        <div className="review d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex justify-content-between">
              <h4>{props.review.subject}</h4>

              <Rating
                size="1.5em"
                readonly="true"
                allowHalfIcon="true"
                initialValue={props.review.rating}
                // ratingValue="2"
              ></Rating>
            </div>

            <hr />
            <p>{props.review.text}</p>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-start gap-2 review-user">
              <img
                src={
                  reviewUser.imageUrl
                    ? reviewUser.imageUrl
                    : "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
                }
                className="avatar-bordered"
              />
              <p>{reviewUser.username}</p>
            </div>
            {logged.userId === props.review.ownerId && (
              <div className="d-flex gap-2">
                <Button
                  className="logged-user-btn"
                  onClick={() => setPutReview((prev) => !prev)}
                >
                  Edit
                </Button>
                <Button className="logged-user-btn" onClick={deleteReview}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Review;
