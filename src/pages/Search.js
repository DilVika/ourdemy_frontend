import React, {useEffect, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PageFrame from "../components/PageFrame";
import {CircularProgress, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@material-ui/core";
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
import {useHistory, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import store from "../store";
import {search as searchAction} from "../store/course/search";
import {LinkSharp} from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
    loadingCenter: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchPage = ({cats, searchRes, searching, err}) => {
    const classes = useStyle()
    const query = useQuery()
    const needle = query.get("keyword")
    const catId = query.get("cat")
    const subcatId = query.get("subcat")

    const [page, setPage] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [category, setCategory] = useState("all")
    const [currentSelectCatId, setCurrentSelectCatId] = useState("");
    const [currentSelectedCat, setCurrentSelectedCat] = useState([])
    const [subCategory, setSubCategory] = useState("all")

    const history = useHistory();

    useEffect(() => {
        setKeyword(needle ? needle : "")

        if (catId != null) {
            let curCat
            for (const cat of cats) {
                if (cat.cid === catId) {
                    setCategory(cat)
                    setCurrentSelectedCat(cat.subcats)
                    curCat = cat
                    break
                }
            }

            if (curCat != null && subcatId != null) {
                for (const subcat of curCat.subcats) {
                    if (subcat.scid === subcatId) {
                        setSubCategory(subcat.scid)
                        break
                    }
                }
            }
        }

        store.dispatch(searchAction({
            "catId": catId,
            "subcatId": subcatId,
            "keyword": needle,
        }))

    }, [needle, catId, subcatId])

    function search() {
        let queryString = ""
        if (currentSelectCatId !== "") {
            queryString = queryString + `?cat=${currentSelectCatId}`
        }
        if (subCategory !== "all") {
            queryString = queryString + (queryString === "" ? `?subcat=${subCategory}` : `&subcat=${subCategory}`)
        }
        if (keyword !== "") {
            queryString = queryString + (queryString === "" ? `?keyword=${keyword}` : `&keyword=${keyword}`)
        }
        return history.push({
            pathname: '/search',
            search: queryString
        });
    }

    return (
        <div>
            <PageFrame>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <SearchBar
                            value={keyword}
                            onChange={(newValue) => setKeyword(newValue)}
                            onRequestSearch={() => search({title: keyword})}
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
                                onChange={(e) => {
                                    setCategory(e.target.value)
                                    if (e.target.value !== "all") {
                                        setCurrentSelectCatId(e.target.value.cid)
                                        setCurrentSelectedCat(e.target.value.subcats)
                                    } else {
                                        setCurrentSelectCatId("")
                                        setCurrentSelectedCat([])
                                    }
                                }}
                            >
                                <MenuItem id={"all-option"} value="all">All</MenuItem>
                                {
                                    cats.map((cat) => (
                                        <MenuItem key={cat.cid} value={cat}>
                                            {cat.cat_name}
                                        </MenuItem>
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
                                onChange={(e) => {
                                    setSubCategory(e.target.value)
                                }}
                            >
                                <MenuItem id={"all-option"} value="all">All</MenuItem>
                                {
                                    currentSelectedCat.map((sub, index) => (
                                        <MenuItem key={sub.scid} value={sub.scid}>
                                            {
                                                sub.subcat_name
                                            }
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <h2>Result</h2>
                        {
                            err ? <Typography variant={"p"} color={"err"}>
                                {err}
                            </Typography> : null
                        }
                        {
                            searching ?
                                <div className={classes.loadingCenter}>
                                    <CircularProgress/>
                                </div> :
                                <TableContainer component={Paper}>
                                    <Table className={classes.Table} aria-label="Courses Table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>No.</TableCell>
                                                <TableCell align="left">Name</TableCell>
                                                <TableCell align="left">Subcategory</TableCell>
                                                <TableCell align="left">Lecturer</TableCell>
                                                <TableCell align="left">Current Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {searchRes
                                                .slice(page * 10, page * 10 + 10)
                                                .map(function (course, index) {
                                                    const ids = course.id.split("\"")

                                                    return (
                                                        <TableRow key={ids[1]}>
                                                            <TableCell component="th">
                                                                {index + 1}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                {course.title}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                {course.category}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                {course.lecturer}
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                {course.current_price}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <div>
                                                                    <IconButton
                                                                        onClick={() => history.push(`/detail/${ids[1]}`)}>
                                                                        <LinkSharp/>
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

                        }
                    </Grid>
                </Grid>
            </PageFrame>
        </div>
    )
}

SearchPage.defaultProps = {
    cats: [],
    searchRes: []
}

const mapStateToProps = state => ({
    cats: state.cat.category,
    searchRes: state.search.searchRes,
    searching: state.search.searching,
    err: state.search.searchErr
})

export default connect(
    mapStateToProps
)(SearchPage)