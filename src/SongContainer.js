import React, { useState } from 'react';
import { Song } from './Song';
import { SuggestionDisplay, YoutubeDisplay, Feedback } from './SuggestionDisplay';
import { Saved } from './Saved'
import Grid from '@material-ui/core/Grid';

export function SongContainer(props){
    const [suggestion, setSuggestion] = useState(null);
    const changeSuggestion = (newSuggestion) => {
        setSuggestion(newSuggestion);
    }

    const [saved, setSaved] = useState([]);
    const [savedButton, setSavedButton] = useState({})
    const changeSaved = (newSaved) => {
        setSavedButton((prev) => (
            {
                ...prev,
                [suggestion]: newSaved
            }
        ))
        if (newSaved==='save'){
            setSaved((prev) => ([...prev, video]));
        }
        else {
            console.log(saved)
            console.log(video);
            setSaved((prev) => {
                return prev.filter((item => item.title !== video.title))
            });
            console.log(saved)
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
    const changeLike = ((newLike) => {
        setLikes((prev) => ({
            ...prev,
            [suggestion]: newLike
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
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={6}>   
                            <Song onChange={changeSuggestion} />
                        </Grid>
                    </Grid>
                    
                    
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                    >

                        <grid item >
                            <SuggestionDisplay suggestion={suggestion}/>
                        </grid>
                        <grid item >
                            <YoutubeDisplay onChange ={changeVideo} suggestion={suggestion}/>
                        </grid>
                        <grid item >
                            <Feedback onChange={changeSaved} onChangeLike={changeLike} likes={likes} savedButton={savedButton} onShowSaved={changeShowSaved} suggestion={suggestion}/>
                        </grid>
                        
                    </Grid>
                </div>
            );
        }
    
    }
    else{
        return <Saved saved={saved} onShowSaved={changeShowSaved} removeSave={removeSave}/>
    }
}