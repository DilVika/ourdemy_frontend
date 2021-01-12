import PageFrame from "../components/PageFrame";
import React, {useEffect, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ComplexCard from "../components/ComplexCard";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InforCard from "../components/InforCard";
import CCarousel from "../components/CCarousel.js";
import {Button, Comment, Form, Header, Pagination, Rating} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import {detailSlice, fetchCourse} from "../store/course/detail/detail";
import store from "../store";
import {
    useParams
} from 'react-router-dom'
import {connect} from "react-redux";
import {Avatar, Chip, CircularProgress, Divider} from "@material-ui/core";
import {checkJoin, joinCourse, joinSlice} from "../store/course/detail/join";
import {commentsSlice, fetchComments, fetchMyComment, sendComment} from "../store/course/detail/comment";
import AnnounceDialog from "../components/AnnounceDialog";
import {fetchRelevance, relSlice} from "../store/course/detail/relevance";

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
        {
            name: "Chapter 2: Code giay dai phap",
            link: "google.com",
        },
        {
            name: "Chapter 2: Code giay dai phap",
            link: "google.com",
        },
        {
            name: "Chapter 2: Code giay dai phap",
            link: "google.com",
        },
        {
            name: "Chapter 2: Code giay dai phap",
            link: "google.com",
        },
        {
            name: "Chapter 2: Code giay dai phap",
            link: "google.com",
        },
        {
            name: "Chapter 2: Code giay dai phap",
            link: "google.com",
        },
        {
            name: "Chapter 2: Code giay dai phap",
            link: "google.com",
        },
        {
            name: "Chapter 2: Code giay dai phap",
            link: "google.com",
        },
        {
            name: "Chapter 2: Code giay dai phap",
            link: "google.com",
        },
        {
            name: "Chapter 2: Code giay dai phap",
            link: "google.com",
        },
        {
            name: "Chapter 2: Code giay dai phap",
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
        <Typography style={{fontSize: "14"}}>✓ {val}</Typography>
    </Grid>
));
const dummyContents = dummyInfo.contents.map((val, index) => (
    <Grid key={index} item>
        <Typography
            style={{fontSize: "14"}}
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

const useStyle = makeStyles({
    root: {
        marginTop: "10px",
        padding: "10px",
    },
    border: {
        border: "2px solid grey",
        borderRadius: "5px",
        padding: '8px'
    },
    title: {
        fontWeight: "bold",
    },
    loadingCenter: {
        display: 'flex',
        justifyContent: 'center'
    },
});

const Detail = ({
                    course,
                    courseLoading,
                    courseErr,
                    joined,
                    authed,
                    comments,
                    commentsLoading,
                    commentsErr,
                    commenting,
                    commentSuccess,
                    myComment,
                    relevance
                }) => {
    const classes = useStyle()
    const {id} = useParams()

    const [curStar, setCurStar] = useState(5);
    const [curComment, setCurComment] = useState("");
    const [commentPage, setCommentPage] = useState(0);

    useEffect(() => {
        store.dispatch(fetchCourse({"id": id}))
        store.dispatch(checkJoin({"id": id}))
        store.dispatch(fetchComments({"id": id}))
        store.dispatch(fetchMyComment({"id": id}))
        store.dispatch(fetchRelevance({"id": id}))

        return () => {
            store.dispatch(detailSlice.actions.clear())
            store.dispatch(joinSlice.actions.clear())
            store.dispatch(commentsSlice.actions.clear())
            store.dispatch(relSlice.actions.clear())
        }
    }, [])

    return (
        <PageFrame>
            {
                courseErr ?
                    <Typography color={"error"}>
                        {courseErr}
                    </Typography> :
                    <>
                        {
                            !course || courseLoading ?
                                <div className={classes.loadingCenter}>
                                    <CircularProgress/>
                                </div> :
                                <>
                                    <InforCard
                                        src={`data:image/png;base64,${course.ava}`}
                                        title={course.title}
                                        author={course.category}
                                        brief={course.short_desc}
                                        rate={course.review_score}
                                        count={10} //TODO change to count
                                        price={(Math.fround(course.discount) < Math.fround(0.0001)) ? null : course.fee * (1 - course.discount)}
                                        originPrice={course.fee}
                                        lecturer={course.lecturer}
                                        lecturer_email={course.lecturer_email}
                                        joined={joined}
                                        authed={authed}
                                        onEnroll={() => {
                                            store.dispatch(joinCourse({
                                                "id": id
                                            }))
                                        }
                                        }
                                    />
                                    <Grid
                                        container
                                        drirection="row"
                                        justify="space-between"
                                        alignItems="flex-start"
                                    >
                                        <Grid item xs={12}>
                                            <Grid
                                                container
                                                className={`${classes.root}`}
                                                spacing={3}
                                            >
                                                <Grid item xs={5} className={classes.border}>
                                                    <Typography
                                                        className={`${classes.title}`}
                                                        variant="subtitle1"
                                                        gutterBottom
                                                        style={{paddingTop: "1rem"}}>
                                                        What you'll learn
                                                    </Typography>
                                                    <Typography dangerouslySetInnerHTML={{__html: course.full_desc}}/>
                                                </Grid>
                                                <Grid item xs={2}/>
                                                <Grid item xs={5}>
                                                    <Paper elevation={2} className={classes.root}>
                                                        <Grid
                                                            container
                                                            spacing={1}
                                                            wrap="nowrap"
                                                        >
                                                            <Grid item xs={12}>
                                                                <Typography
                                                                    className={classes.title}
                                                                    variant="subtitle1"
                                                                    gutterBottom
                                                                    style={{paddingTop: "1rem"}}
                                                                >
                                                                    Chapters
                                                                </Typography>
                                                                {
                                                                    course.chapters.map((chapter, index) => {
                                                                        return (<Typography
                                                                            key={chapter.Id}
                                                                            onPress={() => Linking.openURL("http://google.com")}
                                                                            style={{
                                                                                fontSize: "14",
                                                                                marginTop: '8px',
                                                                                marginBottom: '8px'
                                                                            }}
                                                                        >
                                                                            {" "}
                                                                            {`${index + 1}.${chapter.title}`}
                                                                            {
                                                                                chapter.previewable ?
                                                                                    <Chip color={"secondary"}
                                                                                          style={{marginLeft: '8px'}}
                                                                                          label={"Previewable"}/> : null
                                                                            }
                                                                        </Typography>)
                                                                    })
                                                                }
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Comment.Group>
                                        <Header as="h2" dividing>
                                            Review
                                        </Header>
                                        {
                                            commentsLoading ? <div className={classes.loadingCenter}>
                                                <CircularProgress/>
                                            </div> : <>
                                                {
                                                    commentsErr ? <Typography color={"error"}>
                                                        {commentsErr}
                                                    </Typography> : null
                                                }
                                                {comments
                                                    .slice(commentPage * 10, commentPage * 10 + 10)
                                                    .map((comment, index) => {
                                                        return (<div key={comment.id}>
                                                            <Comment style={{marginTop: '4px', marginBottom: '4px'}}
                                                            >
                                                                <Comment.Content>
                                                                    <Comment.Author>{comment.username}</Comment.Author>
                                                                    <Comment.Metadata>
                                                                        <div>{comment.time}</div>
                                                                        <Rating disabled rating={comment.score}
                                                                                maxRating={5}/>
                                                                    </Comment.Metadata>
                                                                    <Comment.Text>{comment.content}</Comment.Text>
                                                                </Comment.Content>
                                                            </Comment>
                                                            <Divider style={{marginBottom: '4px'}}/>
                                                        </div>)
                                                    })}
                                                {
                                                    comments.length > 0 ? <Pagination
                                                        totalPages={(comments && Math.floor((comments.length / 10 + 1))) || 0}
                                                        shape="rounded"
                                                        page={commentPage}
                                                        onPageChange={(_, p) => setCommentPage(p.activePage)}
                                                    /> : null
                                                }
                                            </>
                                        }
                                        {joined && authed ? (
                                            <>
                                                {
                                                    !myComment ?
                                                        <Form reply>
                                                            <Typography variant={"h5"}>
                                                                Comment
                                                            </Typography>
                                                            <Rating
                                                                onRate={(e, d) => {
                                                                    setCurStar(d.rating)
                                                                }}
                                                                icon='star'
                                                                defaultRating={5}
                                                                maxRating={5}/>
                                                            <Form.TextArea onChange={(e, d) => {
                                                                setCurComment(d.value)
                                                            }}/>
                                                            {
                                                                commenting ? <div className={classes.loadingCenter}>
                                                                    <CircularProgress/>
                                                                </div> : <Button
                                                                    content="Add Reply"
                                                                    labelPosition="left"
                                                                    icon="edit"
                                                                    primary
                                                                    onClick={() => {
                                                                        store.dispatch(sendComment(
                                                                            {
                                                                                "id": id,
                                                                                "content": curComment,
                                                                                "score": curStar
                                                                            }
                                                                        ))
                                                                    }
                                                                    }
                                                                />
                                                            }
                                                        </Form> :
                                                        <div style={{marginTop: '16px'}}>
                                                            <Typography variant={"h5"}>
                                                                My Comment
                                                            </Typography>
                                                            <Comment style={{marginTop: '4px', marginBottom: '4px'}}
                                                            >
                                                                <Comment.Content>
                                                                    <Comment.Author>{myComment.username}</Comment.Author>
                                                                    <Comment.Metadata>
                                                                        <div>{myComment.time}</div>
                                                                        <Rating disabled rating={myComment.score}
                                                                                maxRating={5}/>
                                                                    </Comment.Metadata>
                                                                    <Comment.Text>{myComment.content}</Comment.Text>
                                                                </Comment.Content>
                                                            </Comment>
                                                        </div>
                                                }
                                            </>) : null}
                                        <Header as="h2" dividing>
                                        </Header>
                                    </Comment.Group>
                                    <AnnounceDialog open={commentSuccess} title={"Success"}
                                                    content={"Your review has been received"} onClose={() => {
                                        store.dispatch(commentsSlice.actions.clearSuccess())
                                    }
                                    }/>
                                    <h2>Relative Couses</h2>
                                    <CCarousel>
                                        {
                                            relevance.map((course, index) => {
                                                return (
                                                    <ComplexCard
                                                        key={course.id}
                                                        className="item"
                                                        title={course.title}
                                                        price={course.currentPrice}
                                                        kind={course.category}
                                                        rate={course.review_score}
                                                        count={10}
                                                        author={course.lecturer}
                                                        imagesrc={`data:image/png;base64,${course.ava}`}
                                                    />
                                                )
                                            })
                                        }
                                    </CCarousel>
                                </>
                        }
                    </>
            }
        </PageFrame>
    );
}

const mapStateToProps = state => (
    {
        course: state.detail.course,
        courseLoading:
        state.detail.fetching,
        courseErr:
        state.detail.err,
        comments:
        state.comment.comments,
        commentsLoading:
        state.comment.fetching,
        commentsErr:
        state.comment.err,
        authed:
            !!state.authen.token,
        joined:
        state.join.joined,
        commenting:
        state.comment.commenting,
        commentSuccess:
        state.comment.success,
        myComment: state.comment.myComment,
        relevance: state.rel.relevance
    }
)

export default connect(
    mapStateToProps
)(Detail)
