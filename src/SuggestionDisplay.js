import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe';
import YTSearch from 'youtube-api-search';

export function SuggestionDisplay(props){
    return (
        <div>
            <h1>{props.suggestion}</h1>
        </div>
    );
}

export function YoutubeDisplay(props){
    const [url, setUrl] = useState('');
    
    useEffect(() => {
        YTSearch({key: 'AIzaSyBgIgflUoEkpA6pk6MPdjfg9bhLMG1ycps', term: props.suggestion}, (videos) =>{
            console.log(videos[0].id.videoId);
            setUrl(videos[0].id.videoId);
        });
    }, [props.suggestion]);

    return (
        <Iframe url={`http://www.youtube.com/embed/${url}`}
            width="450px"
            height="450px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"/>
    );
}