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
          <Box flexShrink={0} width={"230px"}>
            <Box
              position={"fixed"}
              top={"10vh"}
              left={"0"}
              minWidth={"fit-content"}
            >
              <Sidebar />
            </Box>
          </Box>

          <Box>
            <Box minHeight={"90vh"} width={"100%"} margin={"auto"}>
              {children}
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Layout;
