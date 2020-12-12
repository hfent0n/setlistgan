import React from 'react';
import {songOptions} from './data/songOptions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';




export function Song(props) {

  const handleChange = (e) => {
    if (e!==null){
      const keys = Object.keys(e.value);
      const suggestion = keys.map(x => ({artist: x.split(" - ")[0], title: x.split(" - ")[1]}));
      props.onChange(e.label, suggestion);
    }
    
  }

  return (

    <Autocomplete
      id="song-choice"
      options={songOptions}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} label="Song choice" variant="outlined" />}
      onChange={(event, e) => handleChange(e)}
    />
  );
}


