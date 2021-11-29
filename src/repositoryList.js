import React, {useState, useEffect} from 'react';
import {useDebounce} from "use-debounce";
import {useQuery} from "@apollo/client";
import CircularProgress from '@mui/material/CircularProgress';

import {SEARCH_FOR_REPOS} from "./queries";
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Repository from "./repository";

const useStyles = makeStyles({
    note: {
        marginTop: '1rem',
        textAlign: 'center',
    },
    spinnerContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '1rem'
    }
});

const RepositoryList = ({searchTerm}) => {
    const classes = useStyles();
    const [expandedRepo, setExpandedRepo] = useState(null);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
    const {data, loading, error} = useQuery(SEARCH_FOR_REPOS,
        {variables: {search_term: debouncedSearchTerm}}
    );

    useEffect(() => {
        setExpandedRepo(null);
    }, [data]);

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
                className={classes.note}
                component={'div'}
                color={'error'}
            >
                {error}
            </Typography>
        )
    }

    if (!data.search.repositoryCount) {
        return (
            <Typography
                variant={'overline'}
                className={classes.note}
                component={'div'}
            >
                There are no such repositories!
            </Typography>
        )
    }

    return (
        <div>
            {data.search.edges.map((repo, i) => (
                <Repository
                    repo={repo}
                    expanded={expandedRepo === i}
                    onToggled={() => setExpandedRepo(i)}
                    key={i}
                />
            ))}
        </div>
    );
};

export default RepositoryList;