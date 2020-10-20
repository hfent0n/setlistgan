import React, { useState } from 'react';
import { Song } from './Song';
import { PredictionDisplay } from './PredictionDisplay';

export function SongContainer(props){
    const [prediction, setPrediction] = useState('');

    const changePrediction = (newPrediction) => {
        setPrediction(newPrediction);
    }

    return (
        <div>
            <Song onChange={changePrediction}/>
            <PredictionDisplay prediction={prediction}/>
        </div>
        
        
    );
}