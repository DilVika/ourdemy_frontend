import React, {useRef} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {AppBar, CircularProgress, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import store from "../store";
import {authenSlice, otpConfirm, signup} from "../store/authen";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
    },
}));

const SignUpDialog = ({open, onClose, err, loading, otp, otploading, finish}) => {
    const classes = useStyles();
    const nameRef = useRef("")
    const unameRef = useRef("")
    const emailRef = useRef("")
    const passRef = useRef("")
    const rpassRef = useRef("")

    const otpunameRef = useRef("")
    const otpRef = useRef("")

    return (
        <div>
            {
                finish ?
                    <Dialog open={open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <Typography variant="h6" className={classes.title}>
                                    Sign up finished
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <DialogActions>
                            <Button onClick={() => onClose()} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog> : !otp ?
                    <Dialog open={open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <Typography variant="h6" className={classes.title}>
                                    Sign up
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Full name"
                                type="text"
                                inputRef={nameRef}
                                fullWidth
                            />
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
                                id="email"
                                label="Email"
                                type="email"
                                inputRef={emailRef}
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
                            <TextField
                                autoFocus
                                margin="dense"
                                id="rpassword"
                                label="Repeat Password"
                                type="password"
                                inputRef={rpassRef}
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
                                <Button onClick={() => store.dispatch(authenSlice.actions.otpMode())} color="primary">
                                    Otp
                                </Button>
                                <Button onClick={() => onClose()} color="primary">
                                    Cancel
                                </Button>
                                <Button
                                    onClick={
                                        () => store.dispatch(
                                            signup({
                                                "name": nameRef.current.value,
                                                "username": unameRef.current.value,
                                                "email": emailRef.current.value,
                                                "password": passRef.current.value,
                                                "repeatPassword": rpassRef.current.value,
                                            })
                                        )
                                    }
                                    color="primary">
                                    Sign up
                                </Button>
                            </div> : <div>
                                <CircularProgress/>
                            </div>}
                        </DialogActions>
                    </Dialog>
                    : <Dialog open={open} onClose={() => onClose()} aria-labelledby="form-dialog-title">
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <Typography variant="h6" className={classes.title}>
                                    OTP
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
                                inputRef={otpunameRef}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="username"
                                label="otp"
                                type="text"
                                inputRef={otpRef}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            {!otploading ? <div>
                                <Button onClick={() => store.dispatch(authenSlice.actions.signupMode())}
                                        color="primary">
                                    Switch to Sign up
                                </Button>
                                <Button onClick={() => onClose()} color="primary">
                                    Cancel
                                </Button>
                                <Button
                                    onClick={
                                        () => store.dispatch(
                                            otpConfirm({
                                                "username": otpunameRef.current.value,
                                                "otp": otpRef.current.value,
                                            })
                                        )
                                    }
                                    color="primary">
                                    Confirm
                                </Button>
                            </div> : <div>
                                <CircularProgress/>
                            </div>}
                        </DialogActions>
                    </Dialog>
            }
        </div>
    );
}

SignUpDialog.defaultProps = {
    open: false,
    err: null,
    loading: false,
    otp: false,
    otploading: false,
    finish: false
}

const mapStateToProps = state => ({
    err: state.authen.signUpErr,
    loading: state.authen.signingUp,
    otp: state.authen.shouldOtp,
    otploading: state.authen.otping,
    finish: state.authen.signingUpFinish,
})

export default connect(
    mapStateToProps
)(SignUpDialog)