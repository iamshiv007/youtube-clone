import React from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

const Video = () => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1, // Auto-play the video
    },
  };


  const { videoId} = useParams()

  return (
    <>
      <YouTube videoId={videoId} opts={opts} />
    </>
  );
};

export default Video;
