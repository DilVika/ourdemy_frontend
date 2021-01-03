import React from "react";
import "../pages/home.css";

import "react-multi-carousel/lib/styles.css";
import PageFrame from "../components/PageFrame.js"

import ComplexCard from "../components/ComplexCard";
// import CCarousel from "../components/CCarousel";
import PageFrame from "../components/PageFrame";

import { Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const dummyHigh = [
    {
        src: "https://picsum.photos/300/200",
        name: "Java Code Giấy zzz",
        brief: "Java code giay",
    },
    {
        src: "https://picsum.photos/300/200",
        name: "Java",
        brief: "Java code giay",
    },
    {
        src: "https://picsum.photos/300/200",
        name: "Java Code Giấy zzzzzzzzzzzzzzz",
        brief: "Java code giay",
    },
    {
        src: "https://picsum.photos/500/301",
        name: "Java Code Giấy zzzz",
        brief: "Java code giay",
    },
    {
        src: "https://picsum.photos/300/300",
        name: "Java",
        brief: "Java code giay",
    },
    {
        src: "https://picsum.photos/500/301",
        name: "Java Code Giấy zz",
        brief: "Java code giay",
    },
    {
        src: "https://picsum.photos/500/301",
        name: "Java Code Giấy zz",
        brief: "Java code giay",
    },
    {
        src: "https://picsum.photos/500/301",
        name: "Java Code Giấy zz",
        brief: "Java code giay",
    },
].map((val, index) => (
    <Slide index={index}>
        <ComplexCard
            key={index}
            className="item"
            title={val.name}
            detail={val.brief}
            avatar={val.name[0]}
            imagesrc={val.src}
        />
    </Slide>
));
const Home = () => {
  return (
    <PageFrame>
      <div className="title">
        <h2>Highlights </h2>
        <CCarousel>{dummyHigh}</CCarousel>
      </div>
      <div className="title">
        <h2>Most Watches</h2>
        <CCarousel>{dummyHigh}</CCarousel>
      </div>
      <div className="title">
        <h2>Newest</h2>
        <CCarousel>{dummyHigh}</CCarousel>
      </div>
      <div className="title">
        <h2>Topics</h2>
        <CCarousel>{dummyHigh}</CCarousel>
      </div>
    </PageFrame>
  );
};

export default Home;
