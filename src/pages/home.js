import React, {useEffect} from "react";
import "../pages/home.css";
import "react-multi-carousel/lib/styles.css";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CircularProgress,
    Typography
} from "@material-ui/core";
import ComplexCard from "../components/ComplexCard";
import CCarousel from "../components/CCarousel";
import PageFrame from "../components/PageFrame";
import {connect} from "react-redux";
import store from "../store";
import {fetchHighlights, highLightSlice} from "../store/course/home/highlights";
import {fetchMostReg, mostRegSlice} from "../store/course/home/mostReg";
import {fetchMostViewed, mostViewedSlice} from "../store/course/home/mostViewed";
import {fetchNewest, newestSlice} from "../store/course/home/newest";
import {makeStyles} from "@material-ui/core/styles";
import {
    useHistory
} from 'react-router-dom'

const useStyle = makeStyles({
    title: {
        fontWeight: "bold",
    },
    loadingCenter: {
        display: 'flex',
        justifyContent: 'center'
    },
});


const Home = ({hl, hlLoading, hlErr, mv, mvLoading, mvErr, mr, mrLoading, mrErr, nw, nwLoading, nwErr}) => {
    const classes = useStyle()
    const history = useHistory()

    useEffect(() => {
        store.dispatch(fetchHighlights())
        store.dispatch(fetchMostViewed())
        store.dispatch(fetchMostReg())
        store.dispatch(fetchNewest())

        return () => {
            store.dispatch(highLightSlice.actions.clear())
            store.dispatch(mostViewedSlice.actions.clear())
            store.dispatch(mostRegSlice.actions.clear())
            store.dispatch(newestSlice.actions.clear())
        }
    }, [])


    return (
        <PageFrame>
            <div className="title">
                <h2>Highlights </h2>
                {
                    hlErr ? <Typography color={"error"}>{hlErr}</Typography> : <>
                        {
                            hlLoading ? <div className={classes.loadingCenter}><CircularProgress/></div> :
                                <CCarousel itemClassName="item">{
                                    hl.map((course, index) => {
                                        return (
                                            <ComplexCard
                                                key={course.id}
                                                id={course.id}
                                                className="item"
                                                title={course.title}
                                                price={course.current_price}
                                                kind={course.category}
                                                rate={course.review_score}
                                                count={course.review_count}
                                                author={course.lecturer}
                                                imagesrc={`data:image/png;base64,${course.ava}`}
                                                is_done={course.is_done}
                                            />
                                        )
                                    })
                                }</CCarousel>
                        }
                    </>
                }
            </div>
            <div className="title">
                <h2>Most Viewed</h2>
                {
                    mvErr ? <Typography color={"error"}>{mvErr}</Typography> : <>
                        {
                            mvLoading ? <div className={classes.loadingCenter}><CircularProgress/></div> :
                                <CCarousel itemClassName="item">{
                                    mv.map((course, index) => {
                                        return (
                                            <ComplexCard
                                                key={course.id}
                                                id={course.id}
                                                className="item"
                                                title={course.title}
                                                price={course.current_price}
                                                kind={course.category}
                                                rate={course.review_score}
                                                count={course.review_count}
                                                author={course.lecturer}
                                                imagesrc={`data:image/png;base64,${course.ava}`}
                                                is_done={course.is_done}
                                            />
                                        )
                                    })
                                }</CCarousel>
                        }
                    </>
                }
            </div>
            <div className="title">
                <h2>Newest</h2>
                {
                    nwErr ? <Typography color={"error"}>{mrErr}</Typography> : <>
                        {
                            nwLoading ? <div className={classes.loadingCenter}><CircularProgress/></div> :
                                <CCarousel itemClassName="item">{
                                    nw.map((course, index) => {
                                        return (
                                            <ComplexCard
                                                key={course.id}
                                                id={course.id}
                                                className="item"
                                                title={course.title}
                                                price={course.current_price}
                                                kind={course.category}
                                                rate={course.review_score}
                                                count={course.review_count}
                                                author={course.lecturer}
                                                imagesrc={`data:image/png;base64,${course.ava}`}
                                                is_done={course.is_done}
                                            />
                                        )
                                    })
                                }</CCarousel>
                        }
                    </>
                }
            </div>
            <div className="title">
                <h2>Most registered subcategory this week</h2>
                {
                    mrErr ? <Typography color={"error"}>{nwErr}</Typography> : <>
                    {
                        mrLoading ? <div className={classes.loadingCenter}><CircularProgress/></div> :
                            <CCarousel itemClassName="item">{
                                mr.map((cat, index) => {
                                    return (
                                        <Card key={cat.Id}>
                                            <CardContent>
                                                {cat.name}
                                            </CardContent>
                                            <CardActionArea>
                                                <CardActions onClick={() => {
                                                    history.push(`/course?subcatId=${cat.Id}`)
                                                }}>
                                                    <Typography color={"primary"} component={"h5"}>
                                                        Check it out
                                                    </Typography>
                                                </CardActions>
                                            </CardActionArea>
                                        </Card>
                                    )
                                })
                                }</CCarousel>
                            }
                            </>
                    }
                    </div>
                    </PageFrame>
                    );
                };

const mapStateToProps = state => {

    return ({
        hl: state.highlight.courses,
        hlLoading: state.highlight.fetching,
        hlErr: state.highlight.err,
        mv: state.mostViewed.courses,
        mvLoading: state.mostViewed.fetching,
        mvErr: state.mostViewed.err,
        mr: state.mostReg.courses,
        mrLoading: state.mostReg.fetching,
        mrErr: state.mostReg.err,
        nw: state.newest.courses,
        nwLoading: state.newest.fetching,
        nwErr: state.newest.err,
    })
}

export default connect(
    mapStateToProps
)(Home);
