import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import UAParser from "ua-parser-js";


const CCarousel = (props,{ deviceType }) => {
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
      autoPlay={true }
      autoPlaySpeed={2000}
      transitionDuration={500}
      keyBoardControl={true}
      //containerClass="carousel-container"
      swipeToSlide={true}
      
      deviceType={deviceType || 'desktop'}
      //renderButtonGroupOutside={true}
      itemClass={props.itemClassName}
    >
      {props.children}
    </Carousel>
  );
};

CCarousel.getInitialProps = ({ req }) => {
    let userAgent;
    if (req) {
      userAgent = req.headers["user-agent"];
    } else {
      userAgent = navigator.userAgent;
    }
    const parser = new UAParser();
    parser.setUA(userAgent);
    const result = parser.getResult();
    const deviceType = (result.device && result.device.type) || "desktop";
    return { deviceType };
  };

  
export default CCarousel;
