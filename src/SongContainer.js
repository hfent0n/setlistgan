import React, { useEffect, useState } from 'react';
import { Song } from './Song';
import { SuggestionCard } from './SuggestionDisplay';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';


export function SongContainer(props){
    const [suggestion, setSuggestion] = useState(null);
    const changeSuggestion = (newSuggestion) => {
        setSuggestion(newSuggestion);
    }
    
    
   
    const [saved, setSaved] = useState([]);
    const [savedButton, setSavedButton] = useState({})
    const changeSaved = (newSaved) => {
        console.log(newSaved)
        const key=newSaved.artist.concat(' - '.concat(newSaved.title))
        console.log(saved)
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

    const [video, setVideo] = useState({});
    const changeVideo = ((title, newVideo) => {
        setVideo({
            title: title,
            video: newVideo
        });
    })

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

    console.log(suggestion)

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
                        <Grid item xs={8} style={{ minWidth: '40%'}}>
                            <SuggestionCard suggestion={suggestion} onChange={changeSaved} onChangeLike={changeLike} likes={likes} savedButton={savedButton} onShowSaved={changeShowSaved}/>
                        </Grid>
                        
                    </Grid>
                </div>
            );
        }
    
    }
    else{
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