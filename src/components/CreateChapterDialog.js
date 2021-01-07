import React, {useEffect, useRef, useState} from "react";
import {
    AppBar, Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    FormControlLabel,
    makeStyles,
    TextField
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import store from "../store";
import {addChapter, lecCourseSlice} from "../store/course/lec";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
    },
}));

const CreateChapterDialog = ({open, onClose, cid, err, success}) => {
    const classes = useStyles()

    const nameRef = useRef('');
    const [isPreviewable, setIsPreviewable] = useState(false);

    useEffect(() => {
        return () => {
            store.dispatch(lecCourseSlice.actions.clearAddingChapterState())
        }
    }, [])

    useEffect(() => {
        if (success) {
            store.dispatch(lecCourseSlice.actions.clearAddingChapterState())
            onClose()
        }
    }, [success])

    return (
        <>
            <Dialog open={open} onClose={() => onClose()}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Create new chapter
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Chapter name"
                        type="text"
                        inputRef={nameRef}
                        fullWidth
                    />
                    <FormControlLabel
                        onChange={(e) => setIsPreviewable(e.target.checked)}
                        checked={isPreviewable}
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Previewable"
                    />
                    {
                        err ? <DialogContentText color={"error"}>
                            {err}
                        </DialogContentText> : null
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        store.dispatch(lecCourseSlice.actions.clearAddingChapterState())
                        onClose()
                    }} variant={"contained"} color={"secondary"}>
                        Cancel
                    </Button>
                    <Button variant={"contained"} color={"primary"} onClick={
                        () => {
                            store.dispatch(addChapter({
                                "cid": cid,
                                "title": nameRef.current.value,
                                "previewable": isPreviewable
                            }))
                        }
                    }>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

const mapStateToProps = state => ({
    creating: state.lecCourse.addingChapter,
    err: state.lecCourse.addChapterErr,
    success: state.lecCourse.addingChapterDone
})

export default connect(
    mapStateToProps
)(CreateChapterDialog)