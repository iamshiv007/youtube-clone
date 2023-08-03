import React, { useContext, useEffect, useRef, useState } from "react";
import YoutubeContext from "../../context/YoutubeContext";
import { Grid } from "@chakra-ui/react";
import VideoCard from "../cards/HomeVideoCard";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

const VideoList = () => {
  const { homeVideos, setHomeVideos, country, language } =
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

  // Home Videos Scrolling
  const fetchMoreData = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCSg8WrqSPJ475M6NEebNrztvnEgSfosgc&part=snippet&maxResults=5&regionCode=${country}&relevanceLanguage=${language}&type=video&pageToken=${nextPageTokenRef.current}`
      );

      const newNextPageToken = res.data.nextPageToken;

      const res2 = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCSg8WrqSPJ475M6NEebNrztvnEgSfosgc&part=snippet&maxResults=5&regionCode=${country}&relevanceLanguage=${language}&type=video&pageToken=${newNextPageToken}`
      );
      setHomeVideos((prevHomeVideos) => [
        ...prevHomeVideos,
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
        {homeVideos &&
          homeVideos.map((video, key) => {
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
                  video?.snippet.thumbnails?.high?.url ||
                  video?.snippet.thumbnails?.medium?.url ||
                  ""
                }
                avatar={""}
                postTime={timeConverter(video.snippet.publishedAt)}
                views={""}
                channelName={video.snippet.channelTitle}
              />
            );
          })}
      </Grid>
    </>
  );
};

export default VideoList;

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
