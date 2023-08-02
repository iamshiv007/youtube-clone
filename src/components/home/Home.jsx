import React, { Fragment, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Box, Flex } from "@chakra-ui/react";
import VideoList from "../list/VideoList";

const Home = () => {
  return (
    <Fragment>
      <Box height={"100vh"} overflow={"hidden"}>
        <Header />

        <Flex bg={"black"}>
          <Box minWidth={"fit-content"} width="15%">
            <Sidebar />
          </Box>

          <Box overflowY={"scroll"} height={"90vh"}>
            <Box width={"85%"} margin={"auto"}>
              <VideoList />
            </Box>
          </Box>
        </Flex>
      </Box>
    </Fragment>
  );
};

export default Home;
