import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box, Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <>
      <Box bg={"#0f0f0f"}>
        <Header />

        <Flex>
          <Box minWidth={"fit-content"} width="15%">
            <Sidebar />
          </Box>

          <Box>
            <Box width={"95%"} margin={"auto"}>
              {children}
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Layout;
