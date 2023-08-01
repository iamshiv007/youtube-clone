import React, { Fragment } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Box, Flex, Grid } from "@chakra-ui/react";
import VideoCard from "../cards/VideoCard";

const Home = () => {
  return (
    <Fragment>
      <Header />

      <Flex bg={"black"}>
        <Box minWidth={"fit-content"} width="15%">
          <Sidebar />
        </Box>

        <Grid
          gridTemplateColumns={"1fr 1fr 1fr"}
          gap={5}
          padding={"30px"}
          width={"85%"}
        >
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </Grid>
      </Flex>
    </Fragment>
  );
};

export default Home;
