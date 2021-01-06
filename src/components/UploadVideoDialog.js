import React, {useCallback, useRef, useState} from "react";
import {
    AppBar, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText, Grid, InputLabel,
    makeStyles, MenuItem, Select,
    TextField
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import store from "../store";
import {uploadVideo} from "../store/course/lec";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'


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
    dropzone: {
        width: '20vw',
        height: '20vh',
        marginTop: '16px'
    }
}));

const UploadVideoDialog = ({open, onClose, chapters, progress, cid}) => {
    const classes = useStyles()

    const [selectedChapter, setSelectedChapter] = useState(chapters[0]);
    const [selectedFile, setSelectedFile] = useState(null);

    const titleRef = useRef("");
    return (
        <div className={classes.root}>
            <Dialog open={open} onClose={() => onClose()}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Create new chapter
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
                                            <MenuItem key={chapter.ccid} value={chapter}>
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
                                    styles={classes.dropzone}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()} variant={"contained"} color={"secondary"}>
                        Cancel
                    </Button>
                    <Button variant={"contained"} color={"primary"} onClick={() => {
                        store.dispatch(uploadVideo({
                            "title": titleRef.current.value,
                            "file": selectedFile,
                            "cid": cid,
                            "chap_id": selectedChapter.ccid
                        }))
                        onClose()
                    }}>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default UploadVideoDialog