import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import Rating from "react-star-review";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button"

// const dummyHigh = {
//   src: "https://picsum.photos/500/300",
//   title: "2021 Complete Python Bootcamp From Zero to Hero in Python",
//   kind: "Web Devevlopment",
//   author: "Ba Tê",
//   rate: 5,
//   count: "700",
//   currentPrice: "50",
//   originPrice: "70",
//   brief: "Java code giay",
// };

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
const InforCard = (props) => {
    const cardClass = cardStyles();
  return (
    <Paper elevation={3} className={cardClass.root}>
      <Grid container direction="row" wrap="nowrap" style={{ padding: "10px" }}>
        <img src={props.src} />
        <Card
          className={cardClass.root}
          style={{ borderRadius: "0px 10px 10px 0px" }}
        >
          <CardContent>
            <Typography
              className={`${cardClass.title} ${cardClass.subtitle}`}
              gutterBottom
            >
              {props.author}
            </Typography>
            <Typography className={cardClass.title} variant="" component="h2">
              {props.title}
            </Typography>
            <Typography
              className={`${cardClass.pos}  ${cardClass.title} ${cardClass.subtitle}`}
            >
               {props.brief}
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
              {props.price ? (<Button variant="contained" size="small" color="secondary">Enroll</Button> ) : ""}
              
              <Grid container direction="row" wrap="nowrap" justify="center">
                <Typography
                  className={cardClass.title}
                  variant="h6"
                  style={{ fontWeight: "bold" }}
                >
                  {(props.price ? ("$"+props.price) : "")}
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
                  {props.originPrice ? "$" + props.originPrice : ""}
                </Typography>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Paper>
  );
};

export default InforCard;