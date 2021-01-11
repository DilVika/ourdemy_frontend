import PageFrame from "../components/PageFrame";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ComplexCard from "../components/ComplexCard";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Rating from "react-star-review";
import Paper from "@material-ui/core/Paper";
import InforCard from "../components/InforCard";
import CCarousel from "../components/CCarousel.js";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const dummyInfo = {
  src: "https://picsum.photos/500/300",
  title: "2021 Complete Python Bootcamp From Zero to Hero in Python",
  kind: "Web Devevlopment",
  author: "Ba Tê",
  rate: 5,
  count: "700",
  currentPrice: "50",
  originPrice: "70",
  brief: "Java code giay",
  detail: [
    "Được code giấy",
    "Được code giấy",
    "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games",
    "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games",
    "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games",
    "Được code giấy",
  ],
  contents: [
    {
      name: "Chapter 1: Code giay dai cudai cudai cudai cudai cudai cuongz",
      link: "google.com",
    },
    {
      name: "Chapter 2: Code giay dai phap",
      link: "google.com",
    },
  ],
};
//✓
const dummyLecture = {
  src: "https://picsum.photos/300/200",
  title: "Ba Tee",
  kind: "Web Devevlopment",

  rate: 5,
  count: "700",
  brief:
    "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games",
};

const dummyDetail = dummyInfo.detail.map((val, index) => (
  <Grid key={index} item xs={6}>
    <Typography style={{ fontSize: "14" }}>✓ {val}</Typography>
  </Grid>
));
const dummyContents = dummyInfo.contents.map((val, index) => (
  <Grid key={index} item>
    <Typography
      style={{ fontSize: "14" }}
      onPress={() => Linking.openURL("http://google.com")}
    >
      {" "}
      {val.name}
    </Typography>
  </Grid>
));

const dummyCourse = [
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

const commentList = [
  {
    avt: "https://picsum.photos/25/25",
    name: "Ba Teez",
    time: "Today at 5:42PM",
    content: "How artistic!",
  },
  {
    avt: "https://picsum.photos/25/25",
    name: "eTez",
    time: "Today at 5:43PM",
    content: "Bad!",
  },
].map((val, index) => (
  <Comment key={index}>
    <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
    <Comment.Content>
      <Comment.Author as="a">{val.name}</Comment.Author>
      <Comment.Metadata>
        <div>{val.time}</div>
      </Comment.Metadata>
      <Comment.Text>{val.content}</Comment.Text>
    </Comment.Content>
  </Comment>
));
const isJoined = true;

const infoTextStyle = makeStyles({
  root: {
    marginTop: "10px",
    padding: "10px",
  },
  border: {
    border: "2px solid grey",
    borderRadius: "5px",
  },
  title: {
    fontWeight: "bold",
  },
});

const Detail = (props) => {
  const infoClass = infoTextStyle();
  return (
    <PageFrame>
      <InforCard
        src={dummyInfo.src}
        title={dummyInfo.title}
        author={dummyInfo.author}
        brief={dummyInfo.brief}
        rate={dummyInfo.rate}
        count={dummyInfo.count}
        price={dummyInfo.currentPrice}
        originPrice={dummyInfo.originPrice}
      />
      <Grid
        container
        xs={12}
        drirection="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid
          container
          xs={5}
          direction="column"
          className={`${infoClass.root} ${infoClass.border}`}
        >
          <Typography
            className={infoClass.title}
            variant="subtitle1"
            gutterBottom
            style={{ paddingTop: "1rem" }}
          >
            What you'll learn
          </Typography>
          <Grid container spacing={3} xs={12}>
            {dummyDetail}
          </Grid>
        </Grid>
        <Paper elevation={2} className={infoClass.root}>
          <Grid
            container
            spacing={1}
            direction="column"
            wrap="nowrap"
            style={{ padding: "10px" }}
          >
            <Typography
              className={infoClass.title}
              variant="subtitle1"
              gutterBottom
              style={{ paddingTop: "1rem" }}
            >
              What you'll learnzz
            </Typography>

            {dummyContents}
          </Grid>
        </Paper>
      </Grid>
      <h2>Lecture Information</h2>
      <InforCard
        src={dummyLecture.src}
        title={dummyLecture.title}
        brief={dummyLecture.brief}
        rate={dummyLecture.rate}
        count={dummyLecture.count}
        author={dummyLecture.kind}
      />

      <Comment.Group>
        <Header as="h2" dividing>
          Review
        </Header>
        {commentList}
        {isJoined == true ? (<Form reply>
          <Form.TextArea />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>): ""} 
        <Header as="h2" dividing>
          
        </Header>
      </Comment.Group>
      <h2>Relative Couses</h2>
      <CCarousel>{dummyCourse}</CCarousel>
    </PageFrame>
  );
};

export default Detail;
