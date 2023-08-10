import React, { useContext, useEffect } from "react";
import { Grid, Box } from "@chakra-ui/react";
import numeral from "numeral";
import { formatDistanceToNow } from "date-fns";

import RelatedVideoCard from "../cards/RelatedVideoCard";
import HomeVideoCard from "../cards/HomeVideoCard";
import YoutubeContext from "../../context/YoutubeContext";

const RelatedList = ({ videoId }) => {
  const { trendingVideos, country, getTrendingVideos } =
    useContext(YoutubeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTrendingVideos();
  }, [country]);

  return (
    <>
      <Box display={{ base: "none", sm: "none", md: "block" }}>
        <Grid gap={5} padding={{ base: "8px", md: "0px" }}>
          {trendingVideos &&
            trendingVideos
              .filter((video) => video.id !== videoId)
              .map((video) => (
                <RelatedVideoCard
                  videoId={video.id}
                  channelId={video?.snippet?.channelId}
                  duration={
                    video.contentDetails?.duration
                      ? durationConverter(video.contentDetails?.duration)
                      : ""
                  }
                  key={video.id}
                  title={
                    video.snippet?.title
                      ? formateTitle(convertHtmlEntities(video.snippet.title))
                      : ""
                  }
                  thumbnail={
                    video?.snippet.thumbnails?.maxres?.url ||
                    video?.snippet.thumbnails?.standard?.url ||
                    ""
                  }
                  postTime={timeConverter(video.snippet.publishedAt)}
                  views={viewsConverter(video.statistics.viewCount)}
                  channelName={video.snippet.channelTitle}
                />
              ))}
        </Grid>
      </Box>
      <Box display={{ base: "block", sm: "block", md: "none" }}>
        <Grid gap={5} padding={{ base: "8px", md: "0px" }}>
          {trendingVideos &&
            trendingVideos
              .filter((video) => video.id !== videoId)
              .map((video) => (
                <HomeVideoCard
                  videoId={video.id}
                  channelId={video?.snippet?.channelId}
                  duration={
                    video.contentDetails?.duration
                      ? durationConverter(video.contentDetails?.duration)
                      : ""
                  }
                  key={video.id}
                  title={
                    video.snippet?.title
                      ? formateTitle(convertHtmlEntities(video.snippet.title))
                      : ""
                  }
                  thumbnail={
                    video?.snippet.thumbnails?.maxres?.url ||
                    video?.snippet.thumbnails?.standard?.url ||
                    ""
                  }
                  postTime={timeConverter(video.snippet.publishedAt)}
                  views={viewsConverter(video.statistics.viewCount)}
                  channelName={video.snippet.channelTitle}
                />
              ))}
        </Grid>
      </Box>
    </>
  );
};

export default RelatedList;

// Views
const viewsConverter = (views) => {
  const formattedViews = numeral(views).format("0.[00]a");

  return formattedViews;
};

// Convert HTML entities in title
function convertHtmlEntities(inputString) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = inputString;
  return textarea.value;
}

// Video Duration
const durationConverter = (duration) => {
  const matches = duration.match(/PT(?:(\d+)M)?(\d+)S/);
  if (!matches) return "";

  const minutes = parseInt(matches[1]) || 0;
  const seconds = parseInt(matches[2]) || 0;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

// Video Uploaded
const timeConverter = (time) => {
  const date = new Date(time);
  return formatDistanceToNow(date, { addSuffix: true });
};

// Video Title
const formateTitle = (title) => {
  const char = title.split("");

  if (char.length < 60) {
    return title;
  }

  return `${char.slice(0, 60).join("")}...`;
};
