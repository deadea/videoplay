import React from "react";

const VideoInput = ({height, source, handleSource}) => {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    handleSource(url)
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
          width="100%"
          height={height}
          controls
          src={source}
          autoPlay={true}
          />
          )}
      
    </div>
  );
}

export default VideoInput;