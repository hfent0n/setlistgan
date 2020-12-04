import React from 'react';
import Iframe from 'react-iframe';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Grid from '@material-ui/core/Grid';
import { SuggestionCard } from './SuggestionDisplay'
export function Saved(props){
    var saved = props.saved.map((save, index) => (
        <Grid item>
            
            <IconButton onClick={() => props.removeSave(save.title)}>
                <BackspaceIcon />
            </IconButton>
        </Grid>
    ))
    return (
        <div>
            <div>
                <IconButton onClick={() => props.onShowSaved(null)}>
                    <ArrowBackIcon />
                </IconButton>
            </div>
            <Grid 
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                
                    <div>
                        
                        {saved.length ? saved : <p>Nothing here!</p>}

                    </div>
                
            </Grid>
        </div>

    );
}