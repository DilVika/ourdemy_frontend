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

const dummyHigh = {
  src: "https://picsum.photos/500/300",
  title: "2021 Complete Python Bootcamp From Zero to Hero in Python",
  kind: "Web Devevlopment",
  author: "Ba Tê",
  rate: 5,
  count: "700",
  currentPrice: "50",
  originPrice: "70",
  brief: "Java code giay",
};
// .map((val, index) => (
//   <ComplexCard
//     key={index}
//     className="item"
//     title={val.title}
//     price={val.currentPrice}
//     originPrice={val.originPrice}
//     kind={val.kind}
//     rate={val.rate}
//     count={val.count}
//     author={val.author}
//     imagesrc={val.src}

//   />
// ));
const cardStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "#1E1E1C",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    //fontSize: 14,
    color: "white",
  },
  subtitle: {
    fontSize: 14,
  },
  pos: {
    paddingTop: 12,
    marginBottom: 12,
  },
});

const detailStyle = makeStyles({
  paper: {
    //padding: theme.spacing(1),
    textAlign: "center",
    //color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    //marginBottom: theme.spacing(1),
  },
});
const Detail = (props) => {
  const cardClass = cardStyles();
  const detailClass = detailStyle();
  return (
    <PageFrame>
      <Paper elevation={3} className={cardClass.root}>
        <Grid
          container
          direction="row"
          wrap="nowrap"
          style={{ padding: "10px" }}
        >
          <img src={dummyHigh.src} />
          <Card
            className={cardClass.root}
            style={{ borderRadius: "0px 10px 10px 0px" }}
          >
            <CardContent>
              <Typography
                className={`${cardClass.title} ${cardClass.subtitle}`}
                gutterBottom
              >
                Ba Tee
              </Typography>
              <Typography className={cardClass.title} variant="" component="h2">
                {dummyHigh.title}
              </Typography>
              <Typography
                className={`${cardClass.pos}  ${cardClass.title} ${cardClass.subtitle}`}
              >
                Learn Python like a Professional Start from the basics and go
                all the way to creating your own applications and games
              </Typography>
              <Grid container direction="row" justify="start">
                <Rating size={15} rating={props.rate ?? 1} />
                <p
                  cardClass={cardClass.title}
                  style={{
                    color: "white",
                    margin: 0,
                    paddingLeft: "10px",
                    opacity: "0.65",
                  }}
                >
                  ( {props.count ?? "0"} )
                </p>
              </Grid>
            </CardContent>
            <CardActions style={{ padding: "15px" }}>
              <Grid
                container
                direction="row"
                wrap="nowrap"
                justify="space-between"
              >
                <Button variant="contained" size="small" color="secondary">
                  Enroll
                </Button>
                <Grid container direction="row" wrap="nowrap" justify="center">
                  <Typography
                    className={cardClass.title}
                    variant="h6"
                    style={{ fontWeight: "bold" }}
                  >
                    {"$" + (props.price ?? "0")}
                  </Typography>
                  <Typography
                    className={cardClass.title}
                    variant="subtitle"
                    style={{
                      textDecoration: "line-through",
                      // fontWeight: "lighter",
                      // fontSize:"1rem",
                      opacity: "0.65",
                      paddingInline: "5px",
                    }}
                  >
                    {props.originPrice ? "$" + props.originPrice : "$10"}
                  </Typography>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Paper>
      <Typography
        variant="subtitle1"
        gutterBottom
        style={{ paddingTop: "1rem" }}
      >
        Material-UI Grid:
      </Typography>
      <Grid container spacing={3} xs={6}>
        <Grid item xs={6}>
          <Typography className={`${cardClass.subtitle}`}>
            Learn Python like a Professional Start from the basics and go all
            the way to creating your own applications and games
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            className={`${cardClass.subtitle}`}
          >
            Learn Python like a Professional Start from the basics and go all
            the way to creating your own applications and games
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            className={` ${cardClass.subtitle}`}
          >
            Learn Python like a Professional Start from the basics and go all
            the way to creating your own applications and games
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            className={`${cardClass.subtitle}`}
          >
            Learn Python like a Professional Start from the basics and go all
            the way to creating your own applications and games
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            className={`${cardClass.subtitle}`}
          >
            Learn Python like a Professional Start from the basics and go all
            the way to creating your own applications and games
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            className={`${cardClass.subtitle}`}
          >
            Learn Python like a Professional Start from the basics and go all
            the way to creating your own applications and games
          </Typography>
        </Grid>
      </Grid>
    </PageFrame>
  );
};

export default Detail;
