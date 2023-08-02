import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiTwotoneFire } from "react-icons/ai";
import { MdSportsBaseball, MdSportsEsports } from "react-icons/md";
import { BiCameraMovie, BiSolidBookReader } from "react-icons/bi";
import { FaRegLaughSquint } from "react-icons/fa";
import { GiLoveSong } from "react-icons/gi";
import { DiReact } from "react-icons/di";
import { RiJavascriptFill } from "react-icons/ri";
import { Box, Flex, Text } from "@chakra-ui/react";

const sidebarData = [
  { name: "Home", icon: <AiFillHome /> },
  { name: "Trending", icon: <AiTwotoneFire /> },
  { name: "JavaScript", icon: <RiJavascriptFill /> },
  { name: "React", icon: <DiReact /> },
  { name: "Comedy", icon: <FaRegLaughSquint /> },
  { name: "Songs", icon: <GiLoveSong /> },
  { name: "Learning", icon: <BiSolidBookReader /> },
  { name: "Sports", icon: <MdSportsBaseball /> },
  { name: "movies", icon: <BiCameraMovie /> },
  { name: "Gaming", icon: <MdSportsEsports /> },
];

const Sidebar = () => {
  return (
    <>
      <Flex
        width={"fit-content"}
        padding={"30px"}
        direction={"column"}
        height={"90vh"}
        bg={"black"}
        gap={1}
        position={"relative"}
        left={0}
      >
        {sidebarData.map((data) => (
          <NavLink
            key={data.name}
            to={data.name === "Home" ? "/" : `/category/${data.name}`}
          >
            <Box
              color="white"
              display="flex"
              gap={6}
              borderRadius="5px"
              padding="5px 15px"
              alignItems="center"
              zIndex={10}
              _hover={{ background: "gray" }}
            >
              {" "}
              <Text fontSize="xl">{data.icon} </Text>{" "}
              <Text fontSize={"lg"}> {data.name}</Text>
            </Box>
          </NavLink>
        ))}
      </Flex>
    </>
  );
};

export default Sidebar;
