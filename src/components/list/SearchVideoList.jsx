import { Fragment, useContext } from "react";
import { Grid } from "@chakra-ui/react";
import React from "react";
import SearchVideoCard from "../card/SearchVideoCard";
import YoutubeContext from "../../context/YoutubeContext";

const SearchVideoList = () => {
  const {} = useContext(YoutubeContext);

  const viewsConverter = (views) => {
    const abbreviations = ["K", "M", "B", "T"];

    if (views < 1000) return views.toString();

    const exp = Math.floor(Math.log(views) / Math.log(1000));
    const roundedValue = (views / Math.pow(1000, exp)).toFixed(2);

    return `${roundedValue}${abbreviations[exp - 1]}`;
  };
  return (
    <Fragment>
      <Grid gap={5} padding={"30px"}>
        <SearchVideoCard
          duration={"04:35"}
          title={
            "Jelly Roll &amp; Struggle Jennings - Fall In The Fall (Lyrics)"
          }
          thumbnail={"https://i.ytimg.com/vi/LaRDBUv--v4/mqdefault.jpg"}
          avatar={""}
          postTime={viewsConverter("2023-07-29T14:30:10Z")}
          views={""}
          channelName={"Country Sound"}
        />
      </Grid>
    </Fragment>
  );
};

export default SearchVideoList;
