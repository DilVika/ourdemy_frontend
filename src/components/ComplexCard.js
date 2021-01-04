import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Paper } from "@material-ui/core";
import Rating from "react-star-review";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 350,
    minWidth: 250,
    height: 350,
  },
  // header
  title: {
    display: "-webkit-box !important",
    "-webkit-line-clamp": 1,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  topPadding: {
    paddingTop: "5px"
  },
  content: {
    paddingLeft: "20px"   ,
  },
  
  subheader: {
    fontSize: "0.8rem",
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },


  // expand: {
  //   transform: "rotate(0deg)",
  //   marginLeft: "auto",
  //   transition: theme.transitions.create("transform", {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  // },
  // expandOpen: {
  //   transform: "rotate(180deg)",
  // },
}));

export default function ComplexCard(props) {
  const classes = useStyles();

  return (
    <div className={props.className}>
      <Paper elevation={2}>
        <Card  >
          <CardMedia
            className={classes.media}
            image={props.imagesrc ?? "https://picsum.photos/300/300"}
            title={props.title}
          />
          <CardHeader 
            //className={classes.topPadding}
            classes={{ title: classes.title, subheader: classes.subheader }}
            title={props.title ?? "The Course Name"}
            subheader={props.author}
          />
          <CardContent className={classes.topPadding}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {"$" + (props.price ?? "$10")}
            </Typography>
            <Grid container direction="row" justify="start">
              <Rating size={15} rating={props.rate ?? 1} />
              <p className={classes.content} style={{margin:0}} >( {props.count}  )</p>
            </Grid>
          </CardContent>
          <CardActions disableSpacing className={classes.topPadding}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Paper>
    </div>
  );
}
