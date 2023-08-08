import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";

import { sidebarData } from "../constants/Constants";

const Sidebar = () => (
  <>
    <Flex
      width={"fit-content"}
      padding={"20px"}
      direction={"column"}
      height={"90vh"}
      gap={2}
      position={"relative"}
      left={0}
    >
      {sidebarData.map((data) => (
        <NavLink
          key={data.name}
          to={data.name === "Trending" ? "/" : `/?query=${data.name}`}
        >
          <Box
            color="white"
            display="flex"
            gap={4}
            borderRadius="5px"
            padding="5px"
            alignItems="center"
            zIndex={10}
            _hover={{ background: "#3a3a3a" }}
          >
            {" "}
            <Text fontSize="2xl">{data.icon} </Text> <Text>{data.name}</Text>
          </Box>
        </NavLink>
      ))}
    </Flex>
  </>
);

export default Sidebar;
