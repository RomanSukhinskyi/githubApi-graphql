import React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import IssueList from './issueList'

import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';

const useStyles = makeStyles({
    root: {
        marginTop: '1rem'
    },
    summaryContainer: {
        flexDirection: 'column',
    },
    summaryHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '1rem'
    },
    chip: {
        marginLeft: '0.5rem'
    }
});

const Repository = ({repo, expanded, onToggled}) => {
    const {node: {name, descriptionHTML, owner: {login}, stargazers: {totalCount: totalStarCount}}} = repo;
    const classes = useStyles();



    return (
        <Accordion
            expanded={expanded}
            onChange={onToggled}
            className={classes.root}
        >
            <AccordionSummary classes={{content: classes.summaryContainer}}>
                <div className={classes.summaryHeader}>
                    <Typography variant={'h6'}>{name}</Typography>
                    <div>
                        <Chip label={`by ${login}`} avatar={<PeopleIcon/>} className={classes.chip}/>
                        <Chip label={totalStarCount} avatar={<StarIcon/>} className={classes.chip}/>
                    </div>
                </div>
                <Typography
                    variant={'caption'}
                    dangerouslySetInnerHTML={{__html: descriptionHTML}}
                    component={'div'}
                />
            </AccordionSummary>
            <AccordionDetails>
                {expanded && (<IssueList repoName={name} repoOwner={login}/>)}
            </AccordionDetails>
        </Accordion>
    );
};

export default Repository;