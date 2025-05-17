import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Timeline from './components/Timeline';
import FileExplorer from './components/FileExplorer';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import './App.css';

const ffmpeg = createFFmpeg({ log: true });

const App = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [trimmedVideo, setTrimmedVideo] = useState(null);

  const handleVideoUpload = async (file) => {
    setVideoFile(file);
    setVideoSrc(URL.createObjectURL(file));

    await ffmpeg.load();
    const videoData = await fetchFile(file);
    const { duration } = await ffmpeg.run('-i', videoData);
    setVideoDuration(duration);
  };

  const handleTrim = async (start, end) => {
    if (!videoFile) return;

    const inputFile = videoFile.name;
    const outputFile = 'output.mp4';

    await ffmpeg.run(
      '-i', inputFile,
      '-ss', start.toString(),
      '-to', end.toString(),
      '-c:v', 'libx264', '-c:a', 'aac',
      outputFile
    );

    const outputData = ffmpeg.FS('readFile', outputFile);
    const blob = new Blob([outputData.buffer], { type: 'video/mp4' });
    setTrimmedVideo(URL.createObjectURL(blob));
  };

  return (
    <div className="app-container">
      <div className="file-explorer">
        <FileExplorer onUpload={handleVideoUpload} />
      </div>
      <div className="video-area">
        <VideoPlayer videoSrc={trimmedVideo || videoSrc} />
        <Timeline videoDuration={videoDuration} onTrim={handleTrim} />
      </div>
    </div>
  );
};

export default App;