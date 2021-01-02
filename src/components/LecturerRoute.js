import React from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";

import {connect} from "react-redux";

const LecturerRoute = ({children, authed, isLec, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => authed === true && isLec === true
                ? children
                : <Redirect to={{pathname: "/", state: {from: props.location}}}/>}
        />
    )
}

const mapStateToProps = state => ({
    authed: !!state.authen.token,
    isLec: state.authen.isLec
})

export default connect(
    mapStateToProps
)(LecturerRoute)