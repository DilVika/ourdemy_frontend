import PageFrame from "../components/PageFrame";
import React, {useEffect, useState} from "react";
import {CircularProgress, Divider, GridList, GridListTile, List, ListItem, Typography} from "@material-ui/core";
import ComplexCard from "../components/ComplexCard";
import {Pagination} from "semantic-ui-react";
import {useHistory, useLocation} from "react-router-dom";
import store from "../store";
import {fetchAllCourse, fetchAllCourseByCat, fetchAllCourseBySubcat, listSlice} from "../store/course/home/list";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const useStyle = makeStyles((theme) => ({
    loadingCenter: {
        marginTop: '16px',
        display: 'flex',
        justifyContent: 'center'
    },
    main: {
        width: '99%',
        height: '99%'
    },
    rowList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 0,
        width: '99%'
    }
}));

const Courses = ({courses, fetching, err}) => {
    const classes = useStyle()
    const history = useHistory()

    const query = useQuery()
    const catId = query.get("catId")
    const subcatId = query.get("subcatId")

    useEffect(() => {
        if (subcatId !== null) {
            store.dispatch(fetchAllCourseBySubcat({
                "id": subcatId,
            }))
        } else if (catId !== null) {
            store.dispatch(fetchAllCourseByCat({
                "id": catId
            }))
        } else {
            store.dispatch(fetchAllCourse())
        }
        return () => {
            store.dispatch(listSlice.actions.clear())
        }
    }, [catId, subcatId])

    const [coursePage, setCoursePage] = useState(0);

    return (
        <PageFrame>
            <div className={classes.main}>
                <Typography component={"h3"} color={"primary"}>Courses</Typography>
                <Divider/>
                {
                    fetching ?
                        <div className={classes.loadingCenter}>
                            <CircularProgress/>
                        </div> :
                        <>
                            <GridList className={classes.rowList} cols={5} cellHeight={400}>
                                {
                                    courses
                                        .slice(coursePage * 10, coursePage * 10 + 10)
                                        .map((course, index) => {
                                            return (
                                                <GridListTile
                                                    key={course.Id}
                                                    cols={1}
                                                    rows={1}
                                                >
                                                    <ComplexCard
                                                        key={course.id}
                                                        className="item"
                                                        id={course.id}
                                                        title={course.title}
                                                        price={course.currentPrice}
                                                        kind={course.category}
                                                        rate={course.review_score}
                                                        count={10} // TODO please change
                                                        author={course.lecturer}
                                                        imagesrc={`data:image/png;base64,${course.ava}`}
                                                    />
                                                </GridListTile>
                                            )
                                        })
                                }
                            </GridList>
                            <Pagination
                                totalPages={(courses && Math.floor((courses.length + 9) / 10)) || 0}
                                shape="rounded"
                                page={coursePage}
                                onPageChange={(_, p) => setCoursePage(p.activePage)}
                            />
                        </>
                }
            </div>
        </PageFrame>
    );
};

const mapStateToProp = state => ({
    courses: state.list.courses,
    fetching: state.list.fetching,
    err: state.list.err,
})

export default connect(
    mapStateToProp
)(Courses);
