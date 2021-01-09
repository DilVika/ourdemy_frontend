import PageFrame from "../components/PageFrame";
import React from "react";
import InforCard from "../components/InforCard";

const dummyInfo = [
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
  <InforCard
    key={index}
    src={val.src}
    title={val.title}
    author={val.author}
    brief={val.brief}
    rate={val.rate}
    count={val.count}
    price={val.currentPrice}
    originPrice={val.originPrice}
  />
));

const Courses = (props) => {
  return (
    <PageFrame>
      {dummyInfo}
    </PageFrame>
  );
};

export default Courses;
