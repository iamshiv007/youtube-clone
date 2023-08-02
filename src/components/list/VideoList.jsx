import React, { useContext } from "react";
import YoutubeContext from "../../context/YoutubeContext";
import { Grid } from "@chakra-ui/react";
import VideoCard from "../card/VideoCard";
import { format, intervalToDuration } from "date-fns";

const VideoList = () => {
  const { homeVideos } = useContext(YoutubeContext);

  // views
  const viewsConverter = (views) => {
    const abbreviations = ["K", "M", "B", "T"];

    if (views < 1000) return views.toString();

    const exp = Math.floor(Math.log(views) / Math.log(1000));
    const roundedValue = (views / Math.pow(1000, exp)).toFixed(2);

    return `${roundedValue}${abbreviations[exp - 1]}`;
  };

  // Video Title
  const formateTitle = (title) => {
    const char = title.split("");

    if (char.length < 60) {
      return title;
    }

    return `${char.slice(0, 60).join("")}...`;
  };

  // Duration
  const durationConverter = (Oldseconds) => {
    const duration = intervalToDuration({ start: 0, end: Oldseconds * 1000 });
    const hours = duration.hours.toString().padStart(2, "0");
    const minutes = duration.minutes.toString().padStart(2, "0");
    const seconds = duration.seconds.toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <Grid gridTemplateColumns={"1fr 1fr 1fr"} gap={5} padding={"30px"}>
        {homeVideos &&
          homeVideos.map((video, key) => {
            return (
              <VideoCard
                key={key}
                title={formateTitle(video.video.title)}
                thumbnail={video?.video.thumbnails[0].url}
                avatar={video.video.author?.avatar[0]?.url || ""}
                postTime={video.video.publishedTimeText}
                views={viewsConverter(
                  video.video.stats.views || video.video.stats.viewers
                )}
                channelName={video.video.author.title}
                duration={durationConverter(video.video.lengthSeconds)}
              />
            );
          })}
      </Grid>
    </>
  );
};

export default VideoList;
