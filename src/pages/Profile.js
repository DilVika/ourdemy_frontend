import React, {useRef, useState} from 'react';

import PageFrame from "../components/PageFrame";
import {
    Box,
    Button,
    Divider,
    Grid, IconButton,
    Input,
    List,
    ListItem, ListItemSecondaryAction,
    ListItemText,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList} from "react-window";
import {Delete} from "@material-ui/icons";
import YesNoDialog from "../components/YesNoDialog";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
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
    }
}))

const Profile = ({user, favList, err}) => {
    const classes = useStyles()

    const [updateMode, setUpdateMode] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

    const unameRef = useRef("")
    const nameRef = useRef("")
    const emailRef = useRef("")
    const passwordRef = useRef("")
    const rpasswordRef = useRef("")
    const opasswordRef = useRef("")

    const history = useHistory();

    const resetFields = () => {
        unameRef.current.value = user.username
        nameRef.current.value = user.fullname
        emailRef.current.value = user.email
        opasswordRef.current.value = ""
        passwordRef.current.value = ""
        rpasswordRef.current.value = ""
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
                                <Grid item xs={6}>
                                    <Typography variant={"h6"} align={"right"} color={"textSecondary"}>
                                        Username
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Input inputRef={unameRef} defaultValue={user.username} disabled={!updateMode}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant={"h6"} align={"right"} color={"textSecondary"}>
                                        Fullname
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Input inputRef={nameRef} defaultValue={user.fullname} disabled={!updateMode}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant={"h6"} align={"right"} color={"textSecondary"}>
                                        Email
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Input inputRef={emailRef} defaultValue={user.email} disabled={!updateMode}/>
                                </Grid>
                                {
                                    updateMode ? <>
                                        <Grid item xs={6}>
                                            <Typography variant={"h6"} align={"right"} color={"textSecondary"}>
                                                Old Password
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Input inputRef={opasswordRef} defaultValue={""} type={"password"}
                                                   disabled={!updateMode}/>
                                        </Grid>
                                    </> : null
                                }
                                <Grid item xs={6}>
                                    <Typography variant={"h6"} align={"right"} color={"textSecondary"}>
                                        Password
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Input inputRef={passwordRef} defaultValue={""} type={"password"}
                                           disabled={!updateMode}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant={"h6"} align={"right"} color={"textSecondary"}>
                                        Repeat Password
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Input inputRef={rpasswordRef} defaultValue={""} type={"password"}
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
                                            <Button variant={"outlined"} color={"primary"} onClick={() => history.push("/course/manage")}>
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
                                                        resetFields()
                                                    }
                                                    }>
                                                Cancel
                                            </Button>
                                            <Button variant={"contained"} color={"primary"}
                                                    onClick={() => setUpdateDialogOpen(true)}>
                                                Submit
                                            </Button>
                                        </div> : <Button variant={"contained"} color={"primary"}
                                                         onClick={() => setUpdateMode(true)}>
                                            Update
                                        </Button>}
                                    </div>
                                </Grid>
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
                            <Grid item xs={12}>
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
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </PageFrame>
            <YesNoDialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)} title={"Update"}
                         content={"Are you sure you want to update your information? Ò w Ó"}
                         onConfirm={() => console.log("update")}
                         onCancel={() => setUpdateDialogOpen(false)}
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
    favList: [
        {
            "cid": "1234",
            "name": "How to pet rin rin"
        },
        {
            "cid": "1235",
            "name": "How to pet rin rin advance"
        },
        {
            "cid": "1236",
            "name": "How to pet rin rin advance"
        },
        {
            "cid": "1237",
            "name": "How to pet rin rin advance"
        },
        {
            "cid": "1238",
            "name": "How to pet rin rin advance"
        },
        {
            "cid": "1239",
            "name": "How to pet rin rin advance"
        },
        {
            "cid": "1240",
            "name": "How to pet rin rin advance"
        },
        {
            "cid": "1241",
            "name": "How to pet rin rin advance"
        },
        {
            "cid": "1242",
            "name": "How to pet rin rin advance"
        },
        {
            "cid": "1243",
            "name": "How to pet rin rin advance"
        },
        {
            "cid": "1244",
            "name": "How to pet rin rin advance"
        },
        {
            "cid": "1245",
            "name": "How to pet rin rin advance"
        },
        {
            "cid": "1246",
            "name": "How to pet rin rin advance"
        },
        {
            "cid": "1247",
            "name": "How to pet rin rin advance"
        }
    ],
    err: null
}

const mapStateToProps = state => ({
    user: state.authen.user,
    favList: state.authen.favList,
    err: state.authen.updateErr,
})

export default connect(
    mapStateToProps
)(Profile);