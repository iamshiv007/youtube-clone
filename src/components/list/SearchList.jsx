import React, { Fragment, useContext, useEffect } from "react";
import { Grid } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

import YoutubeContext from "../../context/YoutubeContext";
import HomeVideoCard from "../cards/HomeVideoCard";
import HomeSkeleton from "../layout/HomeSkeleton";

const SearchVideoList = () => {
  const { getSearchVideos, searchVideos, isLoading, country } =
    useContext(YoutubeContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Access query parameters
  const query = queryParams.get("query");

  useEffect(() => {
    window.scrollTo(0, 0);
    getSearchVideos(query);
  }, [query, country]);

  return (
    <Fragment>
      <Grid
        gridTemplateColumns={{
          base: "1fr",
          sm: "1fr",
          md: "1fr 1fr",
          lg: "1fr 1fr 1fr",
        }}
        gap={5}
        width="100%"
        padding={{ base: "0px", sm: "0px", md: "30px" }}
        paddingTop={"5px"}
      >
        {isLoading ? (
          <>
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
        {searchVideos &&
          searchVideos.map((video) => (
            <HomeVideoCard
              key={video.id.videoId}
              videoId={video.id.videoId}
              channelId={video?.snippet?.channelId}
              duration={"04:35"}
              title={formateTitle(convertHtmlEntities(video.snippet.title))}
              thumbnail={video.snippet.thumbnails.high.url}
              avatar={""}
              postTime={timeConverter(video.snippet.publishedAt)}
              views={""}
              channelName={video.snippet.channelTitle}
            />
          ))}
        <>
          <HomeSkeleton />
          <HomeSkeleton />
          <HomeSkeleton />
          <HomeSkeleton />
          <HomeSkeleton />
          <HomeSkeleton />
        </>
      </Grid>
    </Fragment>
  );
};

export default SearchVideoList;

// Video Uploaded Time,
const timeConverter = (time) => {
  const date = new Date(time);
  return formatDistanceToNow(date, { addSuffix: true });
};

// Convert HTML entities in title
function convertHtmlEntities(inputString) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = inputString;
  return textarea.value;
}

// Video Title
const formateTitle = (title) => {
  const char = title.split("");

  if (char.length < 60) {
    return title;
  }

  return `${char.slice(0, 60).join("")}...`;
};
