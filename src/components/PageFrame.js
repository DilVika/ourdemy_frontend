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
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";

import {authenSlice, signin} from "../store/authen";
import store from "../store";
import {connect} from "react-redux";

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
        marginTop: '70px',
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

    const toggleItem = (index, open) => {
        const itemOpenCopy = [...itemOpen]
        itemOpenCopy[index] = open
        setItemOpen(itemOpenCopy)
    }

    const history = useHistory();

    const nav = (path) => {
        history.push(`/cat/${path}`)
    }

    const onSigninClick = (username, password) => {
        store.dispatch(signin({username, password}))
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.title} variant="h4" noWrap>
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
                                onClick={() => onSigninClick("a", "b")}
                                color="inherit">Log In</Button>
                        <Button className={classes.btn}
                                color="inherit">Sign Up</Button>
                    </div> : null}
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
                                <ListItemText primary={cat.cat_name} onClick={() => nav(cat.cat_name)}/>
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
                                                                  onClick={() => nav(`${cat.cat_name}/${sub.subcat_name}`)}
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
                {children}
            </main>
        </div>
    );
}

const mapStateToProps = state => {
    console.log(state)
    return {
        token: state.authen.token,
        categories: state.cat.category
    }
}

export default connect(
    mapStateToProps
)(PageFrame);