import React from 'react';

import PageFrame from "../components/PageFrame";
import store from "../store";
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    Card, CardActions,
    CardContent,
    CardHeader,
    CardMedia, Checkbox,
    Chip,
    Fab,
    Grid,
    ListItem,
    Paper,
    Typography
} from "@material-ui/core";
import {Add, Edit} from "@material-ui/icons";
import List from "@material-ui/core/List";
import data from "../ava.json"
import IconButton from "@material-ui/core/IconButton";
import {
     useHistory,
} from 'react-router-dom'

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
    }

}))

const CourseManage = ({courses}) => {
    const classes = useStyles()
    const history = useHistory()

    return (<>
        <div className={classes.root}>
            <PageFrame>
                <div className={classes.main}>
                    <Grid container spacing={3}>
                        {/*course list*/}
                        <Grid item xs={9}>
                            <div style={{maxHeight: '80vh', overflow: 'auto'}}>
                                <List>
                                    {courses.map((course, index) => (
                                        <ListItem key={course.cid}>
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
                                                                label={course.chapterCount + " chapters"}
                                                                color={"default"}
                                                            />
                                                        </>
                                                    }
                                                    action={
                                                        <>
                                                            <IconButton onClick={() => (
                                                                    history.push(`/course/update/${course.cid}`)
                                                                )}>
                                                                <Edit/>
                                                            </IconButton>
                                                        </>
                                                    }
                                                />
                                                <CardMedia
                                                    component={"img"}
                                                    src={"data:image/png;base64," + course.ava}
                                                />
                                                <CardContent>
                                                    <Typography variant={"body2"} color={"textSecondary"}>
                                                        {course.shortDesc}
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
                            <Button variant={"outlined"} color={"primary"}>
                                Create Course
                            </Button>

                        </Grid>
                    </Grid>
                </div>
            </PageFrame>
        </div>
    </>)
}

CourseManage.defaultProps = {
    courses: [
        {
            "cid": "123",
            "category": "Cyberpunk 2077",
            "title": "How to get all legendary weapons",
            "review_score": 5.0,
            "ava": data.exampleAva1,
            "shortDesc": "Locations of 500 legendary weapons",
            "chapterCount": 5,
            "isDone": false,
        },
        {
            "cid": "124",
            "category": "Genshin",
            "title": "Best farming route guide",
            "review_score": 5.0,
            "ava": data.exampleAva2,
            "shortDesc": "Everyday route for f2p players",
            "chapterCount": 3,
            "isDone": true
        }
    ]
}

export default CourseManage