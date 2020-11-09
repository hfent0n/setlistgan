import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe';
import YTSearch from 'youtube-api-search';
import { withStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import SaveIcon from '@material-ui/icons/Save';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import Tooltip from '@material-ui/core/Tooltip';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';

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
        YTSearch({key: 'AIzaSyBgIgflUoEkpA6pk6MPdjfg9bhLMG1ycps', term: props.suggestion, results: 1}, (videos) =>{
            console.log(videos);
            setUrl(videos[0].id.videoId);
            props.onChange(props.suggestion, videos[0].id.videoId);
        });

        
    }, [props.suggestion]);

    return (
        <Iframe url={`http://www.youtube.com/embed/${url}`}
            width="600px"
            height="450px"
        />
    );
}


//Unfinished

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
      margin: theme.spacing(0.5),
      border: 'none',
      '&:not(:first-child)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-child': {
        borderRadius: theme.shape.borderRadius,
      },
    },
}))(ToggleButtonGroup);

export function Feedback(props) {

    const handleSaved = (event, newSaved) => {
        props.onChange(newSaved);
    }

    const handleLike = (event, newLike) => {
        props.onChangeLike(newLike)
    }

    const [showSaved, setShowSaved] = useState('');
    const handleShowSaved = (event, newShowSaved) => {
        props.onShowSaved(newShowSaved);
    }
    
   

    return (
        <div>
            <Grid
                container
                direction="column"
                alignItems="flex-end"
                justify="flex-end"
                style = {{minWidth: '620px'}}

            >
                <Grid item>
                    <StyledToggleButtonGroup
                        size="small"
                        value={props.likes.[props.suggestion]}
                        exclusive
                        onChange={handleLike}

                    >
                        <Tooltip title="I Like this suggestion">
                            <ToggleButton value="like">
                                <ThumbUpIcon color={props.likes.[props.suggestion]==='like' ? 'primary' : 'action'}/>
                            </ToggleButton>
                        </Tooltip>

                        <Tooltip title="I dislike this suggestion">
                            <ToggleButton value="dislike">
                                <ThumbDownIcon color={props.likes.[props.suggestion]==='dislike' ? 'primary' : 'action'}/>
                            </ToggleButton>
                        </Tooltip>
                    </StyledToggleButtonGroup>

                    <StyledToggleButtonGroup
                        size="small"
                        value={props.savedButton.[props.suggestion]}
                        onChange={handleSaved}
                        exclusive
                    >
                        <Tooltip title="Save">
                            <ToggleButton value="save">
                                <SaveIcon color={props.savedButton.[props.suggestion]==='save' ? 'primary' : 'action'}/>
                            </ToggleButton>
                        </Tooltip>
                    </StyledToggleButtonGroup>
                    <StyledToggleButtonGroup
                        size="small"
                        value={showSaved}
                        exclusive
                        onChange={handleShowSaved}
                    >  
                        <Tooltip title="Show saved">
                            <ToggleButton value="saved" >
                                <BookmarksIcon  color={showSaved==='saved' ? 'primary' : 'action'}/>
                            </ToggleButton>
                        </Tooltip>
                    </StyledToggleButtonGroup>
                </Grid>

                

            
            </Grid>
        </div>
    );
}

