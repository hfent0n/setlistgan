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
            console.log("remove")
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


    const saveButton = {

    }

    return (
        <div>
            <Song onChange={changeSuggestion} />
            <SuggestionDisplay suggestion={suggestion}/>
            {suggestion===null ? null : <YoutubeDisplay onChange ={changeVideo} suggestion={suggestion}/> }
            <Feedback onChange={changeSaved} onChangeLike={changeLike} likes={likes} savedButton={savedButton} suggestion={suggestion}/>
            <Saved saved={saved}/>
        </div>
        
        
    );
}