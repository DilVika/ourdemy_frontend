import React from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";

import {connect} from "react-redux";

const PrivateRoute = ({children, authed, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? children
                : <Redirect to={{pathname: "/", state: {from: props.location}}} />}
        />
    )
}

const mapStateToProps = state => ({
    authed: !!state.authen.token,
})

export default connect(
    mapStateToProps
)(PrivateRoute)