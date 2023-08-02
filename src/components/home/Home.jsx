import React, { Fragment } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Box, Flex } from "@chakra-ui/react";
import VideoList from "../list/VideoList";
import { useParams } from "react-router-dom";
import TrendingList from "../list/TrendingList";

const Home = () => {
  const { category } = useParams();

  return (
    <Fragment>
      <Box bg={"#0f0f0f"} height={"100vh"} overflow={"hidden"}>
        <Header />

        <Flex>
          <Box minWidth={"fit-content"} width="15%">
            <Sidebar />
          </Box>

          <Box overflowY={"scroll"} height={"90vh"}>
            <Box width={"95%"} margin={"auto"}>
              {category ? <TrendingList /> : <VideoList />}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Fragment>
  );
};

export default Home;
