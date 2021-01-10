import React, {useEffect, useState} from "react";
import {AppBar, CircularProgress, makeStyles, Toolbar} from "@material-ui/core";
import PageFrame from "../components/PageFrame";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BlockIcon from '@material-ui/icons/Block';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import TablePagination from "@material-ui/core/TablePagination";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddCategoryDialog from "../components/AddCategoryDialog";
import AddSubCategoryDialog from "../components/AddSubCategoryDialog";
import {connect} from "react-redux";
import {ExitToApp} from "@material-ui/icons";
import {adminSignOut} from "../store/admin/authen";
import store from "../store";
import {useHistory} from 'react-router-dom'
import {
    adminCatSlice,
    createCatAdmin,
    createSubcatAdmin,
    fetchCatsAdmin,
    removeCatAdmin,
    removeSubcatAdmin, updateCatAdmin, updateSubcatAdmin
} from "../store/admin/cat";
import AnnounceDialog from "../components/AnnounceDialog";
import UpdateCategoryDialog from "../components/UpdateCategoryDialog";
import UpdateSubcategoryDialog from "../components/UpdateSubcategoryDialog";

const useStyle = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    root: {
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    header: {
        marginTop: 50
    },
    loadingCenter: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

const AdminPage = ({users, cats, promotes, courseContents, catFetching, catErr}) => {
    const classes = useStyle()
    const history = useHistory()

    const [pageUser, setPageUser] = useState(0)
    const [pageCat, setPageCat] = useState(0)
    const [pageSubcat, setPageSubcat] = useState(0)
    const [pagePromote, setPagePromote] = useState(0)
    const [pageCourse, setPageCourse] = useState(0)

    const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
    const [addSubCategoryDialogOpen, setAddSubCategoryDialogOpen] = useState(false);
    const [updateCategoryDialogOpen, setUpdateCategoryDialogOpen] = useState(false);
    const [updateSubcategoryDialogOpen, setUpdateSubcategoryDialogOpen] = useState(false);

    const [subcatsData, setSubcatsData] = useState([]);
    const [targetCat, setTargetCat] = useState({"cid": "0", "name": "0"});
    const [targetSubcat, setTargetSubcat] = useState({"scid": "0", "name": "0"});

    useEffect(() => {
        store.dispatch(fetchCatsAdmin())
    }, [])

    useEffect(() => {
        const subs = []

        cats.forEach((cat, index) => {
            cat.subcats.forEach((subcat, sindex) => {
                subs.push({
                    "cid": cat.cid,
                    "catName": cat.cat_name,
                    "scid": subcat.scid,
                    "name": subcat.subcat_name
                })
            })
        })

        setSubcatsData(subs)
    }, [cats])


    function handleBlockUser(id) {

    }

    function handleEditCat(cid) {
        return undefined;
    }


    function handlePromote(uid) {
        //Send req to server and delete that user from promote list when receive 200 status code
        return undefined;
    }

    function handleDeleteCourse(ccid) {
        return undefined;
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{marginBottom: '32px'}}>
                    <AppBar position={"fixed"}>
                        <Toolbar>
                            <Typography className={classes.title} variant="h4" noWrap>
                                Admin
                            </Typography>
                            <IconButton onClick={
                                () => {
                                    store.dispatch(adminSignOut())
                                    history.push("/admin/signin")
                                }
                            } color="inherit">
                                <ExitToApp/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={9}>
                    <h2 className={classes.header}>User Table</h2>
                    <TableContainer component={Paper}>
                        <Table className={classes.Table} aria-label="Users Table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>UID</TableCell>
                                    <TableCell align="right">Username</TableCell>
                                    <TableCell align="right">Fullname</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users
                                    .slice(pageUser * 10, pageUser * 10 + 10)
                                    .map(function (user) {
                                        return (
                                            <TableRow key={user.uid}>
                                                <TableCell component="th">
                                                    {user.uid}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {user.username}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {user.fullname}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <div>
                                                        <IconButton onClick={handleBlockUser(user.uid)}>
                                                            <BlockIcon/>
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                        <TablePagination
                            count={(users && users.length) || 0}
                            page={pageUser}
                            rowsPerPage={10}
                            rowsPerPageOptions={[0]}
                            colSpan={4}
                            onChangePage={(_, newPage) => setPageUser(newPage)}
                        />
                    </TableContainer>

                    {
                        catFetching ?
                            <div className={classes.loadingCenter}>
                                <CircularProgress/>
                            </div> :
                            <>
                                <h2 className={classes.header}>Category Table</h2>
                                <TableContainer component={Paper}>
                                    <Table className={classes.Table} aria-label="Categories Table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>CID</TableCell>
                                                <TableCell align="right">Name</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cats
                                                .slice(pageCat * 10, pageCat * 10 + 10)
                                                .map(function (cat) {
                                                    return (
                                                        <TableRow key={cat.cid}>
                                                            <TableCell component="th">
                                                                {cat.cid}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                {cat.cat_name}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <div>
                                                                    <IconButton onClick={() => {
                                                                        setTargetCat(cat)
                                                                        setUpdateCategoryDialogOpen(true)
                                                                    }}>
                                                                        <EditIcon/>
                                                                    </IconButton>
                                                                    <IconButton onClick={
                                                                        () => {
                                                                            store.dispatch(removeCatAdmin({
                                                                                "id": cat.cid
                                                                            }))
                                                                        }
                                                                    }>
                                                                        <DeleteIcon/>
                                                                    </IconButton>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                        count={(cats && cats.length) || 0}
                                        page={pageCat}
                                        rowsPerPage={10}
                                        rowsPerPageOptions={[0]}
                                        colSpan={4}
                                        onChangePage={(_, newPage) => setPageCat(newPage)}
                                    />
                                </TableContainer>
                                <Button variant="contained" color="primary"
                                        style={{marginTop: 10}}
                                        onClick={() => setAddCategoryDialogOpen(true)}>
                                    Add Category
                                </Button>
                                <AddCategoryDialog open={addCategoryDialogOpen}
                                                   onCreate={(data) => store.dispatch(createCatAdmin(data))}
                                                   onClose={() => setAddCategoryDialogOpen(false)}
                                />
                                <AnnounceDialog open={catErr != null} onClose={() => {
                                    store.dispatch(adminCatSlice.actions.clearCatErr())
                                }
                                } title={"Error"} content={catErr}/>
                                <UpdateCategoryDialog open={updateCategoryDialogOpen} onClose={() => {
                                    setUpdateCategoryDialogOpen(false)
                                }
                                } cat={targetCat} onSubmit={(data) => {
                                    store.dispatch(updateCatAdmin(data))
                                }
                                }/>

                                <h2 className={classes.header}>Sub-Category Table</h2>
                                <TableContainer component={Paper}>
                                    <Table className={classes.Table} aria-label="Sub-Categories Table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>SCID</TableCell>
                                                <TableCell align="left">Name</TableCell>
                                                <TableCell align="left">Parent Name</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {subcatsData
                                                .slice(pageSubcat * 10, pageSubcat * 10 + 10)
                                                .map(function (subcat, index) {
                                                    return (
                                                        <TableRow key={subcat.scid}>
                                                            <TableCell component="th">
                                                                {subcat.scid}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                {subcat.name}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                {subcat.catName}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <div>
                                                                    <IconButton onClick={() => {
                                                                        setTargetSubcat(subcat)
                                                                        setUpdateSubcategoryDialogOpen(true)
                                                                    }}>
                                                                        <EditIcon/>
                                                                    </IconButton>
                                                                    <IconButton onClick={() => {
                                                                        store.dispatch(removeSubcatAdmin({
                                                                            "id": subcat.scid
                                                                        }))
                                                                    }}>
                                                                        <DeleteIcon/>
                                                                    </IconButton>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                        count={(subcatsData && subcatsData.length) || 0}
                                        page={pageSubcat}
                                        rowsPerPage={10}
                                        rowsPerPageOptions={[0]}
                                        colSpan={4}
                                        onChangePage={(_, newPage) => setPageSubcat(newPage)}
                                    />
                                </TableContainer>
                                <Button variant="contained" color="primary"
                                        style={{marginTop: 10}}
                                        onClick={() => setAddSubCategoryDialogOpen(true)}>
                                    Add Sub-Category
                                </Button>
                                <AddSubCategoryDialog
                                    cats={cats}
                                    open={addSubCategoryDialogOpen}
                                    onClose={() => setAddSubCategoryDialogOpen(false)}
                                    onCreate={(data) => {
                                        store.dispatch(createSubcatAdmin(data))
                                    }
                                    }
                                />
                                <UpdateSubcategoryDialog
                                    open={updateSubcategoryDialogOpen}
                                    onClose={() => {
                                        setUpdateSubcategoryDialogOpen(false)
                                    }}
                                    subcat={targetSubcat}
                                    onSubmit={(data) => {
                                        store.dispatch(updateSubcatAdmin(data))
                                    }
                                }
                                />
                            </>

                    }

                    <h2 className={classes.header}>Promote Table</h2>
                    <TableContainer component={Paper}>
                        <Table className={classes.Table} aria-label="Promotes Table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>UID</TableCell>
                                    <TableCell align="left">Username</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {promotes
                                    .slice(pagePromote * 10, pagePromote * 10 + 10)
                                    .map(function (promote) {
                                        return (
                                            <TableRow key={promote.uid}>
                                                <TableCell component="th">
                                                    {promote.uid}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {promote.username}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <div>
                                                        <IconButton onClick={handlePromote(promote.uid)}>
                                                            <CheckIcon/>
                                                        </IconButton>
                                                        <IconButton onClick={handlePromote(promote.uid)}>
                                                            <CloseIcon/>
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                        <TablePagination
                            count={(promotes && promotes.length) || 0}
                            page={pagePromote}
                            rowsPerPage={10}
                            rowsPerPageOptions={[0]}
                            colSpan={4}
                            onChangePage={(_, newPage) => setPagePromote(newPage)}
                        />
                    </TableContainer>

                    <h2 className={classes.header}>Course Table</h2>
                    <TableContainer component={Paper}>
                        <Table className={classes.Table} aria-label="Courses Table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>CCID</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courseContents
                                    .slice(pageCourse * 10, pageCourse * 10 + 10)
                                    .map(function (course) {
                                        return (
                                            <TableRow key={course.ccid}>
                                                <TableCell component="th">
                                                    {course.ccid}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {course.name}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <div>
                                                        <IconButton onClick={handleDeleteCourse(course.ccid)}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                        <TablePagination
                            count={(courseContents && courseContents.length) || 0}
                            page={pageCourse}
                            rowsPerPage={10}
                            rowsPerPageOptions={[0]}
                            colSpan={4}
                            onChangePage={(_, newPage) => setPageCourse(newPage)}
                        />
                    </TableContainer>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    )
}

AdminPage.defaultProps = {
    users: [
        {
            "uid": "u01",
            "username": "albedo",
            "fullname": "Albedo Geo"
        },
        {
            "uid": "u02",
            "username": "xiao",
            "fullname": "Xiao Anemo"
        },
        {
            "uid": "u03",
            "username": "venti",
            "fullname": "Venti Anemo"
        },
        {
            "uid": "u04",
            "username": "jean",
            "fullname": "Jean Anemo"
        },
        {
            "uid": "u05",
            "username": "ningguang",
            "fullname": "Ningguang Geo"
        },
        {
            "uid": "u06",
            "username": "beidou",
            "fullname": "Beidou Electro"
        },
        {
            "uid": "u07",
            "username": "zhongli",
            "fullname": "Zhongli Geo"
        },
        {
            "uid": "u08",
            "username": "chongyun",
            "fullname": "Chongyun Cyro"
        },
        {
            "uid": "u09",
            "username": "xiangling",
            "fullname": "Xiangling Pyro"
        },
        {
            "uid": "u10",
            "username": "diona",
            "fullname": "Diona Cyro"
        },
        {
            "uid": "u11",
            "username": "childe",
            "fullname": "Childe Hydro"
        },
        {
            "uid": "u12",
            "username": "Mona",
            "fullname": "Mona Hydro"
        }
    ],
    promotes: [
        {
            "uid": "u01",
            "username": "albedo",
            "fullname": "Albedo Geo"
        },
        {
            "uid": "u02",
            "username": "xiao",
            "fullname": "Xiao Anemo"
        },
        {
            "uid": "u03",
            "username": "venti",
            "fullname": "Venti Anemo"
        },
        {
            "uid": "u04",
            "username": "jean",
            "fullname": "Jean Anemo"
        },
        {
            "uid": "u05",
            "username": "ningguang",
            "fullname": "Ningguang Geo"
        },
        {
            "uid": "u06",
            "username": "beidou",
            "fullname": "Beidou Electro"
        }
    ],
    courseContents: [
        {
            "ccid": "ab1",
            "name": "How to use Venti",
            "video": [
                {
                    "vid": "v01",
                    "title": "Getting Started",
                    "url": "https://www.youtube.com/watch?v=uNT_AxXrUGs"
                },
                {
                    "vid": "v02",
                    "title": "Basic",
                    "url": "https://www.youtube.com/watch?v=WxiYbLw55cE"
                },
                {
                    "vid": "v03",
                    "title": "Advance",
                    "url": "https://www.youtube.com/watch?v=4oa8tKm04wE"
                }
            ]
        },
        {
            "ccid": "ab2",
            "name": "How to use Klee",
            "video": [
                {
                    "vid": "v11",
                    "title": "Getting Started"
                },
                {
                    "vid": "v12",
                    "title": "Basic"
                },
                {
                    "vid": "v13",
                    "title": "Advance"
                }
            ]
        },
        {
            "ccid": "ab3",
            "name": "How to use Childe",
            "video": [
                {
                    "vid": "v21",
                    "title": "Getting Started"
                },
                {
                    "vid": "v22",
                    "title": "Basic"
                },
                {
                    "vid": "v23",
                    "title": "Advance"
                }
            ]
        }
    ]
}

const mapStateToProps = state => ({
    cats: state.adminCats.category,
    catFetching: state.adminCats.fetching,
    catErr: state.adminCats.err,
})

export default connect(
    mapStateToProps
)(AdminPage)