import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const SearchVideoCard = ({
  videoId,
  title,
  thumbnail,
  duration,
  views,
  postTime,
  avatar,
  channelName,
  desc,
  channelId,
}) => (
  <>
    <NavLink to={`/video/${videoId}/${channelId}?category=${"Trending"}`}>
      <Flex width={"100%"} gap={5}>
        <Box
          backgroundColor="#2e2c2c"
          borderRadius={"8px"}
          position={"relative"}
          overflow={"hidden"}
          width={"30%"}
          height={"170px"}
        >
          <Image
            src={thumbnail}
            width="100%"
            alt="thumbnail"
            objectFit={"cover"}
            height={"100%"}
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
          <Text fontSize={"22px"} color={"white"}>
            {title}
          </Text>

          <Flex margintop="5px" gap={2}>
            <Text color={"#b7b5b5"} fontSize={"sm"}>
              {views || ""}{" "}
            </Text>
            <Text color={"#b7b5b5"} fontSize={"sm"}>
              |
            </Text>
            <Text color={"#b7b5b5"} fontSize={"sm"}>
              {postTime || "1 day ago"}
            </Text>
          </Flex>

          <Flex marginTop={"10px"} gap={3} alignItems={"center"}>
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
            <Text color={"#b7b5b5"} fontSize={"sm"}>
              {channelName}
            </Text>
          </Flex>

          <Text>{desc || ""}</Text>
        </Box>
      </Flex>
    </NavLink>
  </>
);

export default SearchVideoCard;
