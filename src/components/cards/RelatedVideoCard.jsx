import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const RelatedVideoCard = ({
  videoId,
  title,
  thumbnail,
  duration,
  views,
  postTime,
  channelName,
  channelId,
}) => (
  <>
    <NavLink to={`/video/${videoId}/${channelId}?category="Trending`}>
      <Flex alignItems={"center"} width={"100%"} gap={5}>
        <Box
          backgroundColor="#2e2c2c"
          borderRadius={"8px"}
          position={"relative"}
          overflow={"hidden"}
          width={"140px"}
          height={"70px"}
        >
          <Image
            src={thumbnail}
            alt="thumbnail"
            objectFit={"cover"}
            width={"100%"}
          />
          <Text
            right={3}
            bottom={3}
            color={"white"}
            background={"black"}
            fontSize={"xs"}
            padding={"3px 8px"}
            borderRadius={"5px"}
            position={"absolute"}
          >
            {duration || "0:00"}
          </Text>
        </Box>

        <Box width="70%">
          <Text fontSize={"16px"} color={"white"}>
            {title}
          </Text>
          <Text color={"#b7b5b5"} fontSize={"xs"}>
            {views || ""} {postTime || "1 day ago"}
          </Text>

          <Flex gap={3} alignItems={"center"}>
            <Text color={"#b7b5b5"} fontSize={"sm"}>
              {channelName}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </NavLink>
  </>
);

export default RelatedVideoCard;
