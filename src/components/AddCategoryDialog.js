import React, {useRef} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    AppBar, Button,
    Dialog, DialogActions,
    DialogContent,
    TextField
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
    },
}));

const AddCategoryDialog = ({open, onClose, onCreate}) => {
    const classes = useStyle()

    const nameRef = useRef('');

    return (
        <>
            <Dialog open={open} onClose={() => onClose()}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Create new category
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Category name"
                        type="text"
                        inputRef={nameRef}
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} color={"primary"} onClick={
                        () => {
                            onCreate({
                                "name": nameRef.current.value
                            })
                            onClose()
                        }
                    }>
                        Create
                    </Button>
                    <Button variant={"contained"} color={"secondary"} onClick={
                        () => {
                            onClose()
                        }
                    }>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddCategoryDialog