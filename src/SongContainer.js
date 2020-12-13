import React, { useEffect, useState } from 'react';
import { Song } from './Song';
import { SuggestionCard } from './SuggestionDisplay';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import albumArt from 'album-art';
import { Card, CardMedia } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      
    },
    media: {
        display: 'flex',
        height: '300',
        width: '100%'
    },
    card: {
        position: 'relative'  
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '60%',
        width: '100%',
        display: 'block',
        color: '#FFF',
        background: 'rgba(0, 0, 0, 0.5)'

    },
    overlayInfo: {
        marginLeft: 20,
    },
    
  }));


export function SongContainer(props){
    
    const styles = {
        media: {
            height: 300,
            width: '100%'
          }
    }

    const classes=useStyles();
    
    const [song, setSong] = useState(null);
    const [suggestion, setSuggestion] = useState(null);
    const changeSuggestion = (newSong, newSuggestion) => {
        setSuggestion(newSuggestion);
        setSong(newSong)
    }
    
    
   
    const [saved, setSaved] = useState([]);
    const [savedButton, setSavedButton] = useState({})
    const changeSaved = (newSaved) => {
        const key=newSaved.artist.concat(' - '.concat(newSaved.title))
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

    const [art, setArt] = useState('')
    useEffect(() => {
        if (song !== null){
            console.log(song)
            albumArt(song.split(" - ")[0], {album: song.split(" - ")[1], size:'large'} , ( error, response ) => {
                if (typeof(response) !== "string"){
                    albumArt(song.split(" - ")[0], {size:'medium'} , ( error, response ) => {
                        if (typeof(response) !== "string"){
                            setArt('https://images.eil.com/large_image/QUEEN_THE%2BGAME-318339.jpg')
                        }
                        else{
                            setArt(response)
                        }
                    })
                }
                else{
                    setArt(response)
                }
                
            })
        }
        return () => setArt('')
    }, [song])

    const [loadingArt, setLoadingArt] = useState(true)
    const onLoadArt = ((loadArt) => {
        setLoadingArt(loadArt);
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
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                        spacing={1}
                    >

                        <Grid item xs={8} style={{ minWidth: '60%'}} >   
                            <Song onChange={changeSuggestion} />
                        </Grid>
                        {!loadingArt && (<Grid item xs={12} style={{ minWidth: '70%'}}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    title=""
                                    image={art}
                                    style={styles.media}
                                />
                                
                                <div className={classes.overlay}>
                                    <div className={classes.overlayInfo}>
                                        <Typography component="h6" style={{paddingBottom: 20, paddingTop: 10}}>
                                            Suggestions based on:
                                        </Typography>
                                        <Typography component="h3" variant="h3">
                                            {song.split(" - ")[1]}
                                        </Typography>
                                        <Typography variant="subtitle1" style={{position: "absolute", bottom: 3}}>
                                            by {song.split(" - ")[0]}
                                        </Typography>
                                    </div>
                                </div>
                            </Card>
                        </Grid>)}
                        <Grid item xs={8} style={{ minWidth: '65%'}}>
                            <SuggestionCard suggestion={suggestion} onChange={changeSaved} onChangeLike={changeLike} likes={likes} savedButton={savedButton} onShowSaved={changeShowSaved} onLoadArt={onLoadArt}/>
                        </Grid>
                        
                    </Grid>
                </div>
            );
            
        }
    
    }
    else{
        if (saved.length == 0){
            return (
                <div>
                    <IconButton onClick={() => setShowSaved(null)}>
                        <ArrowBackIcon />
                    </IconButton>
                    <div className ={classes.root}>
                    <Typography variant="h3" gutterBottom>
                        Nothing to show. Click the Save Icon to save suggestions.
                    </Typography>
                    </div>
                    <div className ={classes.root}>
                        <SaveIcon style={{ fontSize: 100 }} ></SaveIcon>
                    </div>
                </div>
            )
        }
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