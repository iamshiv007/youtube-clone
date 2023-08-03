import React, { useContext, useEffect, useRef, useState } from "react";
import YoutubeContext from "../../context/YoutubeContext";
import { Grid } from "@chakra-ui/react";
import VideoCard from "../cards/HomeVideoCard";
import { formatDistanceToNow } from "date-fns";
import numeral from "numeral";
import axios from "axios";

const TrendingList = () => {
  const { trendingVideos, setTrendingVideos, country } =
    useContext(YoutubeContext);
  const [nextPageToken, setNextPageToken] = useState("");

  const nextPageTokenRef = useRef(nextPageToken);

  useEffect(() => {
    nextPageTokenRef.current = nextPageToken; // Update the ref when nextPageToken changes
  }, [nextPageToken]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }
      fetchMoreData(nextPageToken);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  // Trending videos Scrolling
  const fetchMoreData = async () => {
    try {
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

      setNextPageToken(() => newNextPageToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid gridTemplateColumns={"1fr 1fr 1fr"} gap={5} padding={"30px"}>
        {trendingVideos &&
          trendingVideos.map((video, key) => {
            return (
              <VideoCard
                duration={
                  video.contentDetails?.duration
                    ? durationConverter(video.contentDetails?.duration)
                    : ""
                }
                key={key}
                title={
                  video.snippet?.title ? formateTitle(video.snippet.title) : ""
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
            );
          })}
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
  const char = title.split("");

  if (char.length < 60) {
    return title;
  }

  return `${char.slice(0, 60).join("")}...`;
};
