import React, {useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PageFrame from "../components/PageFrame";
import {Grid, InputLabel, Select, TextField} from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TablePagination from "@material-ui/core/TablePagination";
import {useHistory} from "react-router-dom";

const useStyle = makeStyles((theme) => {

});

const SearchPage = ({cats, searchRes}) => {
    const classes = useStyle()

    const [page, setPage] = useState(0)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState(0);
    const [subCategory, setSubCategory] = useState(0);
    const subcats = []
    cats.forEach((cat, index) => {
        cat.subcats.forEach((subcat, sindex) => {
            subcats.push({
                "cid": cat.cid,
                "catName": cat.cat_name,
                "scid": subcat.scid,
                "name": subcat.subcat_name
            })
        })
    })
    const history = useHistory();

    function search(value) {
        return history.push({
            pathname: '/search',
            search: `?cat=${category}&subcat=${subCategory}&title=${title}`
        });
    }

    return (
        <div>
            <PageFrame>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <SearchBar
                            value={title}
                            onChange={(newValue) => setTitle(newValue)}
                            onRequestSearch={() => search({title})}
                        />
                    </Grid>
                    <Grid container spacing={3} style={{margin: 0}}>
                        <Grid item xs={3}>
                            <InputLabel id={"category-select-label"}>
                                Category
                            </InputLabel>
                            <Select
                                labelId={"category-select-label"}
                                id={"category-select"}
                                value={category}
                                native
                                onChange={(e) => {
                                    setCategory(e.target.value)
                                }}
                            >
                                <option id={"all-option"} value="all">All</option>
                                {
                                    cats.map((cat) => (
                                        <option key={cat.cid} value={cat.cid}>
                                            {cat.cat_name}
                                        </option>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={3}>
                            <InputLabel id={"subCategory-select-label"}>
                                Sub-Category
                            </InputLabel>
                            <Select
                                labelId={"subCategory-select-label"}
                                id={"subCategory-select"}
                                value={subCategory}
                                native
                                onChange={(e) => {
                                    setSubCategory(e.target.value)
                                }}
                            >
                                <option id={"all-option"} value="all">All</option>
                                {
                                    cats.map((cat) => (
                                        <optgroup key={cat.cid} label={cat.cat_name}>
                                            {
                                                cat.subcats.map((subcat, index) => (
                                                    <option key={subcat.scid} value={subcat.scid}>
                                                        {subcat.subcat_name}
                                                    </option>
                                                ))
                                            }
                                        </optgroup>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <h2>Result</h2>
                        <TableContainer component={Paper}>
                            <Table className={classes.Table} aria-label="Courses Table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>CCID</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchRes
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
                                count={(searchRes && searchRes.length) || 0}
                                page={page}
                                rowsPerPage={10}
                                rowsPerPageOptions={[0]}
                                colSpan={4}
                                onChangePage={(_, newPage) => setPage(newPage)}
                            />
                        </TableContainer>
                    </Grid>
                </Grid>
            </PageFrame>
        </div>
    )
}

SearchPage.defaultProps = {
    cats : [
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
    searchRes: [
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
            ],
            "lec_name": "Venti",
            "price": "99.99$",
            "point": "9"
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
            ],
            "lec_name": "Klee",
            "price": "8.99$",
            "point": "8"
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
            ],
            "lec_name": "Childe",
            "price": "10.0$",
            "point": "7"
        }
    ]
}

export default SearchPage