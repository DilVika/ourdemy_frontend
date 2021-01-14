import React, {useEffect, useRef, useState} from "react";
import {Chip, CircularProgress, Grid, makeStyles, Typography} from "@material-ui/core";
import PageFrame from "../components/PageFrame";
import ReactPlayer from "react-player";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import Divider from "@material-ui/core/Divider";
import {useHistory} from "react-router-dom";
import {useParams} from "react-router"
import {fetchVidCurrentCourse, getTime, markTime, videoSlice} from "../store/course/video";
import store from "../store";
import {connect} from "react-redux";
import {checkJoin, joinSlice} from "../store/course/detail/join";

const useStyle = makeStyles((theme) => ({
    loadingCenter: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

const ViewVideo = ({courseContents, vidUrl, loading, err, time, joined}) => {
    const classes = useStyle()

    const [itemOpen, setItemOpen] = useState([]);
    const [videoTitle, setVideoTitle] = useState("");
    const [currentChapterPreviewable, setCurrentChapterPreviewable] = useState(false);

    const history = useHistory();

    const {cid, vid} = useParams()

    useEffect(() => {
        store.dispatch(getTime(
            {
                "vid": vid
            }
        ))
        store.dispatch(fetchVidCurrentCourse({
            "cid": cid,
            "vid": vid
        }))
        store.dispatch(checkJoin({"id": cid}))

        return () => {
            store.dispatch(videoSlice.actions.clear())
            store.dispatch(joinSlice.actions.clear())
        }
    }, [])

    useEffect(() => {
        store.dispatch(fetchVidCurrentCourse({
            "cid": cid,
            "vid": vid
        }))
    }, [history.location.pathname])

    useEffect(() => {
        if (courseContents) {
            const isOpenArray = courseContents.chapters.map((chapter, index) => {
                return false
            })
            setItemOpen(isOpenArray)

            let breakFlag = false
            for (const chap of courseContents.chapters) {
                for (const video of chap.videos) {
                    if (video.Id === vid) {
                        setCurrentChapterPreviewable(chap.previewable)
                        setVideoTitle(video.title)
                        breakFlag = true
                        break
                    }
                }
                if (breakFlag) {
                    break
                }
            }

        }
    }, [courseContents])

    const toggleItem = (index, open) => {
        const itemOpenCopy = [...itemOpen]
        itemOpenCopy[index] = open
        setItemOpen(itemOpenCopy)
    }

    const navChapter = (vid) => {
        history.push(`/course/${cid}/view/${vid}`)
    }

    const playerRef = useRef()

    console.log(loading)
    console.log(courseContents)

    return (
        <div>
            <PageFrame>
                {
                    err ?
                        <Typography variant={"div"} color={"error"}>
                            {err}
                        </Typography> : <>
                            {
                                !courseContents || loading ?
                                    <div className={classes.loadingCenter}><CircularProgress/></div> :
                                    <Grid container spacing={3}>
                                        {
                                            joined || currentChapterPreviewable ? <Grid item xs={9}>
                                                    <h2>{videoTitle}</h2>
                                                    <ReactPlayer
                                                        ref={playerRef}
                                                        url={`${vidUrl}#t=${time}`} width={'100%'}
                                                        progressInterval={10000}
                                                        onStart={() => {
                                                            const intTime = Math.floor(time);
                                                            playerRef.current.seekTo(intTime, 'seconds')
                                                        }
                                                        }
                                                        onProgress={(state) => {
                                                            store.dispatch(markTime({
                                                                "vid": vid,
                                                                "curTime": state.playedSeconds
                                                            }))
                                                        }
                                                        }
                                                        config={{
                                                            file: {
                                                                attributes: {
                                                                    controls: true,
                                                                }
                                                            }
                                                        }}
                                                        height={'80vh'}/>
                                                </Grid>
                                                : <Grid item xs={9}>
                                                    This chapter is not previewable, please join the course to view this chapter
                                                </Grid>
                                        }
                                        <Grid item xs={3}>
                                            <List>
                                                {
                                                    courseContents.chapters.map((chapter, index) => (
                                                        <div key={chapter.Id}>
                                                            <ListItem button
                                                                      onClick={
                                                                          (e) =>
                                                                              joined || chapter.previewable ?
                                                                                  toggleItem(index, !itemOpen[index])
                                                                                  : null}>
                                                                <ListItemText primary={chapter.title}/>
                                                                {
                                                                    chapter.previewable ?
                                                                        <Chip color={"primary"}
                                                                              label={"Previewable"}/> : null
                                                                }
                                                                <div role="button">
                                                                    {itemOpen[index] ? <IconExpandLess/> :
                                                                        <IconExpandMore/>}
                                                                </div>
                                                            </ListItem>
                                                            {
                                                                chapter.videos ?
                                                                    <Collapse in={itemOpen[index]} timeout="auto"
                                                                              unmountOnExit>
                                                                        <Divider/>
                                                                        <List component="div" disablePadding>
                                                                            {chapter.videos.map((video, index) => (
                                                                                <ListItem button key={video.Id}>
                                                                                    <ListItemText inset
                                                                                                  onClick={() => navChapter(video.Id)}
                                                                                                  primary={video.title}/>
                                                                                </ListItem>
                                                                            ))}
                                                                        </List>
                                                                    </Collapse>
                                                                    : null
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </List>
                                        </Grid>
                                    </Grid>
                            }
                        </>
                }
            </PageFrame>
        </div>
    )
}

const mapStateToProps = state => ({
    courseContents: state.video.currentCourse,
    loading: state.video.fetching,
    err: state.video.err,
    vidUrl: state.video.vidUrl,
    time: state.video.timeMark,
    joined: state.join.joined,
})

export default connect(
    mapStateToProps
)(ViewVideo)