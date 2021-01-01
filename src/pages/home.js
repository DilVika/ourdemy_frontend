import React from "react";
import PageFrame from "../components/PageFrame";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../pages/home.css";

import { Card } from "@material-ui/core";
import RecipeReviewCard from "../components/ComplexCard";

const dummyHigh = [
  {
    src: "https://picsum.photos/500/301",
    name: "Java code giay",
  },
  {
    src: "https://picsum.photos/500/300",
    name: "Java code giay",
  },
].map((el) => (
  <RecipeReviewCard avatar={el.name[0]} />
));

const Home = () => {
  return (
    <div>
      <PageFrame>
        <div className="highlight">
            <h1>Highlights </h1>
          <Carousel showThumbs={false}>{dummyHigh}</Carousel>
          <h1>Most Watches </h1>
          <Carousel showThumbs={false}>{dummyHigh}</Carousel>
          <h1>Newest</h1>
          <Carousel showThumbs={false}>{dummyHigh}</Carousel>
          <h1>Topic</h1>
          <Carousel showThumbs={false}>{dummyHigh}</Carousel>
        </div>
      </PageFrame>
    </div>
  );
};

export default Home;
