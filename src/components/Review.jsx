import React from "react";
import { Container, Button } from "react-bootstrap";

const Review = (props) => {
  return (
    <Container>
      <div className="review d-flex flex-column justify-content-between">
        <div>
          <h4>Review Subject</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            repellat perspiciatis asperiores praesentium, aspernatur ad ut sequi
            dolore dolores quod aliquid ex consequatur quis officia consectetur
            sint maxime porro fugiat?
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start gap-2 review-user">
            <img
              src="https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
              className="avatar-bordered"
            />
            <p>Username</p>
          </div>
          <div className="d-flex gap-2">
            <Button className="logged-user-btn">Edit</Button>
            <Button className="logged-user-btn">Delete</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Review;
