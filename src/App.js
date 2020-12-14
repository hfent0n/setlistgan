import React, { useEffect } from 'react';
import './App.css';
import { SongContainer } from './SongContainer'

function App() {

  useEffect(() => {
    document.title="SetlistGan";
  }, []);
  
  return (
    <div className="App">
      <SongContainer />
    </div>
  );
}

export default App;
