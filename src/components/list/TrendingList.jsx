import React, { useContext, useEffect, useRef, useState } from "react";
import { Grid } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import numeral from "numeral";
import axios from "axios";

import YoutubeContext from "../../context/YoutubeContext";
import SearchVideoCard from "../cards/SearchVideoCard";
import SearchSkeleton from "../layout/SearchSkeleton";

const TrendingList = () => {
  const {
    trendingVideos,
    setTrendingVideos,
    country,
    getTrendingVideos,
    setIsLoading,
    isLoading,
  } = useContext(YoutubeContext);
  const [nextPageToken, setNextPageToken] = useState("");

  const nextPageTokenRef = useRef(nextPageToken);

  useEffect(() => {
    nextPageTokenRef.current = nextPageToken; // Update the ref when nextPageToken changes
  }, [nextPageToken]);

  useEffect(() => {
    const handleScroll = () => {
      const {scrollHeight} = document.documentElement;
      const windowHeight = window.innerHeight;
      const {scrollTop} = document.documentElement;

      if (scrollHeight - (scrollTop + windowHeight) <= 500) {
        fetchMoreData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getTrendingVideos();
  }, [country, getTrendingVideos]);

  // Trending videos Scrolling
  const fetchMoreData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${country}&key=AIzaSyCSg8WrqSPJ475M6NEebNrztvnEgSfosgc&maxResults=5&pageToken=${nextPageTokenRef.current}`
      );

      const newNextPageToken = res.data.nextPageToken;

      const res2 = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${country}&key=AIzaSyCSg8WrqSPJ475M6NEebNrztvnEgSfosgc&maxResults=5&pageToken=${newNextPageToken}`
      );
      setTrendingVideos((prevTrendingVideos) => [
        ...prevTrendingVideos,
        ...res2.data.items,
      ]);
      setIsLoading(false);

      setNextPageToken(() => newNextPageToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid gap={5} padding={"30px"}>
        {trendingVideos &&
          trendingVideos.map((video) => (
            <SearchVideoCard
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
              avatar={""}
              postTime={timeConverter(video.snippet.publishedAt)}
              views={viewsConverter(video.statistics.viewCount)}
              channelName={video.snippet.channelTitle}
            />
          ))}

        <SearchSkeleton />
        <SearchSkeleton />
        <SearchSkeleton />

        {isLoading ? (
          <>
            <SearchSkeleton />
            <SearchSkeleton />
            <SearchSkeleton />
          </>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
};

export default TrendingList;

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

  if (char.length < 100) {
    return title;
  }

  return `${char.slice(0, 100).join("")}...`;
};
