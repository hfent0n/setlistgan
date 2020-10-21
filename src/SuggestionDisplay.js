import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe';
import YTSearch from 'youtube-api-search';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useCookies } from 'react-cookie';

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


//Unfinished
export function Feedback(props) {
    const [cookies, setCookie] = useCookies(['id'])
    const [upvote, setUpvote] = useState(0);
    const [downvote, setDownvote] = useState(0);
    
    const handleClickUp = () => {
        setUpvote((prev) => prev + 1)
    };

    const handleClickDown = () => {
        setDownvote((prev) => prev + 1)
    }

    useEffect(() => {
        setCookie('id', Date.now());
    }, [])

    return (
        <div>
            <IconButton>
                <ThumbUpIcon onClick={handleClickUp}></ThumbUpIcon>
            </IconButton>
            <IconButton>
                <ThumbDownIcon onClick={handleClickDown}></ThumbDownIcon>
            </IconButton>
            <LinearProgress variant="determinate" value={(upvote/(upvote+downvote) * 100)} />
            <h1>{(upvote/(upvote+downvote) * 100).toFixed(2)}</h1>
        </div>
    );
}