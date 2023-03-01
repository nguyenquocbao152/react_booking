import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";

function CarouselVehicle() {
  return (
    <div className="container-fluid carousel p-0">
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./assets/images/banner/banner1.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./assets/images/banner/banner2.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./assets/images/banner/banner3.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselVehicle;
