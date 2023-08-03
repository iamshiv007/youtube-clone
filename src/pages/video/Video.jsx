import React from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import Header from "../../components/layout/Header";
import { Box } from "@chakra-ui/react";

const Video = () => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1, // Auto-play the video
    },
  };

  const { videoId } = useParams();

  return (
    <>
      <Header />
      <Box height={"90vh"} width={"100%"} padding={"30px"} bg="#0f0f0f">
        <YouTube videoId={videoId} opts={opts} />
      </Box>
    </>
  );
};

export default Video;
