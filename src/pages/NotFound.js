import React from "react";
import {DialogActions, DialogTitle, makeStyles, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    },
    errPaper: {
        width: '300px',
        // height: '0px',
        justifyContent: 'center',
    }
}));

const NotFound = () => {
    const classes = useStyles()
    return (
        <div className={classes.center}>
            <Paper elevation={2} square>
                <div className={classes.errPaper}>
                    <DialogTitle>
                        <Typography variant="h6" align="center" display={"block"} color="error">
                            404 Not found :(
                        </Typography>
                    </DialogTitle>
                    <Divider/>
                    <DialogActions>
                        <Button>
                            <Link to={"/"}>
                                Home
                            </Link>
                        </Button>
                    </DialogActions>
                </div>
            </Paper>
        </div>
    );
}

export default NotFound