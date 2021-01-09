import React, {useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    InputLabel,
    MenuItem,
    Select,
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

const AddSubCategoryDialog = ({cats, open, onClose, err, success}) => {
    const classes = useStyle()

    const nameRef = useRef('');
    const [category, setCategory] = useState("")

    return (
        <>
            <Dialog open={open} onClose={() => onClose()}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Create new sub-category
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="sub-category name"
                        type="text"
                        inputRef={nameRef}
                        fullWidth
                    />
                    <InputLabel id={"category-select-label"} style={{marginTop: 30}}>
                        Category
                    </InputLabel>
                    <Select
                        style={{marginTop: 10}}
                        labelId={"category-select-label"}
                        id={"category-select"}
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                    >
                        {
                            cats.map((cat) => (
                                <MenuItem key={cat.cid} value={cat}>
                                    {cat.cat_name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} color={"primary"} onClick={
                        () => {}
                    }>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddSubCategoryDialog