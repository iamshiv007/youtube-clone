import React, { useContext } from "react";
import YoutubeContext from "../../context/YoutubeContext";
import { Grid } from "@chakra-ui/react";
import VideoCard from "../card/VideoCard";

const VideoList = () => {
  const { homeVideos } = useContext(YoutubeContext);

  const viewsConverter = (views) => {
    const abbreviations = ["K", "M", "B", "T"];

    if (views < 1000) return views.toString();

    const exp = Math.floor(Math.log(views) / Math.log(1000));
    const roundedValue = (views / Math.pow(1000, exp)).toFixed(2);

    return `${roundedValue}${abbreviations[exp - 1]}`;
  };

  return (
    <>
      <Grid gridTemplateColumns={"1fr 1fr 1fr"} gap={5} padding={"30px"}>
        {homeVideos &&
          homeVideos.map((video) => {
            return (
              <VideoCard
                title={video.video.title}
                thumbnail={video?.video.thumbnails[0].url}
                avatar={video.video.author.avatar[0].url}
                postTime={video.video.publishedTimeText}
                views={viewsConverter(video.video.stats.views)}
                channelName={video.video.author.title}
              />
            );
          })}
      </Grid>
    </>
  );
};

export default VideoList;
