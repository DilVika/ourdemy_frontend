import PageFrame from "../components/PageFrame";
import React, { useState } from "react";
import InforCard from "../components/InforCard";
import InfiniteScroll from "react-infinite-scroll-component";


const dummyInfo = Array.from({ length: 20 }, (v, i) => ({
  src: "https://picsum.photos/300/200",
  title: "Java Code Giấy",
  kind: "Web Devevlopment",
  author: "Ba Tê",
  rate: 5,
  count: "700",
  currentPrice: "50" + i,
  originPrice: "70" + i,
  brief: "Java code giay",
})).map((val, index) => (
  <InforCard
    key={index}
    style={{margin: "10px"}}
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
  const [coursesList, setCoursesList] = useState(dummyInfo);
  const handleFetch = () => {
    setCoursesList([...coursesList, dummyInfo]);
  };

  return (
    <PageFrame>
      <h2>Courses</h2>
      <InfiniteScroll
        dataLength={coursesList.length} //This is important field to render the next data
        next={handleFetch}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        //refreshFunction={this.refresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        // }
      >
        {coursesList}
      </InfiniteScroll>
    </PageFrame>
  );
};

export default Courses;
