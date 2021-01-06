import React, {useRef, useState} from "react";
import {
    AppBar, Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    FormControlLabel,
    makeStyles,
    TextField
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import store from "../store";
import {addChapter, lecCourseSlice} from "../store/course/lec";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
    },
}));

const CreateChapterDialog = ({open, onClose, cid}) => {
    const classes = useStyles()

    const nameRef = useRef('');
    const [isPreviewable, setIsPreviewable] = useState(false);

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
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()} variant={"contained"} color={"secondary"}>
                        Cancel
                    </Button>
                    <Button variant={"contained"} color={"primary"} onClick={
                        () => {
                            store.dispatch(addChapter({
                                "cid": cid,
                                "title": nameRef.current.value,
                                "previewable": isPreviewable
                            }))
                            onClose()
                        }
                    }>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default CreateChapterDialog