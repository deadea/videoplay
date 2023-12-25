import React, { forwardRef} from "react";

const VideoInput = forwardRef(function Videoinput(props, ref) {
  const {width, height, source, handleSource, handlePlay, handlePause, handleEnd} = props
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleSource(url)
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {source && (
          <video
          ref={ref}
          width={width}
          height={height}
          src={source}
          autoPlay={true}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnd}
          className="hidden"
          />
          )}
      
    </div>
  );
})

export default VideoInput;
