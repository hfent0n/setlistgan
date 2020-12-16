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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import background from './img/background.jpg';
import CircularProgress from '@material-ui/core/CircularProgress';
import logo from './img/Logo.png'
import Box from '@material-ui/core/Box';

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
    background: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height:'100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        
    },
    backgroundSaved: {
        width: '100%',
        height:'100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        
    },
    backgroundSuggestion: {
        width: '100%',
        height:'100%',
        
    },
    logo: { 
        height: '120px',
        width: '600px',
        
        
    }
    
  }));


export function SongContainer(props){
    
    const styles = {
        media: {
            height: 300,
            width: '100%'
          },
          logo: {
            height: '120px',
            width: '600px',
            
          }

    }

    const classes=useStyles();
    
    const [song, setSong] = useState(null);
    const [suggestion, setSuggestion] = useState(null);
    const changeSuggestion = (newSong, newSuggestion) => {
        setSuggestion(newSuggestion);
        setSong(newSong)
    }
    
    
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
    
    const [saved, setSaved] = useState([]);
    const [savedButton, setSavedButton] = useState({});
    const [snackbar, setSnackbar] = useState(false);
    const changeSaved = (newSaved) => {
        const key=newSaved.artist.concat(' - '.concat(newSaved.title))
        if (saved.includes(newSaved)){
            setSaved((prev) => {
                return prev.filter((item => item !== newSaved));
            });

            setSavedButton((prev) => (
                {
                    ...prev,
                    [key]: 'null'
                }
            ));

        }
        else{
            setSaved((prev) => (
                [...prev, newSaved]
            ));
            

            setSavedButton((prev) => (
                {
                    ...prev,
                    [key]: 'save'
                }
            ));

            setSnackbar(true);
        }
        
    
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway'){
            return;
        }

        setSnackbar(false);
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

    const [loadingSong, setLoadingSong] = useState(false);
    const onLoadingSong = ((newLoadingSong) => {
        setLoadingSong(newLoadingSong);
    })
    if (showSaved !== 'saved'){
        if (suggestion==null){
            return (
                <div className={classes.background} style={{background: "linear-gradient(rgba(255,23,68, 0.2), rgba(255,23,68,0.2)), " + "url(" +  background + ")"}}>
                    
                            
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'15vh'}}>   
                        <CardMedia
                                    className={classes.logo}
                                    image={logo}
                                    title=""
                                    style={styles.logo}
                        />
                    </div>              
            
                    <Grid 
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-end"
                        style={{ minHeight: '10vh', marginTop:'30px' }}
                    >   
                        
                        <Grid item xs={6}>   
                            <Song onChange={changeSuggestion} onLoadingSong={onLoadingSong}/>
                        </Grid>
                        {loadingSong && (
                            <Grid item xs={6}> 
                                <CircularProgress></CircularProgress>
                            </Grid>
                        )}
                    </Grid>
                    <Grid 
                        container
                        justify="center"
                        alignItems="center"
                        style={{marginTop:'30px' }}
                        
                    >
                        <Grid item xs={5} >   
                            <Typography variant="h4" component="h4" style={{ textAlign: 'center'}}>
                                Pick a <Box display="inline" style={{color: 'rgb(248, 131, 26, 1)'}}> track </Box> and we'll suggest another song to help you make your perfect <Box display="inline"  style={{color: 'rgb(63, 229, 229)'}}>set list </Box>!
                            </Typography>
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
                        className={classes.backgroundSuggestion} style={{background: "linear-gradient(rgba(255,23,68, 0.2), rgba(255,23,68,0.2)), " + "url(" +  background + ")"}}
                    >
                        
                        <Grid item xs={8} style={{ minWidth: '60%'}} >   
                            <Song onChange={changeSuggestion} onLoadingSong={onLoadingSong}/>
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
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item xs={8} style={{ minWidth: '65%'}}>
                            <SuggestionCard suggestion={suggestion} onChange={changeSaved} onChangeLike={changeLike} likes={likes} savedButton={savedButton} onShowSaved={changeShowSaved} onLoadArt={onLoadArt}/>
                        </Grid>
                        <Snackbar open={snackbar} autoHideDuration={2000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                            <Alert onClose={handleCloseSnackbar} severity="success">
                                Saved!
                            </Alert>
                        </Snackbar>
                    </Grid>
                
                </div>
            );
            
        }
    
    }
    else{
        if (saved.length === 0){
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
          
        else{
            return (
                <div className={classes.backgroundSaved} style={{background: "linear-gradient(rgba(255,23,68, 0.2), rgba(255,23,68,0.2)), " + "url(" +  background + ")", position: 'static', top: '0', left: '0', height: '100vh', width: '100vw',}} >
                    
                    <IconButton onClick={() => setShowSaved(null)}>
                        <ArrowBackIcon />
                    </IconButton>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{ width: '75%'}}>
                            <SuggestionCard suggestion={saved} onChange={changeSaved} onChangeLike={changeLike} likes={likes} savedButton={savedButton} onShowSaved={changeShowSaved} onLoadArt={onLoadArt}/>
                        </div>
                    </div>
                </div>
            )
        }
        
        
    }
}