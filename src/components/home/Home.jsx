import React, { Fragment } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Box, Flex, Image } from "@chakra-ui/react";

const Home = () => {
  return (
    <Fragment>
      <Header />

      <Flex bg={"black"}>
        <Box minWidth={"fit-content"} width="15%">
          <Sidebar />
        </Box>

        <Box width={"85%"}>Hello</Box>
      </Flex>
    </Fragment>
  );
};

export default Home;
