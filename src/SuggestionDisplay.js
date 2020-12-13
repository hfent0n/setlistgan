import React, { useState, useEffect, useRef } from 'react';
import YTSearch from 'youtube-api-search';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
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
import YouTubeIcon from '@material-ui/icons/YouTube';
import albumArt from 'album-art';
import ReactPlayer from 'react-player'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      overflow: 'visible !important',
      margin:'20px'
    },
    media: { 
        display: 'flex',
        position: 'relative',
        left: '15px',
        top: '-20px',
        boxShadow: '0 3px 4px 0 rgba(0,0,0,0.5)'
    },
    details: {
      display: 'flex',
      flexGrow: 1,
      paddingLeft: '20px'
      
    },
    feedbackButton: {
       display: 'flex',
    },
    padButtons: {
        display: 'flex', 
        padding: '0px',
        alignItems: 'flex-end',
        paddingBottom: '0px !important'
    },
    youtube: {
        color: 'rgba(255, 0, 0, 1)'
    },
    player: { 
        display: 'flex',
        justifyContent: 'center'

    },
    loadingWheel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAalign: 'center',
        minHeight: '80vh'
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

    

    const [art, setArt] = useState({});
    useEffect(() => {
        props.suggestion.forEach(suggestion => {
            const key = suggestion.artist + ' - ' + suggestion.title
            albumArt(suggestion.artist, {album: suggestion.title, size:'medium'} , ( error, response ) => {
                if (typeof(response) !== "string"){
                    albumArt(suggestion.artist, {size:'medium'} , ( error, response ) => {
                        if (typeof(response) !== "string"){
                            setArt((prev) => (
                                {
                                    ...prev, 
                                    [key]: 'https://images.eil.com/large_image/QUEEN_THE%2BGAME-318339.jpg'
                                
                                }
                            ))
                        }
                        else{
                            setArt((prev) => (
                                {
                                    ...prev, 
                                    [key]: response
                                
                                }
                            ))
                        }
                    })
                }
                else{
                    setArt((prev) => (
                        {
                            ...prev, 
                            [key]: response
                        
                        }
                    ))
                }
                
            })
        })
        return () => setArt({});
    }, [props.suggestion])
    
    
    const [youtube, setYoutube] = useState({});
    useEffect(() => {
        setYoutube(props.suggestion.reduce((acc, val) => (acc[val.artist + ' - ' + val.title] = false, acc), {}));
        return () => setYoutube({});
    }, props.suggestion)
    const onYoutube = (newYoutube, suggestion) => {
        const key = suggestion.artist + ' - ' + suggestion.title;
        
        setYoutube((prev) =>(
            {
                ...prev,
                [key]: newYoutube
            }
        ))
        
    }

    
    
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (Object.keys(props.suggestion).length === Object.keys(art).length){
            setLoading(false);
            props.onLoadArt(false)
        }
        return () => {
            setLoading(true);
            props.onLoadArt(true);
        }
    })
    
    const suggestions = props.suggestion.map((x, index) => (
        <Grid item xs = {12}>
        <Card 
            key = {index}
            className={classes.root}
        >
            <div >    
                <CardMedia
                    className={classes.media}
                    image={art.[x.artist + ' - ' + x.title]}
                    title=""
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
                    <Feedback index={index} onChange={props.onChange} onChangeLike={props.onChangeLike} likes={props.likes} savedButton={props.savedButton} onShowSaved={props.onShowSaved} suggestion={props.suggestion} onYoutube={onYoutube}/>
                </CardContent>
            </div>
            
        </Card>
        <div className={classes.player}>
            <YoutubeDisplay  youtube={youtube[x.artist + ' - ' + x.title]} suggestion={x.artist + ' - ' + x.title}></YoutubeDisplay>
        </div>
        
        </Grid>
        ))
    
    if (loading === true){
        return (
            <Grid item xs = {12} className={classes.loadingWheel}>
                <CircularProgress></CircularProgress>
            </Grid>
        );
        
    }
    else{
        
        return(
            <Grid
                style={{marginTop: 10}}
                container
                spacing={2}
            >
                {suggestions}
    
            </Grid>
        );
    }
    
    
}


export function YoutubeDisplay(props){
    const [url, setUrl] = useState('');
    
    
    useEffect(() => {
        if (url === '' && props.youtube === true){
            
            YTSearch({key: 'AIzaSyAWZ_kI06oQLDacuFiRX7mITlT-PvmVgOw', term: props.suggestion, results: 1}, (videos) =>{
                setUrl(videos[0].id.videoId);
            });
            //setUrl('https://www.youtube.com/watch?v=qEoxJ0QZkZ4');
            console.log("SET!");
        }
        else{
            console.log(url)
        }
        
    }, [props.youtube]);
       

        
 
    if (props.youtube === true){
        return (
            <ReactPlayer url={`http://www.youtube.com/embed/${url}`}
                width="600px"
                height="450px"
            />
        );
    }

    else{
        return(null)
    }


    
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
    
   const [youtube, setYoutube] = useState(false) 
   const handleYoutube = (event, newYoutube) => {
        setYoutube(!youtube);
        props.onYoutube(!youtube, props.suggestion[props.index]);
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
                <StyledToggleButtonGroup>
                    <Tooltip title="View on Youtube">
                        <ToggleButton 
                            value="Youtube"
                            onChange={handleYoutube}
                        >
                            <YouTubeIcon className={classes.youtube}/>
                        </ToggleButton>
                    </Tooltip>
                </StyledToggleButtonGroup>
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

