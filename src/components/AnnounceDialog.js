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

const AnnounceDialog = ({open, onClose, title, content}) => {
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
                <Button variant={"contained"} color={"primary"} onClick={() => onClose()}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AnnounceDialog