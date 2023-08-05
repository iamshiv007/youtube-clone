import React from "react";
import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";

const HomeSkeleton = () => (
  <>
    <Box width={"100%"}>
      <Skeleton>
        <Box
          borderRadius={"8px"}
          position={"relative"}
          backgroundRepeat={"no-repeat"}
          height={"180px"}
          backgroundImage={"url('https://i.ytimg.com/vi/-ME4gY9i4G4/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDlivhEse-sboxfW57u_wU_4KLAGQ')"}
          backgroundSize={"cover"}
          backgroundColor="#2e2c2c"
          backgroundPosition={"center"}
        ></Box>
      </Skeleton>

      <Flex marginTop={"10px"} gap={3}>
        <SkeletonCircle>
          <Box height={"35px"} borderRadius={"100%"} width={"35px"} />
        </SkeletonCircle>

        <Box color={"white"}>
          <Skeleton>
            <Text fontWeight={"semibold"}>
              {
                "This Is Video Home Title - This Is Video Home Title - This Is Video Home Title"
              }
            </Text>
          </Skeleton>
          <Skeleton>
            <Text marginTop={"5px"} fontSize={"xs"}>
              {"channelName"}
            </Text>
          </Skeleton>
          <Skeleton>
            <Text fontSize={"xs"}>20 M views 1 year ago</Text>
          </Skeleton>
        </Box>
      </Flex>
    </Box>
  </>
);

export default HomeSkeleton;
