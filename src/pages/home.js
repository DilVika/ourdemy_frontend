import React from "react";

import "../pages/home.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Paper } from "@material-ui/core";
import ComplexCard from "../components/ComplexCard";
import PageFrame from "../components/PageFrame";

const dummyHigh = [
  {
    src: "https://picsum.photos/500/301",
    name: "Java Code Giấy zzzzzzzzzzzzzzz",
    brief: "Java code giay",
  },
  {
    src: "https://picsum.photos/500/300",
    name: "Java",
    brief: "Java code giay",
  },
  {
    src: "https://picsum.photos/500/301",
    name: "Java Code Giấy zzzzzzzzzzzzzzz",
    brief: "Java code giay",
  },
  
].map((val, index) => (
  <Paper key={index}>
    <ComplexCard title={val.name} detail={val.brief} avatar={val.name[0]}
    imagesrc={val.src} />
  </Paper>
));
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const Home = () => {
  return (
    <div>
      <PageFrame>

          <h1>Highlights </h1>
          <Carousel
            // swipeable={false}
            // draggable={false}
            // showDots={true}
             responsive={responsive}
            // ssr={false} // means to render carousel on server-side.
            // infinite={true}
             autoPlay={ true }
             autoPlaySpeed={1000}
            // keyBoardControl={true}
            // customTransition="all .5"
            // transitionDuration={500}
            // containerClass="carousel-container"
            // removeArrowOnDeviceType={["tablet", "mobile"]}
            // deviceType={"desktop"}
            // dotListClass="custom-dot-list-style"
            //itemClass="carousel-item-padding-40-px"
          >
            {dummyHigh}
          </Carousel>
          <h1>Most Watches </h1>
          <h1>Newest</h1>
          <h1>Topic</h1>
        
      </PageFrame>
    </div>
  );
};

export default Home;
