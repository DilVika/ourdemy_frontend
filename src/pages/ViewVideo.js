import React, {useState} from "react";
import {Grid, makeStyles} from "@material-ui/core";
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

const useStyle = makeStyles((theme) => {

})

const ViewVideo = ({courseContents}) => {
    const classes = useStyle()
    const isOpenArray = courseContents.map((chapter, index) => {
        return false
    })

    const [itemOpen, setItemOpen] = useState(isOpenArray);

    const history = useHistory();

    const toggleItem = (index, open) => {
        const itemOpenCopy = [...itemOpen]
        itemOpenCopy[index] = open
        setItemOpen(itemOpenCopy)
    }

    const navChapter = (vid) => {
        history.push(`/course/view/${vid}`)
    }

    const { vid } = useParams()
    console.log(vid)

    return (
        <div>
            <PageFrame>
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <h2>{ vid }</h2>
                        <ReactPlayer url='https://www.youtube.com/watch?v=AmJv8yx57dM' width={'100%'} height={'80vh'}/>

                    </Grid>
                    <Grid item xs={3}>
                        <List>
                            {
                                courseContents.map((chapter, index) => (
                                    <div key={chapter.ccid}>
                                        <ListItem button onClick={(e) => toggleItem(index, !itemOpen[index])}>
                                            <ListItemText primary={chapter.name}/>
                                            <div role="button" >
                                                {itemOpen[index] ? <IconExpandLess/> :
                                                <IconExpandMore/>}
                                            </div>
                                        </ListItem>
                                        {
                                            chapter.video ?
                                                <Collapse in={itemOpen[index]} timeout="auto" unmountOnExit>
                                                    <Divider/>
                                                    <List component="div" disablePadding>
                                                        {chapter.video.map((video, index) => (
                                                            <ListItem button key={video.vid}>
                                                                <ListItemText inset
                                                                              onClick={() => navChapter(video.vid)}
                                                                              primary={video.title}/>
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </Collapse>
                                                :null
                                        }
                                    </div>
                                ))
                            }
                        </List>
                    </Grid>
                </Grid>
            </PageFrame>
        </div>
    )
}

ViewVideo.defaultProps = {
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

export default ViewVideo