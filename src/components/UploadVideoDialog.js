import React, {useRef, useState} from "react";
import {
    AppBar, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText, Grid, InputLabel,
    makeStyles, Select,
    TextField
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'


const useStyles = makeStyles((theme) => ({
    root: {},
    content: {},
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
    },
    dropzone: {
        width: '30vw',
        marginTop: '16px'
    }
}));

const UploadVideoDialog = ({open, onClose, chapters}) => {
    const classes = useStyles()

    const [selectedChapter, setSelectedChapter] = useState(chapters[0]);

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
                                <InputLabel id={"category-select-chapter-label"}>
                                    Chapter
                                </InputLabel>
                                <Select
                                    labelId={"category-select-chapter-label"}
                                    value={selectedChapter}
                                    onChange={(e) => setSelectedChapter(e.target.value)}
                                >
                                    {
                                        chapters.map((chapter, index) => (
                                            <option ket={chapter.ccid}>
                                                {
                                                    chapter.name
                                                }
                                            </option>
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
                                <div className={classes.dropzone}>
                                    <Dropzone
                                        inputContent={"Drop your video here"}
                                        maxFiles={1}
                                        submitButtonDisabled={true}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()} variant={"contained"} color={"secondary"}>
                        Cancel
                    </Button>
                    <Button variant={"contained"} color={"primary"}>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default UploadVideoDialog