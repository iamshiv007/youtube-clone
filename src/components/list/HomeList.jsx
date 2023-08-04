import React, { useContext, useEffect, useRef, useState } from "react";
import YoutubeContext from "../../context/YoutubeContext";
import { Grid } from "@chakra-ui/react";
import HomeVideoCard from "../cards/HomeVideoCard";
import axios from "axios";
import HomeSkeleton from "../layout/HomeSkeleton";
import { formatDistanceToNow } from "date-fns";

const VideoList = () => {
  const {
    setHomeVideos,
    setIsLoading,
    isLoading,
    homeVideos,
    getHomeVideos,
    country,
  } = useContext(YoutubeContext);
  const [nextPageToken, setNextPageToken] = useState();

  const nextPageTokenRef = useRef(nextPageToken);

  useEffect(() => {
    nextPageTokenRef.current = nextPageToken; // Update the ref when nextPageToken changes
  }, [nextPageToken]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;

      if (scrollHeight - (scrollTop + windowHeight) <= 500) {
        fetchMoreData(nextPageToken);
      }
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
      const options1 = {
        method: "GET",
        url: "https://youtube138.p.rapidapi.com/home/",
        params: { hl: "hi", gl: "IN", cursor: nextPageTokenRef.current },
        headers: {
          "X-RapidAPI-Key":
            "46e102466emsh069eb8e1a1f88bep148650jsn161589bc0004",
          "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
        },
      };

      const res = await axios.request(options1);

      const newNextPageToken = res.data.cursorNext;

      const options2 = {
        method: "GET",
        url: "https://youtube138.p.rapidapi.com/home/",
        params: { hl: "hi", gl: "IN", cursor: newNextPageToken },
        headers: {
          "X-RapidAPI-Key":
            "46e102466emsh069eb8e1a1f88bep148650jsn161589bc0004",
          "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
        },
      };
      const res2 = await axios.request(options2);
      setHomeVideos((prevHomeVideos) => [
        ...prevHomeVideos,
        ...res2.data.contents,
      ]);
      setIsLoading(false);

      setNextPageToken(() => newNextPageToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHomeVideos();
  }, [country]);

  return (
    <>
      <Grid
        gridTemplateColumns={"1fr 1fr 1fr"}
        gap={5}
        width="100%"
        padding={"30px"}
      >
        {homeVideos &&
          homeVideos.map((video) => {
            return (
              <HomeVideoCard
                key={video.video?.videoId || video.id?.videoId}
                videoId={video.video?.videoId || video.id?.videoId}
                title={
                  video.video?.title
                    ? formateTitle(video.video?.title)
                    : "" || formateTitle(video.snippet?.title) || ""
                }
                thumbnail={
                  video?.video?.thumbnails[0].url ||
                  video.snippet?.thumbnails.high.url ||
                  video.snippet?.thumbnails.medium.url ||
                  ""
                }
                avatar={video.video?.author?.avatar[0]?.url || ""}
                postTime={
                  video.video?.publishedTimeText || video.snippet?.publishedAt
                    ? timeConverter(video.snippet?.publishedAt)
                    : ""
                }
                views={
                  video.video?.stats.views
                    ? viewsConverter(
                        video.video?.stats?.views || video.video?.stats?.viewers
                      )
                    : "" || ""
                }
                channelName={
                  video.video?.author?.title ||
                  video.snippet?.channelTitle ||
                  ""
                }
              />
            );
          })}
        <HomeSkeleton />
        <HomeSkeleton />
        <HomeSkeleton />
        <HomeSkeleton />
        <HomeSkeleton />
        <HomeSkeleton />
        {isLoading ? (
          <>
            <HomeSkeleton />
            <HomeSkeleton />
            <HomeSkeleton />
            <HomeSkeleton />
            <HomeSkeleton />
            <HomeSkeleton />
            <HomeSkeleton />
            <HomeSkeleton />
          </>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
};

export default VideoList;

// Video Title
const formateTitle = (title) => {
  const char = title.split("");

  if (char.length < 60) {
    return title;
  }

  return `${char.slice(0, 60).join("")}...`;
};

// Views
const viewsConverter = (views) => {
  const abbreviations = ["K", "M", "B", "T"];

  if (views < 1000) return views.toString();

  const exp = Math.floor(Math.log(views) / Math.log(1000));
  const roundedValue = (views / Math.pow(1000, exp)).toFixed(2);

  return `${roundedValue}${abbreviations[exp - 1]}`;
};

// Video Uploaded
const timeConverter = (time) => {
  const date = new Date(time);
  return formatDistanceToNow(date, { addSuffix: true });
};
