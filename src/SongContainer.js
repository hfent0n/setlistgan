import React, { useState } from 'react';
import { Song } from './Song';
import { SuggestionDisplay, YoutubeDisplay, Feedback } from './SuggestionDisplay';


export function SongContainer(props){
    const [suggestion, setSuggestion] = useState(null);

    const changeSuggestion = (newSuggestion) => {
        setSuggestion(newSuggestion);
    }

    return (
        <div>
            <Song onChange={changeSuggestion} />
            <SuggestionDisplay suggestion={suggestion} />
            {suggestion===null ? null : <YoutubeDisplay suggestion={suggestion}/> }
        </div>
        
        
    );
}