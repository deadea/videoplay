
import React, { useRef, useState } from 'react'
import './App.css'
import VideoInput from '../VideoInput/videoInput';
import List from '../list/list';

import { createWorker } from 'tesseract.js';

const App = () => {
  const [source, setSource] = useState();
  const [text, setText] = useState([])

  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const imgdata = useRef([])
  const textdata = useRef([])
  const width = 1680
  const height = 1050
  const fps = 60
  let canvasInterval = null;

  const drawImage = () => {
    canvasRef.current.getContext('2d', { alpha: false }).drawImage(videoRef.current, 0, 0, width, height);
  }
  const getFrame = () => {
    canvasRef.current.toBlob((blob) => imgdata.current.push(blob))
  }
  const parseBlobs = async () => {
    for (let item of imgdata.current) {
      await getText(item)
    }
    setText(textdata.current)
  }
  const getText = async (img) => {
    const worker = await createWorker('rus');
    const rectangle = { left: 1143, top: 100, width: 435, height: 50 };
    (async () => {
      const { data: { text } } = await worker.recognize(img, { rectangle });
      textdata.current.push(text)
      await worker.terminate();
    })();
  }
 
  const handleSource = (url) => {
    setSource(url);
  }
  const handlePlay = () => {
    clearInterval(canvasInterval);
    canvasInterval = setInterval(() => {
      drawImage()
      getFrame()
    }, 300);
  }
  const handlePause = () => {
    clearInterval(canvasInterval);
  }
  const handleEnd = () => {
    clearInterval(canvasInterval);
    parseBlobs()
  }

  return (
    <>
    <VideoInput ref={videoRef} width={width} height={height} source={source} handleSource={handleSource} handlePlay={handlePlay} handlePause={handlePause} handleEnd={handleEnd}/>
    <canvas className="hidden" ref={canvasRef} width={width} height={height}></canvas>
    {!!textdata.current.length && <List list={text}/>}
    </>
  )
}

export default App;
