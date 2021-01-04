import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {fade, makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse'
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";

import {authenSlice, signin, signout} from "../store/authen";
import store from "../store";
import {connect} from "react-redux";
import SignUpDialog from "./SignUpDialog";
import SignInDialog from "./SignInDialog";
import {Menu, MenuItem} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        zIndex: 2,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 1,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        marginTop: '70px',
        display: 'flex'
    },
    pageContent: {
        //flexGrow: 1,
        width:`calc(100vw - ${drawerWidth}px - 20px )`,
        padding: '20px'
    },
    btn: {
        marginLeft: '10px',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}));


const PageFrame = ({token, categories, children}) => {
    const classes = useStyles();
    const isOpenArray = categories.map((cat, index) => {
        return false
    })

    const [itemOpen, setItemOpen] = useState(isOpenArray);
    const [signUpDialogOpen, setSignUpDialogOpen] = useState(false);
    const [signInDialogOpen, setSignInDialogOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const history = useHistory();

    const toggleItem = (index, open) => {
        const itemOpenCopy = [...itemOpen]
        itemOpenCopy[index] = open
        setItemOpen(itemOpenCopy)
    }

    const closeMenu = () => {
        setAnchorEl(null)
    }

    const closeAndNav = (path) => {
        setAnchorEl(null)
        history.push(`/${path}`)
    }

    const navCat = (path) => {
        history.push(`/cat/${path}`)
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography onClick={() => history.push("/")} className={classes.title} variant="h4" noWrap>
                        Ourdemy
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>
                    {!token ? <div>
                        <Button className={classes.btn}
                                onClick={() => setSignInDialogOpen(true)}
                                color="inherit">Log In</Button>
                        <Button className={classes.btn}
                                color="inherit" onClick={() => setSignUpDialogOpen(true)}>Sign Up</Button>
                    </div> : <div>
                        <IconButton className={classes.btn} aria-controls="simple-menu" aria-haspopup="true"
                                    color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
                            <AccountCircle/>
                        </IconButton>
                    </div>}
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}/>
                <Divider/>
                <List>
                    {categories.map((cat, index) => (
                        <div key={cat.cid}>
                            <ListItem button>
                                <ListItemText primary={cat.cat_name} onClick={() => navCat(cat.cat_name)}/>
                                <div role="button" onClick={(e) => toggleItem(index, !itemOpen[index])}>
                                    {itemOpen[index] ? <IconExpandLess/> :
                                        <IconExpandMore/>}
                                </div>
                            </ListItem>
                            {
                                cat.subcats ?
                                    <Collapse in={itemOpen[index]} timeout="auto" unmountOnExit>
                                        <Divider/>
                                        <List component="div" disablePadding>
                                            {cat.subcats.map((sub, index) => (
                                                <ListItem button key={sub.scid}>
                                                    <ListItemText inset
                                                                  onClick={() => navCat(`${cat.cat_name}/${sub.subcat_name}`)}
                                                                  primary={sub.subcat_name}/>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                    : null
                            }
                        </div>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.pageContent}>
                    {children}
                </div>
            </main>
            <SignUpDialog open={signUpDialogOpen} onClose={() => {
                setSignUpDialogOpen(false)
                store.dispatch(authenSlice.actions.resetSignUpState())
            }}/>
            <SignInDialog open={signInDialogOpen} onClose={() => {
                setSignInDialogOpen(false)
                store.dispatch(authenSlice.actions.resetSignInState())
            }}/>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeMenu}
            >
                <MenuItem onClick={() => closeAndNav('profile')}>Profile</MenuItem>
                <MenuItem onClick={() => {
                    closeMenu()
                    store.dispatch(signout())
                }}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

const mapStateToProps = state => ({
    token: state.authen.token,
    categories: state.cat.category
})

export default connect(
    mapStateToProps
)(PageFrame);