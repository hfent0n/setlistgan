import React, { useEffect, useState } from 'react';
import { Song } from './Song';
import { SuggestionCard } from './SuggestionDisplay';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import { Save } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      
    }
    
  }));


export function SongContainer(props){
    
    const classes=useStyles();
    
    const [suggestion, setSuggestion] = useState(null);
    const changeSuggestion = (newSuggestion) => {
        setSuggestion(newSuggestion);
    }
    
    
   
    const [saved, setSaved] = useState([]);
    const [savedButton, setSavedButton] = useState({})
    const changeSaved = (newSaved) => {
        const key=newSaved.artist.concat(' - '.concat(newSaved.title))
        if (saved.includes(newSaved)){
            setSaved((prev) => {
                return prev.filter((item => item !== newSaved))
            });

            setSavedButton((prev) => (
                {
                    ...prev,
                    [key]: 'null'
                }
            ))

        }
        else{
            setSaved((prev) => (
                [...prev, newSaved]
            ))

            setSavedButton((prev) => (
                {
                    ...prev,
                    [key]: 'save'
                }
            ))
        }
        
    
    }

    const removeSave = (title) => { 
        setSaved((prev) => { 
            return prev.filter((item => item.title !== title ))
        })
    }

    

    const [likes, setLikes] = useState({});
    const changeLike = ((newLike, index) => {
        const key = suggestion[index].artist.concat(' - '.concat(suggestion[index].title))
        setLikes((prev) => ({
            ...prev,
            [key]: newLike
        })
    )});

    const [showSaved, setShowSaved] = useState('');
    const changeShowSaved = ((show) => {
        setShowSaved(show);
        
    })


    if (showSaved !== 'saved'){
        if (suggestion==null){
            return (
                <div>
                    <Grid 
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-end"
                        style={{ minHeight: '30vh' }}
                    >
                        <Grid item xs={6}>   
                            <Song onChange={changeSuggestion} />
                        </Grid>
                    </Grid>
                    
                    
                </div>
                
                
            );
        }

        else{
            return (
                <div>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                        spacing={1}
                    >

                        <Grid item xs={8} style={{ minWidth: '60%'}} >   
                            <Song onChange={changeSuggestion} />
                        </Grid>
                        <Grid item xs={8} style={{ minWidth: '65%'}}>
                            <SuggestionCard suggestion={suggestion} onChange={changeSaved} onChangeLike={changeLike} likes={likes} savedButton={savedButton} onShowSaved={changeShowSaved}/>
                        </Grid>
                        
                    </Grid>
                </div>
            );
        }
    
    }
    else{
        if (saved.length == 0){
            return (
                <div>
                    <IconButton onClick={() => setShowSaved(null)}>
                        <ArrowBackIcon />
                    </IconButton>
                    <div className ={classes.root}>
                    <Typography variant="h3" gutterBottom>
                        Nothing to show. Click the Save Icon to save suggestions.
                    </Typography>
                    </div>
                    <div className ={classes.root}>
                        <SaveIcon style={{ fontSize: 100 }} ></SaveIcon>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <IconButton onClick={() => setShowSaved(null)}>
                    <ArrowBackIcon />
                </IconButton>
                <SuggestionCard suggestion={saved} onChange={changeSaved} onChangeLike={changeLike} likes={likes} savedButton={savedButton} onShowSaved={changeShowSaved}/>
            </div>
        )
        
    }
}