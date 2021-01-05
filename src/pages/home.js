import React from "react";
import "../pages/home.css";

import "react-multi-carousel/lib/styles.css";
import { Paper } from "@material-ui/core";
import ComplexCard from "../components/ComplexCard";
import CCarousel from "../components/CCarousel";
import PageFrame from "../components/PageFrame";

const dummyHigh = [
  {
    src: "https://picsum.photos/300/200",
    title: "Java Code Giấy",
    kind: "Web Devevlopment",
    author: "Ba Tê",
    rate: 5,
    count: "700",
    currentPrice: "50",
    originPrice: "70",
    brief: "Java code giay",
  },
  {
    src: "https://picsum.photos/300/200",
    title: "Java Code Giấy",
    kind: "Web Devevlopment",
    author: "Ba Tê",
    rate: 1,
    count: "700",
    currentPrice: "1",
    originPrice: "70",
    brief: "Java code giay",
  },
  {
    src: "https://picsum.photos/300/200",
    title: "Java Code Giấy",
    kind: "Web Devevlopment",
    author: "Ba Tê",
    rate: 2,
    count: "700",
    currentPrice: "1",
    originPrice: "70",
    brief: "Java code giay",
  },
  {
    src: "https://picsum.photos/300/200",
    title: "Java Code Giấy",
    kind: "Web Devevlopment",
    author: "Ba Tê",
    rate: 5,
    count: "1",
    currentPrice: "0",
    originPrice: "70",
    brief: "Java code giay",
  },
  {
    src: "https://picsum.photos/300/200",
    title: "Java Code Giấy",
    kind: "Web Devevlopment",
    author: "Ba Tê",
    rate: 4.5,
    count: "1",
    currentPrice: "0",
    originPrice: "70",
    brief: "Java code giay",
  },
].map((val, index) => (
  <ComplexCard
    key={index}
    className="item"
    title={val.title}
    price={val.currentPrice}
    originPrice={val.originPrice}
    kind={val.kind}
    rate={val.rate}
    count={val.count}
    author={val.author}
    imagesrc={val.src}
    
  />
));

const Home = () => {
  return (
    <PageFrame>
      <div className="title">
        <h2>Highlights </h2>
        <CCarousel itemClassName="item">{dummyHigh}</CCarousel>
      </div>
      <div className="title">
        <h2>Most Watches</h2>
        <CCarousel itemClassName="item">{dummyHigh}</CCarousel>
      </div>
      <div className="title">
        <h2>Newest</h2>
        <CCarousel itemClassName="item">{dummyHigh}</CCarousel>
      </div>
      <div className="title">
        <h2>Topics</h2>
        <CCarousel itemClassName="item">{dummyHigh}</CCarousel>
      </div>
    </PageFrame>
  );
};

export default Home;
