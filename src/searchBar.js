import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';



const useStyles = makeStyles({
    input: {
        width: '100%'
    }
});

const SearchBar = ({value, onChange}) => {
    const classes = useStyles();

    return (
        <TextField
            className={classes.input}
            label='Search for repos...'
            type='search'
            variant='outlined'
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            value={value}
            onChange={e => onChange(e.target.value)}
        />
    );
};

export default SearchBar;