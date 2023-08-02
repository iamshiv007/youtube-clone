import React, { useContext, useEffect } from "react";
import YoutubeContext from "../../context/YoutubeContext";
import { Grid } from "@chakra-ui/react";
import VideoCard from "../card/VideoCard";
import { formatDistanceToNow } from "date-fns";
import numeral from "numeral";

const TrendingList = () => {
  const { trendingVideos, getTrendingVideos } = useContext(YoutubeContext);

  // Views
  const viewsConverter = (views) => {
    const formattedViews = numeral(views).format("0.[00]a");

    return formattedViews;
  };

  // Video Duration
  const durationConverter = (duration) => {
    const matches = duration.match(/PT(\d+)M(\d+)S/);
    if (!matches) return "";

    const minutes = parseInt(matches[1]);
    const seconds = parseInt(matches[2]);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Video Uploaded
  const timeConverter = (time) => {
    const date = new Date(time);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  // Video Title
  const formateTitle = (title) => {
    const words = title.split(" ");

    if (words.length < 10) {
      return title;
    }

    return `${words.slice(0, 10).join(" ")}...`;
  };

  useEffect(() => {
    getTrendingVideos();
  }, []);

  return (
    <>
      <Grid gridTemplateColumns={"1fr 1fr 1fr"} gap={5} padding={"30px"}>
        {trendingVideos &&
          trendingVideos.map((video, key) => {
            return (
              <VideoCard
                duration={durationConverter(video.contentDetails.duration)}
                key={key}
                title={formateTitle(video.snippet.title)}
                thumbnail={video?.snippet.thumbnails.maxres.url}
                avatar={""}
                postTime={timeConverter(video.snippet.publishedAt)}
                views={viewsConverter(video.statistics.viewCount)}
                channelName={video.snippet.channelTitle}
              />
            );
          })}
      </Grid>
    </>
  );
};

export default TrendingList;
