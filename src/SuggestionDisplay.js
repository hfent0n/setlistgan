import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe';
import YTSearch from 'youtube-api-search';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import SaveIcon from '@material-ui/icons/Save';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import Tooltip from '@material-ui/core/Tooltip';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import album from './img/album.jpg';
import IconButton from '@material-ui/core/IconButton';
import BackspaceIcon from '@material-ui/icons/Backspace';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      
    },
    media: { 
        display: 'flex'
    },
    details: {
      display: 'flex',
      flexGrow: 1
      
    },
    feedbackButton: {
       display: 'flex',
    },
    padButtons: {
        display: 'flex', 
        padding: '0px',
        alignItems: 'flex-end',
        paddingBottom: '0px !important'
    }

  }));

  

export function SuggestionCard(props){
    const classes = useStyles();

    const styles = {
        media: {
            height: 100,
            width: 100
          },
    }
    
    
    
    const suggestions = props.suggestion.map((x, index) => (
        <Grid item xs = {12}>
        <Card 
            key = {index}
            className={classes.root}
        >
            <div className={classes.media}>    
                <CardMedia
                    image={require('./img/album.jpg')}
                    title="Live from space album cover"
                    style={styles.media}
                />
            </div> 
            <div className={classes.details}> 
                <CardContent>
                    <Typography component="h5" variant="h5">
                        {x.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {x.artist}
                    </Typography>
                </CardContent>
            </div>
            <div className={classes.feedbackButton}>
                <CardContent
                    className={classes.padButtons}
    
                >
                    <Feedback index={index} onChange={props.onChange} onChangeLike={props.onChangeLike} likes={props.likes} savedButton={props.savedButton} onShowSaved={props.onShowSaved} suggestion={props.suggestion}/>
                </CardContent>
            </div>
            
        </Card>
        </Grid>
        ))
    return(
        <Grid
            container
            spacing={2}
        >
            {suggestions}

        </Grid>
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
    const classes = useStyles();

    const handleSaved = (event, newSaved) => {
        props.onChange(props.suggestion[props.index]);
        
    }
    
    const handleLike = (event, newLike) => {  
        props.onChangeLike(newLike, props.index)
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
                style = {{minWidth: '200px'}}

            >
                <Grid item>
                    <StyledToggleButtonGroup
                        size="small"
                        value={props.likes.[props.suggestion[props.index].artist.concat(' - '.concat(props.suggestion[props.index].title))]}
                        exclusive
                        onChange={handleLike}

                    >
                        <Tooltip title="I Like this suggestion">
                            <ToggleButton value="like">
                                <ThumbUpIcon color={props.likes.[props.suggestion[props.index].artist.concat(' - '.concat(props.suggestion[props.index].title))]==='like' ? 'primary' : 'action'}/>
                            </ToggleButton>
                        </Tooltip>

                        <Tooltip title="I dislike this suggestion">
                            <ToggleButton value="dislike">
                                <ThumbDownIcon color={props.likes.[props.suggestion[props.index].artist.concat(' - '.concat(props.suggestion[props.index].title))]==='dislike' ? 'primary' : 'action'}/>
                            </ToggleButton>
                        </Tooltip>
                    </StyledToggleButtonGroup>

                    <StyledToggleButtonGroup
                        size="small"
                        value={props.savedButton.[props.suggestion[props.index].artist.concat(' - '.concat(props.suggestion[props.index].title))]}
                        onChange={handleSaved}
                        exclusive
                    >
                        <Tooltip title="Save">
                            <ToggleButton value='save'>
                                <SaveIcon color={props.savedButton.[props.suggestion[props.index].artist.concat(' - '.concat(props.suggestion[props.index].title))]==='save' ? 'primary' : 'action'}/>
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

