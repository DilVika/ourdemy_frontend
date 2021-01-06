import React, {useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PageFrame from "../components/PageFrame";
import {
    Button,
    CardMedia,
    Divider,
    Grid,
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


const UpdateCourse = ({targetCourse, err}) => {
    const classes = useStyles()

    let {id} = useParams();

    const titleRef = useRef("")
    const shortDescRef = useRef("");
    const priceRef = useRef("")
    const [fullDesc, setFullDesc] = useState(targetCourse.fullDesc);

    const history = useHistory()

    return (
        <div className={classes.root}>
            <PageFrame>
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
                                        inputRef={titleRef}
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
                                        value={targetCourse.shortDesc}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled
                                        margin={"dense"}
                                        id={"price"}
                                        label={"Price"}
                                        type={"number"}
                                        inputRef={priceRef}
                                        value={targetCourse.price}
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
                            {err ? <>
                                <Typography component={"p"} color={"error"} style={{marginBottom: '16px'}}>
                                    {err}
                                </Typography>
                            </> : null}
                            <div className={classes.buttonBar}>
                                <Button variant={"contained"} color={"primary"}>
                                    Update
                                </Button>
                                <Button style={{marginLeft: '8px'}} variant={"contained"} color={"secondary"}
                                        onClick={() => history.push("/course/manage")}>
                                    Cancel
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </PageFrame>
        </div>
    )
}

UpdateCourse.defaultProps = {
    "targetCourse": {
        "cid": "124",
        "category": "Genshin",
        "title": "Best farming route guide",
        "review_score": 5.0,
        "price": "9.99",
        "ava": data.exampleAva1,
        "shortDesc": "Everyday route for f2p players",
        "fullDesc": "<p>Hello</p>",
        "chapterCount": 3,
        "isDone": true
    }
}

export default UpdateCourse