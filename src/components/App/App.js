
import React, { useState } from 'react'
import './App.css'
import VideoInput from '../VideoInput/videoInput';

const App = () => {
  const [source, setSource] = useState();

  const handleSource = (url) => {
    setSource(url);
  }
  return (
    <VideoInput height={300} source={source} handleSource={handleSource}/>
  )
}

export default App;
