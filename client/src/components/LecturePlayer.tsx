import React, { useRef, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Fullscreen, FullscreenExit, PlayArrow, Pause } from "@mui/icons-material";

interface LecturePlayerProps {
  videoUrl: string;
}

const LecturePlayer: React.FC<LecturePlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().then(() => setIsFullscreen(true));
      } else {
        document.exitFullscreen().then(() => setIsFullscreen(false));
      }
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "800px",
        mx: "auto",
        mt: 4,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        width="100%"
        style={{ borderRadius: "12px", backgroundColor: "black" }}
      />

      {/* Controls */}
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          left: 10,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <IconButton sx={{ color: "white" }} onClick={togglePlayPause}>
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton sx={{ color: "white" }} onClick={toggleFullscreen}>
          {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
      </Box>

      {/* Title Overlay */}
      <Typography
        variant="h6"
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "4px 10px",
          borderRadius: "5px",
        }}
      >
        Lecture Video
      </Typography>
    </Box>
  );
};

export default LecturePlayer;
