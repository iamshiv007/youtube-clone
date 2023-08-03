import React, { Fragment } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Box, Flex } from "@chakra-ui/react";
import SearchVideoList from "../list/SearchVideoList";

const Search = () => {
  return (
    <Fragment>
      <Box bg={"#0f0f0f"}>
        <Header />

        <Flex>
          <Box minWidth={"fit-content"} width="15%">
            <Sidebar />
          </Box>

          <Box>
            <Box width={"95%"} margin={"auto"}>
              <SearchVideoList />
            </Box>
          </Box>
        </Flex>
      </Box>
    </Fragment>
  );
};

export default Search;
