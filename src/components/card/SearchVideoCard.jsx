import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const SearchVideoCard = ({
  thumbnail,
  duration,
  title,
  views,
  time,
  avatar,
  channelName,
  desc,
}) => {
  return (
    <>
      <Flex gap={5}>
        <Box
          backgroundColor="#2e2c2c"
          borderRadius={"8px"}
          height={"180px"}
          position={"relative"}
          overflow={"hidden"}
        >
          <Image
            src={thumbnail}
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
            {duration}
          </Text>
        </Box>

        <Box>
          <Text fontSize={"2xl"} color={"white"}>
            {title}
          </Text>
          <Text marginTop={"5px"} color={"#b7b5b5"} fontSize={"sm"}>
            {views || "650 M"} {time || "1 day ago"}
          </Text>

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
    </>
  );
};

export default SearchVideoCard;
