import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PageFrame from "../components/PageFrame";
import {
    Button, CircularProgress,
    Collapse,
    Grid,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper
} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import CreateChapterDialog from "../components/CreateChapterDialog";
import {connect} from "react-redux";
import store from "../store";
import {fetchCurrentCourse, lecCourseSlice} from "../store/course/lec";
import {Route, useParams} from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        display: 'block',
        width: '100%',
    },
    main: {
        width: '99%',
    },
    buttonBar: {
        marginTop: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
    },
}))

const CourseContent = ({courseContent, itemOpen}) => {
    const classes = useStyles()
    const {id} = useParams()

    const [createChapterDialogOpen, setCreateChapterDialogOpen] = useState(false);

    useEffect(() => {
        store.dispatch(fetchCurrentCourse(id))
    }, [])

    const toggleItem = (index, open) => {
        store.dispatch(lecCourseSlice.actions.toggleItem({index, open}))
        // const itemOpenCopy = [...itemOpen]
        // itemOpenCopy[index].open = open
        // setItemOpen(itemOpenCopy)
    }

    return (
        <div className={classes.root}>
            <PageFrame>
                <div className={classes.main}>
                    {
                        courseContent ? <Grid container spacing={3}>
                            <Grid item xs={9}>
                                <List>
                                    {
                                        courseContent.chapters.map((chapter, index) => (
                                            <Paper elevation={3} key={chapter.ccid} style={{marginBottom: '8px'}}>
                                                <ListItem button>
                                                    <ListItemText>
                                                        {chapter.name}
                                                    </ListItemText>
                                                    {
                                                        itemOpen[index].expandable ?
                                                            <>
                                                                {
                                                                    <IconButton
                                                                        onClick={() => toggleItem(index, !itemOpen[index].open)}>
                                                                        {
                                                                            itemOpen[index].open ?
                                                                                <IconExpandLess/> :
                                                                                <IconExpandMore/>
                                                                        }
                                                                    </IconButton>
                                                                }
                                                            </> :
                                                            <IconButton>
                                                                <Delete/>
                                                            </IconButton>
                                                    }
                                                </ListItem>
                                                {
                                                    itemOpen[index].open ?
                                                        <Collapse in={itemOpen[index].open} timeout="auto" unmountOnExit>
                                                            <List disablePadding>
                                                                {
                                                                    chapter.videos.map((video, vindex) => (
                                                                        <ListItem key={video.vid} button>
                                                                            <ListItemText
                                                                                inset
                                                                                primary={`${vindex + 1}. ${video.title}`}
                                                                            />
                                                                            <IconButton>
                                                                                <Delete/>
                                                                            </IconButton>
                                                                        </ListItem>
                                                                    ))
                                                                }
                                                            </List>
                                                        </Collapse> : null
                                                }
                                            </Paper>
                                        ))
                                    }
                                </List>
                            </Grid>
                            <Grid item xs={3}>
                                <div className={classes.buttonBar}>
                                    <Button variant={"contained"} color={"primary"}
                                            onClick={() => setCreateChapterDialogOpen(true)}>
                                        Add Chapter
                                    </Button>
                                    <Button style={{marginTop: '8px'}} variant={"contained"} color={"primary"}>
                                        Add Video
                                    </Button>
                                    {
                                        courseContent.isDone ?
                                            <Button style={{marginTop: '8px'}} variant={"contained"}
                                                    color={"secondary"}>
                                                Mark Undone
                                            </Button> :
                                            <Button style={{marginTop: '8px'}} variant={"contained"}
                                                    color={"secondary"}>
                                                Mark Done
                                            </Button>
                                    }
                                </div>
                            </Grid>
                        </Grid> : <Grid container spacing={3}>
                            <CircularProgress/>
                        </Grid>
                    }
                </div>
            </PageFrame>
            <CreateChapterDialog open={createChapterDialogOpen}
                                 onClose={() => setCreateChapterDialogOpen(false)}/>
        </div>
    )
}

const mapStateToProps = state => ({
    err: state.lecCourse.currentCourseErr,
    fetching: state.lecCourse.currentCourseFetching,
    courseContent: state.lecCourse.currentCourse,
    itemOpen: state.lecCourse.currentCourseIsExpand,
})
export default connect(
    mapStateToProps
)(CourseContent)