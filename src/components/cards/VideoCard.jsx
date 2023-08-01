import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const VideoCard = () => {
  return (
    <>
      <NavLink to="/">
        <Box>
          <Box
            borderRadius={"15px"}
            position={"relative"}
            backgroundRepeat={"no-repeat"}
            height={"200px"}
            backgroundImage={
              "https://i.ytimg.com/vi/PkZNo7MFNFg/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCWGmAFXkqN3F-QqhVaqBWJY2ltFw"
            }
          >
            <Text
              position={"absolute"}
              right={3}
              bottom={3}
              color={"white"}
              background={"black"}
              fontSize={"sm"}
              padding={"3px 8px"}
              borderRadius={"10px"}
            >
              0:06:23
            </Text>
          </Box>

          <Flex marginTop={"10px"} gap={3}>
            <Image
              height={"44px"}
              borderRadius={"100%"}
              src={
                "https://yt3.ggpht.com/ytc/AOPolaTs1IEit9EUooQAJkWS4SkpUE7oMDXYrjIgnOk1Kw=s68-c-k-c0x00ffffff-no-rj"
              }
              alt="chanell"
            />

            <Box color={"white"}>
              <Text fontWeight={"bold"}>
                Learn JavaScript - Full Course for Begginers
              </Text>
              <Text marginTop={'5px'} fontSize={'sm'} >FreeCodeCamp.org</Text>
              <Text fontSize={"sm"} display={"inline"}>
                15.61m views
              </Text>{" "}
              <Text display={"inline"} fontSize={"sm"}>
                4 years ago
              </Text>
            </Box>
          </Flex>
        </Box>
      </NavLink>
    </>
  );
};

export default VideoCard;
