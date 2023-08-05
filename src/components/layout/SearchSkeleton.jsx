import {
  Box,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import React from "react";

const SearchSkeleton = () => (
  <>
    <Flex width={"100%"} gap={5}>
      <Skeleton>
        <Box
          backgroundColor="#2e2c2c"
          borderRadius={"8px"}
          position={"relative"}
          overflow={"hidden"}
          width={"310px"}
          height={"170px"}
        >
          <Image
            src={"'https://i.ytimg.com/vi/-ME4gY9i4G4/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDlivhEse-sboxfW57u_wU_4KLAGQ"}
            height="100%"
            width={"100%"}
            alt="thumbnail"
            objectFit={"cover"}
          />
        </Box>
      </Skeleton>

      <Box width="70%">
        <Skeleton>
          {" "}
          <Text fontSize={"2xl"} color={"white"}>
              This is title for a Video, This is title for a Video, This is
          </Text>
          <Text fontSize={"2xl"} color={"white"}>
              This is title Line
          </Text>
        </Skeleton>
        <Skeleton>
          <Text marginTop={"5px"} color={"#b7b5b5"} fontSize={"sm"}>
              2m views 1 day ago
          </Text>
        </Skeleton>

        <Flex marginTop={"10px"} gap={3} alignItems={"center"}>
          <SkeletonCircle>
            <Image
              height={"35px"}
              borderRadius={"100%"}
              src={"avatar"}
              alt="channel"
            />
          </SkeletonCircle>

          <Skeleton>
            <Text color={"#b7b5b5"} fontSize={"sm"}>
                channel name
            </Text>
          </Skeleton>
        </Flex>
      </Box>
    </Flex>
  </>
);

export default SearchSkeleton;
