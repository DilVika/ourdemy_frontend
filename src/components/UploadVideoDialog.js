import React, { useEffect, useRef, useState} from "react";
import {
    AppBar, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText, Grid, InputLabel, LinearProgress,
    makeStyles, MenuItem, Select,
    TextField
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import store from "../store";
import {lecCourseSlice, uploadVideo} from "../store/course/lec";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import {connect} from "react-redux";


const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        width: '40vw',
        height: '30vh',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
    },
    loadingCenter: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

const UploadVideoDialog = ({open, onClose, chapters, progress, uploading, finish, err, cid}) => {
    const classes = useStyles()

    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (chapters.length > 0) {
            setSelectedChapter(chapters[0].Id)
        }
    }, [chapters])

    useEffect(() => {
        if (finish) {
            store.dispatch(lecCourseSlice.actions.clearUploadVideoState())
            onClose()
        }
    }, [finish])

    const titleRef = useRef("");
    return (
        <div className={classes.root}>
            <Dialog open={open} onClose={() => onClose()}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Upload Video
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <div className={classes.content}>
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                                <InputLabel id={"chapter-video-select"}>
                                    Chapter
                                </InputLabel>
                                <Select
                                    labelId={"chapter-video-select"}
                                    id={"chapter-selector"}
                                    value={selectedChapter}
                                    onChange={(e) => setSelectedChapter(e.target.value)}
                                >
                                    {
                                        chapters.map((chapter, index) => (
                                            <MenuItem key={chapter.Id} value={chapter.Id}>
                                                {chapter.title}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin={"dense"}
                                    id={"title"}
                                    label={"Title"}
                                    type={"text"}
                                    inputRef={titleRef}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Dropzone
                                    styles={{ dropzone: { maxWidth: '30vw', maxHeight: '30vh', marginTop: '16px', marginLeft: '16px' } }}
                                    inputContent={(files, extra) => ('Drag video here')}
                                    onChangeStatus={(file, status) => {
                                        if (status === 'done') {
                                            setSelectedFile(file.file)
                                        }
                                    }}
                                    accept="video/*"
                                    submitButtonDisabled={true}
                                    maxFiles={1}
                                    multiple={false}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    {
                        err ? <>
                            <DialogContentText color={"error"}>
                                {err}
                            </DialogContentText>
                        </> : null
                    }
                </DialogContent>
                <DialogActions>
                    {
                        uploading ? <>
                            <div className={classes.loadingCenter}>
                                <LinearProgress/>
                            </div>
                        </> : <>
                            <Button onClick={() => onClose()} variant={"contained"} color={"secondary"}>
                                Cancel
                            </Button>
                            <Button variant={"contained"} color={"primary"} onClick={() => {
                                store.dispatch(uploadVideo({
                                    "title": titleRef.current.value,
                                    "file": selectedFile,
                                    "cid": cid,
                                    "chap_id": selectedChapter
                                }))
                            }}>
                                Upload
                            </Button>
                        </>
                    }
                </DialogActions>
            </Dialog>
        </div>
    )

}

const mapStateToProps = state => ({
    chapters: state.lecCourse.currentCourse ? state.lecCourse.currentCourse.chapters : [],
    uploading: state.lecCourse.uploadingVideo,
    finish: state.lecCourse.uploadingVideoDone,
    err: state.lecCourse.uploadingVideoErr,
})

export default connect(
    mapStateToProps
)(UploadVideoDialog)