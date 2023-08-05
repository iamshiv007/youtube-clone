import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";

import { sidebarData } from "../constants/Constants";

const Sidebar = () => (
  <>
    <Flex
      width={"fit-content"}
      padding={"30px"}
      direction={"column"}
      height={"90vh"}
      gap={2}
      position={"relative"}
      left={0}
    >
      {sidebarData.map((data) => (
        <NavLink
          key={data.name}
          to={
            data.name === "Home"
              ? "/"
              : data.name === "Trending"
                ? `/?category=${data.name}`
                : `/?query=${data.name}`
          }
        >
          <Box
            color="white"
            display="flex"
            gap={6}
            borderRadius="5px"
            padding="5px 15px"
            alignItems="center"
            zIndex={10}
            _hover={{ background: "#3a3a3a" }}
          >
            {" "}
            <Text fontSize="xl">{data.icon} </Text>{" "}
            <Text fontSize={""}> {data.name}</Text>
          </Box>
        </NavLink>
      ))}
    </Flex>
  </>
);

export default Sidebar;
