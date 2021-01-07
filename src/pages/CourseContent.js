import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PageFrame from "../components/PageFrame";
import {
    Button, Chip, CircularProgress,
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
import {
    useHistory
} from 'react-router-dom'
import {Delete} from "@material-ui/icons";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import CreateChapterDialog from "../components/CreateChapterDialog";
import {connect} from "react-redux";
import store from "../store";
import {changeStatus, deleteChapter, deleteVideo, fetchCurrentCourse, lecCourseSlice} from "../store/course/lec";
import {Route, useParams} from "react-router-dom";
import UploadVideoDialog from "../components/UploadVideoDialog";

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

const CourseContent = ({courseContent, itemOpen, deletingErr, err, fetching}) => {
    const classes = useStyles()
    const {id} = useParams()

    const history = useHistory()

    const [createChapterDialogOpen, setCreateChapterDialogOpen] = useState(false);
    const [uploadVideoDialogOpen, setUploadVideoDialogOpen] = useState(false);

    useEffect(() => {
        store.dispatch(fetchCurrentCourse(id))
        return () => {
            store.dispatch(lecCourseSlice.actions.clearCourseContentState())
        }
    }, [])

    const toggleItem = (index, open) => {
        store.dispatch(lecCourseSlice.actions.toggleItem({index, open}))
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
                                            <Paper elevation={3} key={chapter.Id} style={{marginBottom: '8px'}}>
                                                <ListItem button>
                                                    <ListItemText>
                                                        {chapter.title}
                                                    </ListItemText>
                                                    {
                                                        chapter.previewable ? <Chip
                                                            label={"Previewable"}
                                                            color={"primary"}
                                                        /> : null
                                                    }
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
                                                            <IconButton onClick={() => {
                                                                store.dispatch(deleteChapter({
                                                                    "chap_id": chapter.Id,
                                                                }))
                                                            }
                                                            }>
                                                                <Delete/>
                                                            </IconButton>
                                                    }
                                                </ListItem>
                                                {
                                                    itemOpen[index].open ?
                                                        <Collapse in={itemOpen[index].open} timeout="auto"
                                                                  unmountOnExit>
                                                            <List disablePadding>
                                                                {
                                                                    chapter.videos.map((video, vindex) => (
                                                                        <ListItem key={video.Id} button>
                                                                            <ListItemText
                                                                                inset
                                                                                primary={`${vindex + 1}. ${video.title}`}
                                                                            />
                                                                            <IconButton onClick={() => {
                                                                                store.dispatch(deleteVideo({
                                                                                    "cid": id,
                                                                                    "chap_id": chapter.Id,
                                                                                    "vid": video.Id,
                                                                                }))
                                                                            }
                                                                            }>
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
                                    <Button style={{marginTop: '8px'}} variant={"contained"} color={"primary"}
                                            onClick={() => setUploadVideoDialogOpen(true)}>
                                        Add Video
                                    </Button>
                                    {
                                        courseContent.is_done ?
                                            <Button style={{marginTop: '8px'}} variant={"contained"}
                                                    color={"secondary"} onClick={() => {
                                                store.dispatch(changeStatus(
                                                    {
                                                        "cid": id,
                                                        "changeOption": "markUndone",
                                                    }
                                                ))
                                            }
                                            }>
                                                Mark Undone
                                            </Button> :
                                            <Button style={{marginTop: '8px'}} variant={"contained"}
                                                    color={"secondary"} onClick={() => {
                                                store.dispatch(changeStatus(
                                                    {
                                                        "cid": id,
                                                        "changeOption": "markDone",
                                                    }
                                                ))
                                            }
                                            }>
                                                Mark Done
                                            </Button>
                                    }
                                    <Button style={{marginTop: '8px'}} variant={"contained"} color={"default"}
                                            onClick={() => history.push("/course/manage")}>
                                        {'< Return'}
                                    </Button>
                                </div>
                            </Grid>
                        </Grid> : <Grid container spacing={3}>
                            <CircularProgress/>
                        </Grid>
                    }
                </div>
            </PageFrame>

            {
                courseContent ?
                    <>
                        <CreateChapterDialog open={createChapterDialogOpen}
                                             onClose={() => setCreateChapterDialogOpen(false)}
                                             cid={id}
                        />
                        <UploadVideoDialog open={uploadVideoDialogOpen} onClose={() => setUploadVideoDialogOpen(false)}
                                           cid={id}/>
                    </> : null
            }
        </div>
    )
}

const mapStateToProps = state => ({
    err: state.lecCourse.currentCourseErr,
    fetching: state.lecCourse.currentCourseFetching,
    courseContent: state.lecCourse.currentCourse,
    itemOpen: state.lecCourse.currentCourseIsExpand,
    deletingErr: state.lecCourse.deletingErr
})
export default connect(
    mapStateToProps
)(CourseContent)