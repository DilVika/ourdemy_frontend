import {AppBar, CircularProgress, makeStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import store from "../store";
import {authenSlice, signin, signup} from "../store/authen";
import Dialog from "@material-ui/core/Dialog";
import React, {useRef} from "react";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
    },
}));

const SignInDialog = ({open, onClose, err, loading, finish}) => {
    const classes = useStyles();

    const unameRef = useRef("");
    const passRef = useRef("");

    return (
        finish ? <Dialog open={open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Sign in finished
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogActions>
                    <Button onClick={() => onClose()} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog> :
        <Dialog open={open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Sign In
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="username"
                    type="text"
                    inputRef={unameRef}
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    inputRef={passRef}
                    fullWidth
                />
                {err ? <DialogContentText>
                    <Typography color='error' component={'span'}>
                        {err}
                    </Typography>
                </DialogContentText> : null}
            </DialogContent>
            <DialogActions>
                {!loading ? <div>
                    <Button onClick={() => store.dispatch(authenSlice.actions.otpMode())} color="secondary">
                        Reset Password
                    </Button>
                    <Button onClick={() => onClose()} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={
                            () => store.dispatch(
                                signin({
                                    "username": unameRef.current.value,
                                    "password": passRef.current.value,
                                })
                            )
                        }
                        color="primary">
                        Sign In
                    </Button>
                </div> : <div>
                    <CircularProgress/>
                </div>}
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = state => ({
    err: state.authen.signInErr,
    loading: state.authen.signingIn,
    finish: state.authen.signingInFinish,
})

export default connect(
    mapStateToProps
)(SignInDialog)