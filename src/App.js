import React, {useState} from 'react'
import SearchBar from "./searchBar";
import RepositoryList from "./repositoryList";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ApolloProvider} from "@apollo/client";
import client from "./client";

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    title: {
        marginTop: '1rem',
        marginBottom: '1rem',
        textAlign: 'center'
    }
});

function App() {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <ApolloProvider client={client}>
            <Container maxWidth={'sm'}>
                <Typography className={classes.title} variant={'h3'}> GraphQL Github Client</Typography>
                <SearchBar value={searchTerm} onChange={setSearchTerm}/>
                <RepositoryList searchTerm={searchTerm}/>
            </Container>
        </ApolloProvider>
  );
}

export default App;
