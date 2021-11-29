import {useQuery} from "@apollo/client";
import React from 'react';
import Issue from "./Issue";
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';

import {GET_REPO_ISSUES} from './queries';

const useStyles = makeStyles({
    root: {
        flexDirection: 'column'
    },
    spinnerContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    }
});

const IssueList = ({repoName, repoOwner}) => {
    const classes = useStyles();
    const {data, loading, error} = useQuery(GET_REPO_ISSUES,
        {variables: {
                name: repoName,
                owner: repoOwner
            }});

    if (loading) {
        return (
            <div className={classes.spinnerContainer}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Typography
                variant={'overline'}
                component={'div'}
                color={'error'}
            >
                {error}
            </Typography>
        )
    }

    if (!data.repository.issues.nodes.length) {
        return (
            <Typography
                variant={'overline'}
                component={'div'}
            >
                There are no issues!
            </Typography>
        )
    }

    return (
        <div className={classes.root}>
            <Typography variant={'h5'}>Latest issues: </Typography>
            <List>
                {data.repository.issues.nodes.map(issue => (
                    <Issue title={issue.title} bodyHTML={issue.bodyHTML} />
                ))}
            </List>
        </div>
    );
};

export default IssueList;