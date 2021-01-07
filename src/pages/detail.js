import PageFrame from "../components/PageFrame";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Rating from "react-star-review";
import Paper from "@material-ui/core/Paper";
import InforCard from "../components/InforCard";

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
    "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games",
    "Được code giấy",
    "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games",
    "Được code giấy",
    "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games",
    "Được code giấy",
  ],
  contents: [
    {
      name: "Chapter 1: Code giay dai cudai cudai cudai cudai cudai cudai cudai cudai cuongz",
      link: "google.com",
    },
    {
      name: "Chapter 2: Code giay dai phap",
      link: "google.com",
    },
  ],
};
//✓
const dummyDetail = dummyInfo.detail.map((val, index) => (
  <Grid key={index} item xs={6}>
    <Typography style={{ fontSize: "14" }}>✓ {val}</Typography>
  </Grid>
));
const dummyContents = dummyInfo.contents.map((val, index) => (
  <Grid key={index} item xs={12} >
    <Typography
      style={{ fontSize: "14" }}
      onPress={() => Linking.openURL("http://google.com")}
    >
      {" "}
      {val.name}
    </Typography>
  </Grid>
));

const infoTextStyle = makeStyles({
  root: {
    border: "2px solid grey",
    marginTop: "10px",
    padding: "10px",
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
      <InforCard />
      <Grid container xs={12} drirection="row" justify="space-between">
        <Grid container xs={5} direction="column" className={infoClass.root}>
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
        <Grid container xs={6} direction="column" className={infoClass.root}>
          <Typography
            className={infoClass.title}
            variant="subtitle1"
            gutterBottom
            style={{ paddingTop: "1rem" }}
          >
            What you'll learnzz
          </Typography>
          <Grid container direction="column" spacing={3} xs={12}>
            {dummyContents}
          </Grid>
        </Grid>
      </Grid>
    </PageFrame>
  );
};

export default Detail;
