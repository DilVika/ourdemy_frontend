import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ComplexCard from "../components/ComplexCard";

const CCarousel = (props) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1000 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      centerMode={true}
      responsive={responsive}
      infinite={true}
      autoPlay={false}
      autoPlaySpeed={2000}
      transitionDuration={500}
      containerClass="carousel-container"
      swipeToSlide={true}
      // removeArrowOnDeviceType={["tablet", "mobile"]}
      //deviceType={"mobile"}
      // dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-100-px"
    >
      {props.children}
    </Carousel>
  );
};

export default CCarousel;
