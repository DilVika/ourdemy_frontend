import React, {useEffect, useRef, useState} from 'react';

import PageFrame from "../components/PageFrame";
import {
    Button, CircularProgress,
    Divider,
    Grid, IconButton,
    Input,
    List,
    ListItem, ListItemSecondaryAction,
    ListItemText,
    Paper, Snackbar,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Close, Delete} from "@material-ui/icons";
import YesNoDialog from "../components/YesNoDialog";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {fetchFavList, fetchProfile, updateProfile} from "../store/authen";
import store from "../store";
import UpdatePasswordDialog from "../components/UpdatePassword";

const useStyles = makeStyles(() => ({
    root: {
        display: 'block',
        width: '100%',
    },
    buttonBar: {
        display: 'flex',
        justifyContent: 'center',
    },
    coursePaper: {
        marginTop: '8px',
        marginBottom: '8px',
        marginRight: '8px'
    },
    main: {
        width: '99%',
    },
    loadingCenter: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

const Profile = ({user, favList, fetching, favListFetching, err, favErr}) => {
    const classes = useStyles()

    const [updateMode, setUpdateMode] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [updatePasswordDialogOpen, setUpdatePasswordDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        store.dispatch(fetchProfile())
    }, [])

    const unameRef = useRef("")
    const nameRef = useRef("")
    const emailRef = useRef("")
    const history = useHistory();

    const resetFieldsUpdate = () => {
        unameRef.current.value = user.username
        nameRef.current.value = user.fullname
        emailRef.current.value = user.email
    }

    return (
        <div className={classes.root}>
            <PageFrame>
                <div className={classes.main}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant={"h6"} align={"center"} color={"primary"}>
                                        Profile
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider/>
                                </Grid>
                                {
                                    err ?
                                        <Grid item xs={12}>
                                            <Typography align={"center"} color={"error"}>
                                                {err}
                                            </Typography>
                                        </Grid> : null
                                }
                                {
                                    !fetching ? <>
                                        <Grid item xs={6}>
                                            <Typography variant={"h6"} align={"right"} color={"textSecondary"}>
                                                Username
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Input inputRef={unameRef} defaultValue={user.username}
                                                   disabled/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant={"h6"} align={"right"} color={"textSecondary"}>
                                                Fullname
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Input inputRef={nameRef} defaultValue={user.fullname}
                                                   disabled={!updateMode}/>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant={"h6"} align={"right"} color={"textSecondary"}>
                                                Email
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Input inputRef={emailRef} defaultValue={user.email}
                                                   disabled={!updateMode}/>
                                        </Grid>
                                        {
                                            updateMode && !user.isLec ? <Grid item xs={12}>
                                                <div className={classes.buttonBar}>
                                                    <Button variant={"outlined"} color={"secondary"}>
                                                        Upgrade to Lecturer
                                                    </Button>
                                                </div>
                                            </Grid> : null
                                        }
                                        {
                                            !updateMode && user.isLec ? <Grid item xs={12}>
                                                <div className={classes.buttonBar}>
                                                    <Button variant={"outlined"} color={"primary"}
                                                            onClick={() => history.push("/course/manage")}>
                                                        Manage Courses
                                                    </Button>
                                                </div>
                                            </Grid> : null
                                        }
                                        <Grid item xs={12}>
                                            <div className={classes.buttonBar}>
                                                {updateMode ? <div>
                                                    <Button variant={"contained"} color={"secondary"}
                                                            style={{marginRight: "5px"}}
                                                            onClick={() => {
                                                                setUpdateMode(false)
                                                                resetFieldsUpdate()
                                                            }
                                                            }>
                                                        Cancel
                                                    </Button>
                                                    <Button variant={"contained"} color={"primary"}
                                                            onClick={() => setUpdateDialogOpen(true)}>
                                                        Submit
                                                    </Button>
                                                </div> : <>
                                                    <Button style={{marginRight: "5px"}} variant={"contained"}
                                                            color={"secondary"}
                                                            onClick={() => setUpdatePasswordDialogOpen(true)}
                                                    >
                                                        Update Password
                                                    </Button>
                                                    <Button variant={"contained"} color={"primary"}
                                                            onClick={() => setUpdateMode(true)}>
                                                        Update
                                                    </Button>
                                                </>}
                                            </div>
                                        </Grid>
                                    </> : <>
                                        {
                                            !err ? <Grid item xs={12}>
                                                <div className={classes.loadingCenter}>
                                                    <CircularProgress/>
                                                </div>
                                            </Grid> : null
                                        }
                                    </>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant={"h6"} align={"center"} color={"primary"}>
                                        Favorite Courses
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider/>
                                </Grid>
                            </Grid>
                            {
                                favListFetching ? <></> : <>
                                    {
                                        !favErr ? <Grid item xs={12}>
                                                <div style={{maxHeight: '80vh', overflow: 'auto'}}>
                                                    <List>
                                                        {
                                                            favList.map((fav) => (
                                                                <Paper variant={"outlined"} className={classes.coursePaper}
                                                                       key={fav.cid}
                                                                       elevation={1}>
                                                                    <ListItem>
                                                                        <ListItemText>
                                                                            {fav.name}
                                                                        </ListItemText>
                                                                        <ListItemSecondaryAction>
                                                                            <IconButton edge="end" aria-label="comments">
                                                                                <Delete/>
                                                                            </IconButton>
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                </Paper>
                                                            ))
                                                        }
                                                    </List>
                                                </div>
                                            </Grid> :
                                            <Grid item xs={12}>
                                                <Typography align={"center"} color={"error"}>
                                                    {favErr}
                                                </Typography>
                                            </Grid>

                                    }
                                </>

                            }
                        </Grid>
                    </Grid>
                </div>
            </PageFrame>
            <YesNoDialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)} title={"Update"}
                         content={"Are you sure you want to update your information? Ò w Ó"}
                         onConfirm={() => {
                             store.dispatch(updateProfile({
                                 "fullname": nameRef.current.value,
                                 "email": emailRef.current.value
                             }))
                             setUpdateDialogOpen(false)
                         }

                         }
                         onCancel={() => setUpdateDialogOpen(false)}
            />
            <UpdatePasswordDialog open={updatePasswordDialogOpen} onClose={() => setUpdatePasswordDialogOpen(false)}
            />
        </div>
    );
}

Profile.defaultProps = {
    user: {
        "username": "",
        "fullname": "",
        "password": "",
        "email": "",
        "isLec": false
    },
    favList: [],
    err: null
}

const mapStateToProps = state => ({
    user: state.authen.user,
    favList: state.authen.favList,
    err: state.authen.updateErr,
    fetching: state.authen.fetching,
    favListFetching: state.authen.fetchingFav,
    favErr: state.authen.favListErr
})

export default connect(
    mapStateToProps
)(Profile);