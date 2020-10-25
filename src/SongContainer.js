import React, { useState } from 'react';
import { Song } from './Song';
import { SuggestionDisplay, YoutubeDisplay, Feedback } from './SuggestionDisplay';
import { Saved } from './Saved'

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
        return (
            <div>
                <Song onChange={changeSuggestion} />
                <SuggestionDisplay suggestion={suggestion}/>
                {suggestion===null ? null : <YoutubeDisplay onChange ={changeVideo} suggestion={suggestion}/> }
                <Feedback onChange={changeSaved} onChangeLike={changeLike} likes={likes} savedButton={savedButton} onShowSaved={changeShowSaved} suggestion={suggestion}/>
                
            </div>
            
            
        );
    }
    else{
        return <Saved saved={saved} onShowSaved={changeShowSaved}/>
    }
}