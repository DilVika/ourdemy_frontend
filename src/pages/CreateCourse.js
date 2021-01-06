import React, {useEffect, useRef, useState} from "react";
import {
    useHistory,
    Redirect
} from 'react-router-dom'
import {makeStyles} from "@material-ui/core/styles";
import PageFrame from "../components/PageFrame";
import {Button, Divider, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageUploader from 'react-images-upload';
import store from "../store";
import {createCourse, lecCourseSlice} from "../store/course/lec";
import {connect} from "react-redux";

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
    }
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


const CreateCourse = ({cats, err, finish}) => {
    const classes = useStyles()

    const titleRef = useRef("")
    const shortDescRef = useRef("");
    const priceRef = useRef("")
    const [category, setCategory] = useState(0);
    const [fullDesc, setFullDesc] = useState("");
    const [ava, setAva] = useState(null);

    const history = useHistory()

    useEffect(() => {
        return () => {
            store.dispatch(lecCourseSlice.actions.resetCreatingCourseState())
        }
    }, [])

    return (
        <>
            {
                finish ? <Redirect to={"/course/manage"}/> : <div className={classes.root}>
                    <PageFrame>
                        <div className={classes.main}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant={"h6"} color={"primary"}>
                                        Create course
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
                                                inputRef={titleRef}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
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
                                                {/*<option id={"none-option"} aria-label="None" value=""/>*/}
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
                                            <TextField
                                                margin={"dense"}
                                                id={"shortDesc"}
                                                label={"Short Description"}
                                                type={"text"}
                                                inputRef={shortDescRef}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                margin={"dense"}
                                                id={"price"}
                                                label={"Price"}
                                                type={"number"}
                                                inputRef={priceRef}
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
                                                value={fullDesc}
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
                                            <ImageUploader
                                                withIcon
                                                buttonText='Choose images'
                                                withPreview
                                                singleImage
                                                onChange={(pic) => setAva(pic)}
                                                imgExtension={['.jpg', '.png']}
                                                maxFileSize={5242880}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{marginTop: "48px"}}>
                                    {err ? <>
                                        <Typography component={"p"} color={"error"} style={{marginBottom: '16px'}}>
                                            {err}
                                        </Typography>
                                    </> : null}
                                    <div className={classes.buttonBar}>
                                        <Button variant={"contained"} color={"primary"} onClick={() => {
                                            store.dispatch(createCourse({
                                                "cid": category,
                                                "name": titleRef.current.value,
                                                "short_desc": shortDescRef.current.value,
                                                "full_desc": fullDesc,
                                                "fee": priceRef.current.value,
                                                "ava": ava
                                            }))
                                        }}>
                                            Submit
                                        </Button>
                                        <Button style={{marginLeft: '8px'}} variant={"contained"} color={"secondary"}
                                                onClick={() => history.push("/course/manage")}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </PageFrame>
                </div>
            }
        </>
    )
}

const mapStateToProps = state => ({
    cats: state.cat.category,
    err: state.lecCourse.creatingCourseErr,
    finish: state.lecCourse.creatingCourseDone
})

export default connect(
    mapStateToProps
)(CreateCourse)