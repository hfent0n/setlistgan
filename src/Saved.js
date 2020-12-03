import React from 'react';
import Iframe from 'react-iframe';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Grid from '@material-ui/core/Grid';

export function Saved(props){
    var saved = props.saved.map((save, index) => (
        <Grid item>
            <h1 key={index}>{save.title}</h1>
            <Iframe url={`http://www.youtube.com/embed/${save.video}`}
                width="450px"
                height="450px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"/>
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