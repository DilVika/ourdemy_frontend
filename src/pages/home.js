import React from "react";
import "../pages/home.css";

import ComplexCard from "../components/ComplexCard";
// import CCarousel from "../components/CCarousel";
import PageFrame from "../components/PageFrame";
import {Grid} from "@material-ui/core";

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
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
            <div className={"homeContainer"}>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <CarouselProvider
                            naturalSlideWidth={10}
                            naturalSlideHeight={30}
                            totalSlides={dummyHigh.length}
                            visibleSlides={4}
                            infinite={true}
                            isPlaying={true}
                            touchEnabled={false}
                            interval={2000}
                            isIntrinsicHeight={true}
                        >
                            <h2>Highlights </h2>
                            <Slider>
                                {dummyHigh}
                            </Slider>
                            <h2>Best Selling</h2>
                            <Slider>{dummyHigh}</Slider>
                        </CarouselProvider>
                        {/*<div className="title">*/}
                        {/*    <h2>Highlights </h2>*/}
                        {/*    <CCarousel>{dummyHigh}</CCarousel>*/}
                        {/*</div>*/}
                        {/*<div className="title">*/}
                        {/*    <h2>Most Watches</h2>*/}
                        {/*    <CCarousel>{dummyHigh}</CCarousel>*/}
                        {/*</div>*/}
                        {/*<div className="title">*/}
                        {/*    <h2>Newest</h2>*/}
                        {/*    <CCarousel>{dummyHigh}</CCarousel>*/}
                        {/*</div>*/}
                        {/*<div className="title">*/}
                        {/*    <h2>Topics</h2>*/}
                        {/*    <CCarousel>{dummyHigh}</CCarousel>*/}
                        {/*</div>*/}
                    </Grid>
                </Grid>

            </div>
        </PageFrame>
    );
};

export default Home;
