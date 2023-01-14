import React from "react";

class Carousel extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div
        id="introSlide"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner fullscreen">
          <div className="carousel-item active">
            <img
              src="https://bit.ly/3vg5GuN"
              className="d-block w-100 carousel-img"
              alt="..."
            />
          </div>
          <div className="carousel-item fullscreen">
            <img
              src="https://bit.ly/3GhzQnE"
              className="d-block w-100 carousel-img"
              alt="..."
            />
          </div>

          <div className="carousel-item fullscreen">
            <img
                src="https://bit.ly/3hON0iD"
                className="d-block w-100 carousel-img"
                alt="..."
            />
          </div>

        </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#introSlide"
                  data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#introSlide"
                  data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
      </div>
    );
  }
}

export default Carousel;
