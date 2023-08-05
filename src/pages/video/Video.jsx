import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { BiLike, BiDislike } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { FiMoreHorizontal } from "react-icons/fi";
import numeral from "numeral";
import { formatDistanceToNow } from "date-fns";

import Header from "../../components/layout/Header";
import RelatedList from "../../components/list/RelatedList.jsx";

const Video = () => {
  const [videoDetails, setvideoDetails] = useState({});
  const [channelDetails, setChannelDetails] = useState({});
  const { videoId, channelId } = useParams();

  const getVideoDetails = useCallback(async () => {
    const res = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=AIzaSyCSg8WrqSPJ475M6NEebNrztvnEgSfosgc`
    );
    setvideoDetails(res.data.items[0]);
    console.log(res.data);
  }, [videoId]);

  const getChannelDetails = useCallback(async () => {
    const res2 = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=AIzaSyCSg8WrqSPJ475M6NEebNrztvnEgSfosgc`
    );
    console.log(res2.data);
    setChannelDetails(res2.data.items[0]);
  }, [channelId]);

  useEffect(() => {
    const getVideoAndChannelDetails = async () => {
      await getVideoDetails();
      await getChannelDetails();
    };

    getVideoAndChannelDetails();
  }, [channelId, videoId, getVideoDetails, getChannelDetails]);

  // Video Options
  const opts = {
    height: "485",
    width: "860",
    showRelatedVideos: false,
    playerVars: {
      autoplay: 1, // Auto-play the video
    },
  };

  return (
    <>
      <Header />
      <Flex
        gap={5}
        minHeight={"90vh"}
        width={"100%"}
        padding={"15px 30px"}
        bg="#0f0f0f"
      >
        <Box width="860px">
          <YouTube videoId={videoId} opts={opts} />

          <Box>
            <Text color={"white"} padding={"8px"} fontSize="22px">
              {videoDetails?.snippet?.title}
            </Text>

            <VideoDetails
              videoDetails={videoDetails}
              channelDetails={channelDetails}
            />
          </Box>
        </Box>

        <Box>
          <RelatedList />
        </Box>
      </Flex>
    </>
  );
};

export default Video;

const VideoDetails = ({ videoDetails, channelDetails }) => {
  const [showMore, setShowMore] = useState(false);
  const linkRegex = /(https?:\/\/[^\s]+)/g;

  return (
    <>
      <Flex align={"center"} gap={5} justify={"space-between"}>
        <Flex gap={3} alignItems={"center"}>
          <Avatar
            size={"md"}
            name={channelDetails?.snippet?.title}
            src={channelDetails?.snippet?.thumbnails?.medium?.url}
          />
          <Box>
            <Text color={"white"}>{channelDetails?.snippet?.title}</Text>
            <Text size={"xs"} color={"gray"}>
              {viewsConverter(channelDetails?.statistics?.subscriberCount)}{" "}
              subscribers
            </Text>
          </Box>
          <Button
            _hover={{ bg: "#b7b7b7" }}
            bg="#e6e6e6"
            color={"#303030"}
            fontSize="14px"
            borderRadius="20px"
            size={"sm"}
          >
            Subscribe
          </Button>
        </Flex>
        <Flex gap={1}>
          <Box>
            <Button
              borderRadius={"20px 0 0 20px"}
              color="white"
              bg={"#303030"}
              leftIcon={<BiLike size={"20px"} />}
              borderRight={"1px"}
              borderStyle={"solid"}
              borderColor="white"
              _hover={{ bg: "#424242" }}
              fontSize={"14px"}
              size={"sm"}
            >
              {viewsConverter(videoDetails?.statistics?.likeCount)}
            </Button>
            <IconButton
              borderRadius={"0 20px 20px 0 "}
              color="white"
              _hover={{ bg: "#424242" }}
              bg="#303030"
              icon={<BiDislike size={"20px"} />}
              size={"sm"}
            />
          </Box>

          <Button
            borderRadius={"20px"}
            color="white"
            _hover={{ bg: "#424242" }}
            bg="#303030"
            leftIcon={<PiShareFatLight size={"20px"} />}
            fontSize={"14px"}
            size={"sm"}
          >
            Share
          </Button>

          <Button
            borderRadius={"20px"}
            _hover={{ bg: "#424242" }}
            bg="#303030"
            color={"white"}
            leftIcon={<LiaDownloadSolid size="20px" />}
            fontSize={"14px"}
            size={"sm"}
          >
            Download
          </Button>

          <IconButton
            borderRadius={"20px"}
            color="white"
            _hover={{ bg: "#424242" }}
            bg="#303030"
            size={"sm"}
            icon={<FiMoreHorizontal size={"20px"} />}
          />
        </Flex>
      </Flex>

      <Box
        borderRadius={"20px"}
        _hover={{ bg: "#424242", cursor: "pointer" }}
        bg={"#303030"}
        padding={"20px 15px"}
        marginTop={"15px"}
      >
        <Text color={"white"}>
          {viewsConverter(videoDetails?.statistics?.viewCount)} |{" "}
          {videoDetails?.snippet?.publishedAt &&
            timeConverter(videoDetails?.snippet?.publishedAt)}
        </Text>
        <Box
          onClick={() => setShowMore(!showMore)}
          color={"white"}
          fontSize="15px"
          whiteSpace={"pre-line"}
        >
          {showMore
            ? videoDetails?.snippet?.description
              .split(linkRegex)
              .map((part, index) =>
                linkRegex.test(part, index) ? (
                  <Link color={"#007bff"} href={part} key={index}>
                    {part}
                  </Link>
                ) : (
                  part
                )
              )
            : `${videoDetails?.snippet?.description
              .split("")
              .slice(0, 80)
              .join("")}...`
              .split(linkRegex)
              .map((part, index) =>
                linkRegex.test(part, index) ? (
                  <Link color={"#007bff"} href={part} key={index}>
                    {part}
                  </Link>
                ) : (
                  part
                )
              )}
        </Box>
      </Box>
    </>
  );
};

// Views
const viewsConverter = (views) => {
  const formattedViews = numeral(views).format("0.[00]a");

  return formattedViews;
};

// Video Uploaded
const timeConverter = (time) => {
  const date = new Date(time);
  return formatDistanceToNow(date, { addSuffix: true });
};
