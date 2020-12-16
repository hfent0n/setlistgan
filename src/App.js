import React, { useEffect } from 'react';
import './App.css';
import { SongContainer } from './SongContainer'

function App() {

  useEffect(() => {
    document.title="SetlistGan";
    document.body.style.margin="0px"
    document.body.style.padding="0px"
  }, []);
  
  return (
    <div className="App">
      <SongContainer />
    </div>
  );
}

export default App;
