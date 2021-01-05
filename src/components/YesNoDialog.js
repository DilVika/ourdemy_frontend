import React from "react";
import {
    AppBar, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    makeStyles,
    Typography
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
    },
}));

const YesNoDialog = ({open, onClose, onCancel, onConfirm, title, content}) => {
    const classes = useStyles()

    return (
        <Dialog open={open} onClose={() => onClose()}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <DialogContentText>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} color={"secondary"} onClick={() => onCancel()}>
                    Cancel
                </Button>
                <Button variant={"contained"} color={"primary"} onClick={() => onConfirm()}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default YesNoDialog