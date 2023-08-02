import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const VideoCard = ({
  thumbnail,
  title,
  avatar,
  postTime,
  views,
  channelName,
}) => {
  return (
    <>
      <NavLink to="/">
        <Box>
          <Box
            borderRadius={"8px"}
            position={"relative"}
            backgroundRepeat={"no-repeat"}
            height={"160px"}
            backgroundImage={thumbnail}
            backgroundSize={"cover"}
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
              0:06:23
            </Text>
          </Box>

          <Flex marginTop={"10px"} gap={3}>
            <Image
              height={"35px"}
              borderRadius={"100%"}
              src={avatar}
              alt="channel"
            />

            <Box color={"white"}>
              <Text fontWeight={"bold"}>{title}</Text>
              <Text marginTop={"5px"} fontSize={"xs"}>
                {channelName}
              </Text>
              <Text fontSize={"xs"} display={"inline"}>
                {views} views
              </Text>{" "}
              <Text display={"inline"} fontSize={"xs"}>
                {postTime}
              </Text>
            </Box>
          </Flex>
        </Box>
      </NavLink>
    </>
  );
};

export default VideoCard;
