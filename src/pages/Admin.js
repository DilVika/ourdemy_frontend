import React, {useState} from "react";
import {AppBar, makeStyles, Toolbar} from "@material-ui/core";
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
}));

const AdminPage = ({users, cats, promotes, courseContents}) => {
    const classes = useStyle()

    const [page, setPage] = useState(0)
    const subcatsData = []
    cats.forEach((cat, index) => {
        cat.subcats.forEach((subcat, sindex) => {
            subcatsData.push({
                "cid": cat.cid,
                "catName": cat.cat_name,
                "scid": subcat.scid,
                "name": subcat.subcat_name
            })
        })
    })

    function handleAddUser(e) {

    }

    function handleBlockUser(id) {

    }

    function handleDeleteUser(id) {

    }

    function handleAddCat() {

    }

    function handleEditCat(cid) {
        return undefined;
    }

    function handleDeleteCat(cid) {
        //Check if cat exist courses or not
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
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={9}>
                    <h2>User Table</h2>
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
                                    .slice(page * 10, page * 10 + 10)
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
                            page={page}
                            rowsPerPage={10}
                            rowsPerPageOptions={[0]}
                            colSpan={4}
                            onChangePage={(_, newPage) => setPage(newPage)}
                        />
                    </TableContainer>

                    <h2>Category Table</h2>
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
                                    .slice(page * 10, page * 10 + 10)
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
                                                        <IconButton onClick={handleAddCat(cat.cid)}>
                                                            <AddIcon/>
                                                        </IconButton>
                                                        <IconButton onClick={handleEditCat(cat.cid)}>
                                                            <EditIcon/>
                                                        </IconButton>
                                                        <IconButton onClick={handleDeleteCat(cat.cid)}>
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
                            page={page}
                            rowsPerPage={10}
                            rowsPerPageOptions={[0]}
                            colSpan={4}
                            onChangePage={(_, newPage) => setPage(newPage)}
                        />
                    </TableContainer>

                    <h2>Sub-Category Table</h2>
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
                                    .slice(page * 10, page * 10 + 10)
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
                                                        <IconButton>
                                                            <AddIcon/>
                                                        </IconButton>
                                                        <IconButton>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                        <IconButton>
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
                            page={page}
                            rowsPerPage={10}
                            rowsPerPageOptions={[0]}
                            colSpan={4}
                            onChangePage={(_, newPage) => setPage(newPage)}
                        />
                    </TableContainer>

                    <h2>Promote Table</h2>
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
                                    .slice(page * 10, page * 10 + 10)
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
                            page={page}
                            rowsPerPage={10}
                            rowsPerPageOptions={[0]}
                            colSpan={4}
                            onChangePage={(_, newPage) => setPage(newPage)}
                        />
                    </TableContainer>

                    <h2>Course Table</h2>
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
                                    .slice(page * 10, page * 10 + 10)
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
                            page={page}
                            rowsPerPage={10}
                            rowsPerPageOptions={[0]}
                            colSpan={4}
                            onChangePage={(_, newPage) => setPage(newPage)}
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
    cats: [
        {
            "cid": "c01",
            "cat_name": "About Mondstadb",
            "subcats": [
                {
                    "scid": "scid01",
                    "subcat_name": "Wind"
                }
            ]
        },
        {
            "cid": "c02",
            "cat_name": "About Liyue",
            "subcats": [
                {
                    "scid": "scid02",
                    "subcat_name": "Glaze"
                }
            ]
        },
        {
            "cid": "c03",
            "cat_name": "About Izunami",
            "subcats": [
                {
                    "scid": "scid03",
                    "subcat_name": "Frost"
                }
            ]
        },
        {
            "cid": "c04",
            "cat_name": "Games",
            "subcats": [
                {
                    "scid": "5febfb7c474022678a2477bc",
                    "subcat_name": "Genshin"
                },
                {
                    "scid": "5febfb92474022678a2477bd",
                    "subcat_name": "Destiny 2"
                },
                {
                    "scid": "5febfb9f474022678a2477be",
                    "subcat_name": "Cyberpunk 2077"
                },
                {
                    "scid": "5febfc45474022678a2477bf",
                    "subcat_name": "Sakuna of Rice and Ruin"
                },
                {
                    "scid": "5febfc4c474022678a2477c0",
                    "subcat_name": "Patapon"
                },
                {
                    "scid": "5febfc5d474022678a2477c1",
                    "subcat_name": "Crusade Kings 3"
                },
                {
                    "scid": "5febfc7e474022678a2477c2",
                    "subcat_name": "Heart of Iron 4"
                },
                {
                    "scid": "5febfc8a474022678a2477c3",
                    "subcat_name": "The Witcher 3"
                },
                {
                    "scid": "5febfc91474022678a2477c4",
                    "subcat_name": "Call of Duty"
                }
            ]
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

export default AdminPage