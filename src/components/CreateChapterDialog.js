import React, {useRef} from "react";
import {
    AppBar, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    makeStyles,
    TextField
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
    },
}));

const CreateChapterDialog = ({open, onClose}) => {
    const classes = useStyles()

    const nameRef = useRef('');

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
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()} variant={"contained"} color={"secondary"}>
                        Cancel
                    </Button>
                    <Button variant={"contained"} color={"primary"}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default CreateChapterDialog