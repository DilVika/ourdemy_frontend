import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {Chip, Paper} from "@material-ui/core";
import Rating from "react-star-review";
import Grid from "@material-ui/core/Grid";
import {useHistory} from 'react-router-dom';
import {connect} from "react-redux";
import {addFav, favSlice} from "../store/course/fav/fav";
import AnnounceDialog from "./AnnounceDialog";
import store from "../store";

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
        paddingTop: "5px",
    },
    content: {
        paddingLeft: "20px",
    },

    subheader: {
        fontSize: "0.8rem",
    },

    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },

    alignText: {
        alignSelf: "center"
    }
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

function ComplexCard(props) {
    const classes = useStyles();
    const history = useHistory()
    const ids = props.id ? props.id.split("\"") : ["", "1", ""]

    return (
        <>
            <div className={props.className}>
                <Paper elevation={2}>
                    <Card>
                        <CardMedia
                            className={classes.media}
                            image={props.imagesrc ?? "https://picsum.photos/300/300"}
                            title={props.title}
                        />
                        <CardHeader
                            //className={classes.topPadding}
                            classes={{title: classes.title, subheader: classes.subheader}}
                            title={props.title ?? "The Course Name"}
                            subheader={props.author}
                            onClick={() => history.push(`/detail/${ids[1]}`)}
                        />
                        <CardContent className={classes.topPadding}>
                            <Grid
                                container
                                direction="row"
                                justify="start"
                                alignContent="center"
                            >
                                <Typography variant="h6" style={{fontWeight: "bold"}}>
                                    {"$" + (props.price ?? "10")}
                                </Typography>
                                <Typography className={classes.alignText}
                                            variant="subtitle"
                                            style={{
                                                textDecoration: "line-through",
                                                // fontWeight: "lighter",
                                                // fontSize:"1rem",
                                                opacity: "0.5",
                                                paddingInline: "5px",
                                            }}
                                >
                                    {(props.originPrice ? ("$" + props.originPrice) : "")}
                                </Typography>
                            </Grid>

                            <Grid container direction="row" justify="start">
                                <Rating size={15} rating={props.rate ?? 1}/>
                                <p className={classes.content} style={{margin: 0, opacity: "0.5",}}>
                                    ( {props.count} )
                                </p>
                            </Grid>
                        </CardContent>
                        <CardContent className={classes.topPadding}>
                            <Chip color={props.is_done ? "primary" : "secondary"}
                                  label={props.is_done ? "Done" : "Ongoing"}/>
                        </CardContent>
                        <CardActions disableSpacing className={classes.topPadding}>
                            <Grid
                                container
                                direction="row"
                                justify="stretch"

                            >
                                {
                                    props.authed ? <IconButton aria-label="add to favorites" onClick={() => {
                                        store.dispatch(addFav({
                                            "id": ids[1]
                                        }))
                                    }
                                    }>
                                        <FavoriteIcon/>
                                    </IconButton> : null
                                }
                                <Typography
                                    className={classes.alignText}
                                    variant="subtitle"
                                    style={{
                                        // textDecoration: "line-through",
                                        // fontWeight: "lighter",
                                        // fontSize:"1rem",
                                        color: "white",
                                        background: "#ed730e",
                                        borderRadius: "7px",
                                        //opacity: "0.5",
                                        paddingInline: "5px",
                                    }}
                                >
                                    {(props.kind ?? "Web Dev")}
                                </Typography>
                            </Grid>
                        </CardActions>
                    </Card>
                </Paper>
            </div>
            <AnnounceDialog open={props.favSuccess} onClose={() => {
                store.dispatch(favSlice.actions.clear())
            }} title={"Add success"} content={"Added to favorite"}/>
            <AnnounceDialog open={props.favErr != null} onClose={() => {
                store.dispatch(favSlice.actions.clear())
            }} title={"Add error"} content={props.favErr}/>
        </>
    );
}

const mapStateToProps = state => ({
    authed: !!state.authen.token,
    favSuccess: state.fav.success,
    favErr: state.fav.err
})

export default connect(
    mapStateToProps
)(ComplexCard)