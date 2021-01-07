import React, {useEffect, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PageFrame from "../components/PageFrame";
import {
    Button,
    CardMedia, CircularProgress,
    Divider,
    Grid, InputAdornment,
    InputLabel,
    Paper,
    Select,
    TextField,
    Typography
} from "@material-ui/core";

import {useHistory} from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import data from "../ava.json";

import {useParams} from "react-router-dom"
import {connect} from "react-redux";
import store from "../store";
import {fetchCurrentCourse, lecCourseSlice, updateCourse} from "../store/course/lec";
import AnnounceDialog from "../components/AnnounceDialog";

const useStyles = makeStyles(() => ({
    root: {
        display: 'block',
        width: '100%',
    },
    buttonBar: {
        display: 'flex',
        justifyContent: 'start',
    },
    main: {
        width: '99%',
    },
    loadingCenter: {
        display: 'flex',
        justifyContent: 'center'
    },
    media: {
        width: '300px',
        height: '300px'
    }
}))

const quillModules = {
    toolbar: [
        [{'header': '1'}, {'header': '2'}, {'font': []}],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
        ['link'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link'
]


const UpdateCourse = ({targetCourse, loading, err, updateErr, updating, success}) => {
    const classes = useStyles()

    let {id} = useParams();

    useEffect(() => {
        store.dispatch(fetchCurrentCourse(id))

        return () => {
            store.dispatch(lecCourseSlice.actions.clearUpdateCourseState())
        }
    }, [])

    const shortDescRef = useRef();
    const discountRef = useRef();
    const [fullDesc, setFullDesc] = useState();

    useEffect(() => {
        if (targetCourse) {
            setFullDesc(targetCourse.full_desc)
        }
    }, [targetCourse])

    const history = useHistory()

    return (
        <div className={classes.root}>
            <PageFrame>
                {
                    !targetCourse || loading ?
                        <div className={classes.loadingCenter}>
                            <CircularProgress/>
                        </div> :
                        <>
                            {
                                err ?
                                    <Typography variant={"body2"} color={"error"}>
                                        {err}
                                    </Typography> :
                                    <div className={classes.main}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Typography variant={"h6"} color={"primary"}>
                                                    Update course info
                                                </Typography>
                                                <Divider/>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            margin={"dense"}
                                                            id={"title"}
                                                            label={"Title"}
                                                            type={"text"}
                                                            value={targetCourse.title}
                                                            disabled
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <InputLabel id={"category-select-label"}>
                                                            Category
                                                        </InputLabel>
                                                        <Select
                                                            disabled
                                                            labelId={"category-select-label"}
                                                            id={"category-select"}
                                                            value={targetCourse.category}
                                                            native
                                                        >
                                                            <option>
                                                                {targetCourse.category}
                                                            </option>
                                                        </Select>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            margin={"dense"}
                                                            id={"shortDesc"}
                                                            label={"Short Description"}
                                                            type={"text"}
                                                            inputRef={shortDescRef}
                                                            defaultValue={targetCourse.short_desc}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            disabled
                                                            margin={"dense"}
                                                            id={"price"}
                                                            label={"Price"}
                                                            type={"number"}
                                                            defaultValue={targetCourse.price}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            margin={"dense"}
                                                            id={"discount"}
                                                            label={"Discount (%)"}
                                                            type={"number"}
                                                            inputRef={discountRef}
                                                            defaultValue={targetCourse.discount * 100}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <ReactQuill
                                                            theme={"snow"}
                                                            style={{
                                                                height: "20vh",
                                                                width: "40vw"
                                                            }}
                                                            onChange={(html) => setFullDesc(html)}
                                                            defaultValue={targetCourse.full_desc}
                                                            // defaultValue={targetCourse.fullDesc}
                                                            modules={quillModules}
                                                            formats={quillFormats}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        Course avatar
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Paper elevation={3} className={classes.media}>
                                                            <CardMedia
                                                                className={classes.media}
                                                                component={"img"}
                                                                src={"data:image/png;base64," + targetCourse.ava}
                                                            />
                                                        </Paper>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} style={{marginTop: "48px"}}>
                                                {updateErr ? <>
                                                    <Typography component={"p"} color={"error"}
                                                                style={{marginBottom: '16px'}}>
                                                        {updateErr}
                                                    </Typography>
                                                </> : null}
                                                {
                                                    updating ? <>
                                                        <div className={classes.loadingCenter}>
                                                            <CircularProgress/>
                                                        </div>
                                                    </> : <div className={classes.buttonBar}>
                                                        <Button variant={"contained"} color={"primary"} onClick={() => {
                                                            store.dispatch(updateCourse({
                                                                "cid": id,
                                                                "short_desc": shortDescRef.current.value,
                                                                "full_desc": fullDesc,
                                                                "discount": discountRef.current.value,
                                                            }))
                                                        }
                                                        }>
                                                            Update
                                                        </Button>
                                                        <Button style={{marginLeft: '8px'}} variant={"contained"}
                                                                color={"secondary"}
                                                                onClick={() => history.push("/course/manage")}>
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                }
                                            </Grid>
                                        </Grid>
                                    </div>
                            }
                        </>
                }
            </PageFrame>
            <AnnounceDialog open={success} title={"Update success"} content={"Successfully updated"} onClose={() => {
                history.push("/course/manage")
            }}/>
        </div>
    )
}

const mapStateToProps = state => ({
    targetCourse: state.lecCourse.currentCourse,
    loading: state.lecCourse.currentCourseFetching,
    err: state.lecCourse.currentCourseErr,
    updateErr: state.lecCourse.updatingErr,
    updating: state.lecCourse.updatingCourse,
    success: state.lecCourse.updatingCourseDone,
})

export default connect(
    mapStateToProps
)(UpdateCourse)