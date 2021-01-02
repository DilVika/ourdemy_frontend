import React from 'react';

import PageFrame from "../components/PageFrame";
import {Divider, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        width: '100%',
    },
}))

const Profile = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <PageFrame>
                <div>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Typography variant={"h6"} align={"center"} color={"primary"}>
                                Profile
                            </Typography>
                            <Divider/>
                        </Grid>
                    </Grid>
                </div>
            </PageFrame>
        </div>
    );
}

export default Profile;