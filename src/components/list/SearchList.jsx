import { Fragment, useContext, useEffect, useState } from "react";
import { Grid, Text } from "@chakra-ui/react";
import React from "react";
import SearchVideoCard from "../cards/SearchVideoCard";
import YoutubeContext from "../../context/YoutubeContext";
import { useLocation } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import SearchSkeleton from "../layout/SearchSkeleton";

const SearchVideoList = () => {
  const { getSearchVideos, searchVideos, isLoading } =
    useContext(YoutubeContext);

  // Video Uploaded Time
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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Access query parameters
  const query = queryParams.get("query");

  useEffect(() => {
    getSearchVideos(query);
  }, [query]);

  return (
    <Fragment>
      <Grid gap={5} padding={"30px"}>
        {searchVideos &&
          searchVideos.map((video) => {
            return isLoading ? (
              <>
                <SearchSkeleton />
                <SearchSkeleton />
                <SearchSkeleton />{" "}
              </>
            ) : (
              <SearchVideoCard
                videoId={video.id.videoId}
                key={video.id.videoId}
                duration={"04:35"}
                title={convertHtmlEntities(video.snippet.title)}
                thumbnail={video.snippet.thumbnails.high.url}
                avatar={""}
                postTime={timeConverter(video.snippet.publishedAt)}
                views={""}
                channelName={video.snippet.channelTitle}
              />
            );
          })}
      </Grid>
    </Fragment>
  );
};

export default SearchVideoList;
