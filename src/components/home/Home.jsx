import React, { Fragment, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Box, Flex } from "@chakra-ui/react";
import VideoList from "../list/VideoList";

const Home = () => {
  return (
    <Fragment>
      <Header />

      <Flex bg={"black"}>
        <Box minWidth={"fit-content"} width="15%">
          <Sidebar />
        </Box>

        <Box width={"75%"} margin={"auto"}>
          <VideoList />
        </Box>
      </Flex>
    </Fragment>
  );
};

export default Home;
