import React from 'react';

import PageFrame from "../components/PageFrame";
import store from "../store";
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Fab,
    Grid,
    ListItem,
    Paper,
    Typography
} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import List from "@material-ui/core/List";
import data from "../ava.json"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        width: '100%',
    },
    main: {
        width: '80%',
    },
    card: {
        width: '10%'
    }

}))

const CourseManage = ({courses}) => {
    const classes = useStyles()

    console.log(courses)

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
                                            <Card raised className={classes.root}>
                                                <CardHeader
                                                    title={course.title}
                                                    subheader={
                                                        <Chip
                                                            label={course.category}
                                                            color={"primary"}
                                                        />
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
            "ava": data.exampleAva,
            "shortDesc": "Locations of 500 legendary weapons",
            "chapterCount": 5,
        },
        {
            "cid": "124",
            "category": "Genshin",
            "title": "Best farming route guide",
            "review_score": 5.0,
            "ava": data.exampleAva,
            "shortDesc": "Everyday route for f2p players",
            "chapterCount": 3,
        }
    ]
}

export default CourseManage