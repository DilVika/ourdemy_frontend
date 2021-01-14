import {Button, Chip, CircularProgress, makeStyles, Typography} from "@material-ui/core";
import {useHistory, useParams} from 'react-router-dom'
import PageFrame from "../components/PageFrame";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import store from "../store";
import {contentSlice, fetchContent} from "../store/course/detail/content";
import {checkJoin, joinSlice} from "../store/course/detail/join";

const useStyle = makeStyles((theme) => ({
    loadingCenter: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

const ViewContent = ({courseContents, joined, loading, err}) => {
    const classes = useStyle()
    const history = useHistory()
    const {cid} = useParams()

    const [itemOpen, setItemOpen] = useState([]);

    useEffect(() => {
        store.dispatch(fetchContent({
            "id": cid
        }))
        store.dispatch(checkJoin({"id": cid}))

        return () => {
            store.dispatch(contentSlice.actions.clear())
            store.dispatch(joinSlice.actions.clear())
        }
    }, [])

    useEffect(() => {
        if (courseContents) {
            const isOpenArray = courseContents.chapters.map((chapter, index) => {
                return false
            })
            setItemOpen(isOpenArray)
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

    return (
        <div>
            <PageFrame>
                {
                    err ? <Typography color={"error"}>
                        {err}
                    </Typography> : <>
                        {
                            !courseContents || loading ? <div className={classes.loadingCenter}>
                                    <CircularProgress/>
                                </div> :
                                <>
                                    {
                                        courseContents.chapters.length > 0 ? <List>
                                                {
                                                    courseContents.chapters.map((chapter, index) => (
                                                        <div key={chapter.Id}>
                                                            <ListItem button
                                                                      onClick={(e) => joined || chapter.previewable ? toggleItem(index, !itemOpen[index]) : null}>
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
                                            </List> :
                                            <>
                                                <Typography>
                                                    Course is currently empty, please wait for the lecturer to add more
                                                    content.
                                                </Typography>
                                                <Button color={"primary"} variant={"outlined"}
                                                        style={{marginRight: '8px'}}
                                                        onClick={() => {
                                                            history.push(`/detail/${cid}`)
                                                        }}
                                                >
                                                    Back to detail
                                                </Button>
                                                <Button color={"default"} variant={"outlined"}
                                                        onClick={() => {
                                                            history.push(`/`)
                                                        }}
                                                >
                                                    Back to home
                                                </Button>
                                            </>
                                    }
                                </>
                        }
                    </>
                }
            </PageFrame>
        </div>
    )
}

const mapStateToProps = state => ({
    courseContents: state.content.courseContent,
    loading: state.content.fetching,
    err: state.content.err,
    joined: state.join.joined,
})

export default connect(
    mapStateToProps
)(ViewContent)