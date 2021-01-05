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
import {authenSlice, otpConfirm, signup, updatePassword} from "../store/authen";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
    },
}));

const UpdatePasswordDialog = ({open, onClose, err, loading, finish}) => {
    const classes = useStyles();

    const opassRef = useRef("");
    const passRef = useRef("")
    const rpassRef = useRef("")

    const cleanState = () => {
        store.dispatch(authenSlice.actions.resetPasswordUpdateState())
        onClose()
    }

    return (
        <div>
            {
                finish ?
                    <Dialog open={open} onClose={() => cleanState()} aria-labelledby="form-dialog-title">
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <Typography variant="h6" className={classes.title}>
                                    Update password finished
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <DialogContent>
                            <DialogContentText>
                                Update password successfully
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => cleanState()} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog> :
                    <Dialog open={open} onClose={() => cleanState()} aria-labelledby="form-dialog-title">
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <Typography variant="h6" className={classes.title}>
                                    Update Password
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Old password"
                                type="password"
                                inputRef={opassRef}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="npassword"
                                label="New password"
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
                                <Button onClick={() => cleanState()} color="primary">
                                    Cancel
                                </Button>
                                <Button
                                    onClick={
                                        () => store.dispatch(
                                            updatePassword({
                                                "oldPassword": opassRef.current.value,
                                                "password": passRef.current.value,
                                                "repeatPassword": rpassRef.current.value,
                                            })
                                        )
                                    }
                                    color="primary">
                                    Update Password
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

UpdatePasswordDialog.defaultProps = {
    open: false,
    err: null,
    loading: false,
    finish: false
}

const mapStateToProps = state => ({
    err: state.authen.passwordErr,
    loading: state.authen.updatingPassword,
    finish: state.authen.updatingPasswordFinish,
})

export default connect(
    mapStateToProps
)(UpdatePasswordDialog)