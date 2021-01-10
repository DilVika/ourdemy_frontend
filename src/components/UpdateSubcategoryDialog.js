import React, {useEffect, useRef, useState} from "react";
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

const UpdateSubcategoryDialog = ({open, onClose, subcat, onSubmit}) => {
    const classes = useStyle()

    const nameRef = useRef(null);

    const [prevSubcat, setPrevSubcat] = useState(null);

    if (subcat !== prevSubcat) {
        if (nameRef.current) {
            nameRef.current.value = subcat.name
        }
        setPrevSubcat(subcat)
    }

    return (
        <>
            <Dialog open={open} onClose={() => onClose()}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Update category
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
                        defaultValue={subcat.name}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} color={"secondary"} onClick={
                        () => {
                            onClose()
                        }
                    }>
                        Cancel
                    </Button>
                    <Button variant={"contained"} color={"primary"} onClick={
                        () => {
                            onSubmit({
                                "id": subcat.scid,
                                "name": nameRef.current.value
                            })
                            onClose()
                        }
                    }>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UpdateSubcategoryDialog