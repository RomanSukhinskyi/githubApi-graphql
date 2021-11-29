import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';

const Issue = ({title, bodyHTML}) => {
    const [dialogOpened, setDialogOpened] = useState(false);
    return (
        <>
            <ListItem button onClick={() => setDialogOpened(true)}>
                <ListItemText>{title}</ListItemText>
            </ListItem>
            <Dialog maxWidth={'xl'} open={dialogOpened} onClose={() => setDialogOpened(false)}>
                <DialogContent>
                    <div dangerouslySetInnerHTML={{__html: bodyHTML}}/>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Issue;