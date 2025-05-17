
import React, { useRef } from 'react';

const VideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);

  return (
    <div>
      <video ref={videoRef} src={videoSrc} controls width="100%" />
    </div>
  );
};

export default VideoPlayer;
