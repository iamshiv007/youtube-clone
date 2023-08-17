import React, { useContext, useEffect } from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import numeral from "numeral";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

import YoutubeContext from "../../context/YoutubeContext";
import SearchSkeleton from "../layout/SearchSkeleton";
import { errorHandling } from "../../utils/utils";
import SearchVideoCard from "../cards/SearchVideoCard";
import HomeSkeleton from "../layout/HomeSkeleton";
import HomeVideoCard from "../cards/HomeVideoCard";

const TrendingList = () => {
  const {
    trendingVideos,
    country,
    getTrendingVideos,
    isLoading,
    setIsLoading,
    setTrendingVideos,
    trendingVideosLength,
    nextPageToken,
    setNextPageToken,
  } = useContext(YoutubeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTrendingVideos();
  }, [country]);

  const fetchMoreData = async () => {
    try {
      setIsLoading(true);

      console.log(nextPageToken);
      const res2 = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${country}&key=${process.env.REACT_APP_YOUTUBE_API_KEY_GOOGLE2}&maxResults=15&pageToken=${nextPageToken}`
      );
      setTrendingVideos((prevTrendingVideos) => [
        ...prevTrendingVideos,
        ...res2.data.items,
      ]);
      setIsLoading(false);

      setNextPageToken(res2.data.nextPageToken);
    } catch (error) {
      try {
        setIsLoading(true);
       
        const res2 = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${country}&key=${process.env.REACT_APP_YOUTUBE_API_KEY_GOOGLE1}&maxResults=15&pageToken=${nextPageToken}`
        );
        setTrendingVideos((prevTrendingVideos) => [
          ...prevTrendingVideos,
          ...res2.data.items,
        ]);
        setIsLoading(false);

        setNextPageToken(res2.data.nextPageToken);
      } catch (error) {
        errorHandling(error);
      }
    }
  };

  return (
    <>
      <Box display={{ base: "none", sm: "none", md: "block" }}>
        <InfiniteScroll
          dataLength={trendingVideos.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={
            trendingVideosLength > trendingVideos.length + 1 ? true : false
          }
          loader={
            isLoading ? (
              <Grid gap={5} padding={"30px"}>
                <>
                  <SearchSkeleton />
                  <SearchSkeleton />
                  <SearchSkeleton />
                </>
              </Grid>
            ) : (
              ""
            )
          }
          endMessage={
            <Text color={"white"} textAlign={"center"} padding={"20px"}>
              <b>👍 Yay! You have seen it all</b>
            </Text>
          }
        >
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
              {trendingVideosLength > trendingVideos.length + 1 ? (
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
        </InfiniteScroll>
      </Box>
      <Box display={{ base: "block", sm: "block", md: "none" }}>
        <InfiniteScroll
          dataLength={trendingVideos.length} //This is important field to render the next data
          // next={fetchMoreData}
          hasMore={
            trendingVideosLength > trendingVideos.length + 1 ? true : false
          }
          loader={
            isLoading ? (
              <Grid gap={5}>
                <>
                  <HomeSkeleton />
                  <HomeSkeleton />
                  <HomeSkeleton />
                </>
              </Grid>
            ) : (
              ""
            )
          }
          endMessage={
            <Text color={"white"} textAlign={"center"} padding={"20px"}>
              <b>👍 Yay! You have seen it all</b>
            </Text>
          }
        >
          <>
            <Grid gap={5} paddingTop={"5px"}>
              {trendingVideos &&
                trendingVideos.map((video) => (
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
                    avatar={""}
                    postTime={timeConverter(video.snippet.publishedAt)}
                    views={viewsConverter(video.statistics.viewCount)}
                    channelName={video.snippet.channelTitle}
                  />
                ))}
              {trendingVideosLength > trendingVideos.length + 1 ? (
                <>
                  <HomeSkeleton />
                  <HomeSkeleton />
                  <HomeSkeleton />
                </>
              ) : (
                ""
              )}
            </Grid>
          </>
        </InfiniteScroll>
      </Box>
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
