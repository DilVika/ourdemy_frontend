import React, {useRef} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Redirect, useHistory} from "react-router-dom";
import PageFrame from "../components/PageFrame";
import {Button, DialogContent, Grid, TextField, Typography} from "@material-ui/core";
import store from "../store";
import {sendRecoveryCode} from "../store/authen/reset";
import {connect} from "react-redux";

const useStyle = makeStyles({})


const RessetPassword = ({sendErr, resetErr, sendSuccess, resetSuccess}) => {
    const classes = useStyle()
    const history = useHistory()

    const emailRef = useRef()
    const recRef = useRef()
    const passRef = useRef()
    const rpassRef = useRef()

    return (
        <>
            {
                resetSuccess ? <Redirect to={"/"}/> : <div>
                    <PageFrame>
                        <Grid container spacing={3}>
                            <Grid item xs={4}/>
                            <Grid item xs={4}>
                                <TextField
                                    margin="dense"
                                    id="email"
                                    label="Email"
                                    type="email"
                                    inputRef={emailRef}
                                    fullWidth
                                />
                                {
                                    sendSuccess ? <Typography color={"textPrimary"}>
                                        Please check your email for recovery code
                                    </Typography> : null
                                }
                                {
                                    sendErr ?
                                        <Typography color={"error"}>

                                        </Typography> : null
                                }
                                <Button style={{marginTop: '8px'}}
                                        color={"primary"}
                                        variant={"outlined"}
                                        onClick={() => {
                                            store.dispatch(sendRecoveryCode({
                                                "email": emailRef.current.value
                                            }))
                                        }}
                                >
                                    Send Recovery Code
                                </Button>
                            </Grid>
                            <Grid item xs={4}/>
                            <Grid item xs={4}/>
                            <Grid item xs={4}>
                                <TextField
                                    margin="dense"
                                    id="email"
                                    label="Recovery Code"
                                    type="email"
                                    inputRef={recRef}
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="email"
                                    label="Password"
                                    type="password"
                                    inputRef={passRef}
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="email"
                                    label="Repeat Password"
                                    type="password"
                                    inputRef={rpassRef}
                                    fullWidth
                                />
                                {
                                    resetErr ?
                                        <Typography color={"error"}>
                                            {resetErr}
                                        </Typography> : null
                                }
                                <Button
                                    onClick={() => {
                                        store.dispatch(
                                            {
                                                "email": emailRef.current.value,
                                                "password": passRef.current.value,
                                                "rpassword": rpassRef.current.value,
                                                "recovery": recRef.current.value
                                            }
                                        )
                                    }}
                                    style={{marginTop: '8px'}} color={"secondary"} variant={"outlined"}>
                                    Reset Password
                                </Button>
                            </Grid>
                            <Grid item xs={4}/>
                        </Grid>
                    </PageFrame>
                </div>
            }
        </>

    )
}

const mapStateToProp = state => ({
    sendErr: state.reset.sendErr,
    resetErr: state.reset.resetErr,
    sendSuccess: state.reset.sendSuccess,
    resetSuccess: state.reset.resetSuccess,
})

export default connect(
    mapStateToProp
)(RessetPassword)