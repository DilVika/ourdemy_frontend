import React from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";

import {connect} from "react-redux";

const AdminRoute = ({children, authed, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => authed
                ? children
                : <Redirect to={{pathname: "/admin/signin", state: {from: props.location}}}/>}
        />
    )
}

const mapStateToProps = state => ({
    authed: !!state.adminAuth.adminToken,
})

export default connect(
    mapStateToProps
)(AdminRoute)