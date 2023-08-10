import React from "react";
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const HomeVideoCard = ({
  videoId,
  thumbnail,
  title,
  postTime,
  views,
  duration,
  avatar,
  channelName,
  channelId,
}) => (
  <>
    <NavLink to={`/video/${videoId}/${channelId}`}>
      <Box>
        <Box
          borderRadius={{ base: "0px", sm: "0px", md: "8px" }}
          position={"relative"}
          backgroundRepeat={"no-repeat"}
          height={{ base: "210px", sm: "270px", md: "200px" }}
          backgroundImage={thumbnail}
          backgroundSize={"cover"}
          backgroundColor="#2e2c2c"
          backgroundPosition={"center"}
        >
          <Text
            position={"absolute"}
            right={3}
            bottom={3}
            color={"white"}
            background={"black"}
            fontSize={"xs"}
            padding={"3px 8px"}
            borderRadius={"5px"}
          >
            {duration || "0:06:23"}
          </Text>
        </Box>

        <Flex padding={{ base: "10px", sm: "10px", md: "10px 0 0 0" }} gap={3}>
          {avatar ? (
            <Image
              height={"35px"}
              borderRadius={"100%"}
              src={avatar}
              alt="channel"
            />
          ) : (
            <Avatar
              size={"sm"}
              name={channelName}
              src="https://bit.ly/tioluwani-kolawole"
            />
          )}

          <Box color={"white"}>
            <Text fontWeight={"semibold"}>{title}</Text>
            <Box
              marginTop={"5px"}
              gap={3}
              display={{ base: "flex", sm: "flex", md: "block" }}
            >
              <Text color={"#b7b5b5"} fontSize={"xs"}>
                {channelName}
              </Text>
              <Flex margintop="5px" gap={2}>
                <Text color={"#b7b5b5"} fontSize={"xs"}>
                  {views ? `${views} views` : ""}
                </Text>
                <Text color={"#b7b5b5"} fontSize={"xs"}>
                  {postTime || ""}
                </Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </NavLink>
  </>
);

export default HomeVideoCard;
