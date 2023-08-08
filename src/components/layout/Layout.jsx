import React from "react";
import { Box, Flex } from "@chakra-ui/react";

import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => (
  <>
    <Box bg={"#0f0f0f"}>
      <Header />

      <Flex>
        <Box
          display={{ base: "none", sm: "none", md: "block" }}
          flexShrink={0}
          width={"280px"}
        >
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

export default Layout;
