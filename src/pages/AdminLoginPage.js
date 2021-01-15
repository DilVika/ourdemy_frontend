import React, {useRef} from "react";
import {Button, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import {useHistory, Redirect} from 'react-router-dom'
import store from "../store";
import {adminLogin} from "../store/admin/authen";
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: '32px',
    },
    header: {
        marginTop: 50
    },
    loadingCenter: {
        display: 'flex',
        justifyContent: 'center'
    }
}));


const AdminLoginPage = ({authed, loggingIn, err}) => {
    const classes = useStyle()
    const history = useHistory()

    const uRef = useRef()
    const pRef = useRef()

    return (
        <>
            {
                authed ? <Redirect to={"/admin"}/> : <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography align={"center"} variant={"h3"} color={"primary"}>
                                Admin Log in
                            </Typography>
                        </Grid>
                        <Grid item xs={4}/>
                        <Grid item xs={4}>
                            <TextField inputRef={uRef} fullWidth label="Admin Username" name="username" size="small"
                                       variant="outlined"/>
                        </Grid>
                        <Grid item xs={4}/>
                        <Grid item xs={4}/>
                        <Grid item xs={4}>
                            <TextField inputRef={pRef} fullWidth label="Admin Password" name="password" type="password"
                                       size="small" variant="outlined"/>
                        </Grid>
                        <Grid item xs={4}/>
                        <Grid item xs={4}/>
                        <Grid item xs={4}>
                            {
                                loggingIn ? <div className={classes.loadingCenter}>
                                    <CircularProgress/>
                                </div> : <Button color="secondary" fullWidth variant="contained" onClick={() => {
                                    store.dispatch(adminLogin({
                                        "username": uRef.current.value,
                                        "password": pRef.current.value,
                                    }))
                                }}>
                                    Log in
                                </Button>
                            }
                        </Grid>
                        <Grid item xs={4}/>
                        <Grid item xs={4}/>
                        <Grid item xs={4}>
                            <Button color="default" fullWidth variant="contained" onClick={() => history.push("/")}>
                                Home
                            </Button>
                        </Grid>
                        <Grid item xs={4}/>
                        <Grid item xs={4}/>
                        <Grid item xs={4}>
                            <Typography variant={"p"} color={"error"}>
                                {err}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}/>
                    </Grid>
                </div>
            }
        </>
    )
}

const mapStateToProps = state => ({
    authed: !!state.adminAuth.adminToken,
    loggingIn: state.adminAuth.logingIn,
    err: state.adminAuth.err
})

export default connect(
    mapStateToProps
)(AdminLoginPage)