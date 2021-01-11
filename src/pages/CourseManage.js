import React, {useEffect} from 'react';

import PageFrame from "../components/PageFrame";
import store from "../store";
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    Card, CardActions,
    CardContent,
    CardHeader,
    CardMedia, Checkbox,
    Chip, CircularProgress,
    Fab,
    Grid,
    ListItem,
    Paper,
    Typography
} from "@material-ui/core";
import {Add, Edit, VideoCall} from "@material-ui/icons";
import List from "@material-ui/core/List";
import data from "../ava.json"
import IconButton from "@material-ui/core/IconButton";
import {
    useHistory,
} from 'react-router-dom'
import {connect} from "react-redux";
import {fetchAllCoursesByMe} from "../store/course/lec";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        width: '100%',
    },
    main: {
        width: '80%',
    },
    card: {
        width: '90%'
    },
    loadingCenter: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

const CourseManage = ({courses, err, loading}) => {
    const classes = useStyles()
    const history = useHistory()

    useEffect(() => {
        store.dispatch(fetchAllCoursesByMe())
    }, [])

    return (<>
        <div className={classes.root}>
            <PageFrame>
                <div className={classes.main}>
                    {
                        loading || !courses ? <>
                            <div className={classes.loadingCenter}>
                                <CircularProgress/>
                            </div>
                        </> : <>
                            {
                                err ? <>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Typography color={"error"} component={"p"}>
                                                {err}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </> : <Grid container spacing={3}>
                                    {/*course list*/}
                                    <Grid item xs={9}>
                                        <div style={{maxHeight: '80vh', overflow: 'auto'}}>
                                            <List>
                                                {courses.map((course, index) => (
                                                    <ListItem key={course.id}>
                                                        <Card raised className={classes.card}>
                                                            <CardHeader
                                                                title={course.title}
                                                                subheader={
                                                                    <>
                                                                        <Chip
                                                                            label={course.category}
                                                                            color={"primary"}
                                                                        />
                                                                        <Chip
                                                                            style={{marginLeft: "5px"}}
                                                                            label={course.review_score.toFixed(2) + "/5.00"}
                                                                            color={"secondary"}
                                                                        />
                                                                        <Chip
                                                                            style={{marginLeft: "5px"}}
                                                                            label={course.chapters.length + " chapters"}
                                                                            color={"default"}
                                                                        />
                                                                    </>
                                                                }
                                                                action={
                                                                    <>
                                                                        <IconButton onClick={() => {
                                                                            const res = course.id.split("\"")
                                                                            const id = res[1]
                                                                            history.push(`/course/content/${id}`)
                                                                        }}>
                                                                            <VideoCall/>
                                                                        </IconButton>
                                                                        <IconButton onClick={() => {
                                                                            const res = course.id.split("\"")
                                                                            const id = res[1]
                                                                            history.push(`/course/update/${id}`)
                                                                        }}>
                                                                            <Edit/>
                                                                        </IconButton>
                                                                    </>
                                                                }
                                                            />
                                                            <CardMedia
                                                                style={{
                                                                    maxWidth: '200px',
                                                                    maxHeight: '500px'
                                                                }}
                                                                component={"img"}
                                                                src={"data:image/png;base64," + course.ava}
                                                            />
                                                            <CardContent>
                                                                <Typography variant={"body2"} color={"textSecondary"}>
                                                                    {course.short_desc}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </div>
                                    </Grid>
                                    {/*controls*/}
                                    <Grid item xs={3}>
                                        <Button variant={"outlined"} color={"primary"}
                                                onClick={() => history.push("/course/create")}>
                                            Create Course
                                        </Button>
                                    </Grid>
                                </Grid>
                            }
                        </>
                    }
                </div>
            </PageFrame>
        </div>
    </>)
}

const mapStateToProps = state => ({
    courses: state.lecCourse.myCourses,
    loading: state.lecCourse.fetchingMyCourses,
    err: state.lecCourse.fetchingMyCoursesErr
})

export default connect(
    mapStateToProps
)(CourseManage)