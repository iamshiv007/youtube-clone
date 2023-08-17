/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { errorHandling } from "../../utils/utils";

const Video = () => {
  const [videoDetails, setvideoDetails] = useState({});
  const [channelDetails, setChannelDetails] = useState({});
  const { videoId, channelId } = useParams();

  const navigate = useNavigate();

  const getVideoDetails = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY_GOOGLE2}`
      );
      setvideoDetails(res.data.items[0]);
      console.log(res.data);
    } catch (error) {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY_GOOGLE1}`
        );
        setvideoDetails(res.data.items[0]);
        console.log(res.data);
      } catch (error) {
        errorHandling(error);
      }
    }
  };

  const getChannelDetails = async () => {
    try {
      const res2 = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY_GOOGLE2}`
      );
      console.log(res2.data);
      setChannelDetails(res2.data.items[0]);
    } catch (error) {
      try {
        const res2 = await axios.get(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY_GOOGLE1}`
        );
        console.log(res2.data);
        setChannelDetails(res2.data.items[0]);
      } catch (error) {
        errorHandling(error);
      }
    }
  };

  useEffect(() => {
    const handleBackButton = () => {
      navigate("/"); // Redirect to the home page
    };

    window.onpopstate = handleBackButton;

    return () => {
      window.onpopstate = null; // Clean up the event listener
    };
  }, []);

  useEffect(() => {
    getVideoDetails();
    window.scrollTo(0, 0);
  }, [videoId]);

  useEffect(() => {
    getChannelDetails();
  }, [channelId]);

  // Video Options
  const opts1 = {
    height: "485",
    width: "860",
    showRelatedVideos: false,
    playerVars: {
      autoplay: 0, // Auto-play the video
    },
  };

  const opts2 = {
    height: "210px",
    width: "100%",
    showRelatedVideos: false,
    playerVars: {
      autoplay: 0, // Auto-play the video
    },
  };

  return (
    <>
      <Box display={{ base: "none", sm: "none", md: "block" }}>
        <Header />
      </Box>
      <Flex
        gap={5}
        minHeight={"90vh"}
        width={"100%"}
        padding={{ base: "5px 0", md: "15px 30px" }}
        bg="#0f0f0f"
        direction={{ base: "column", sm: "column", md: "row" }}
      >
        <Box width={{ md: "860px" }}>
          <Box
            width={"860px"}
            height={"485px"}
            background={"#2e2c2c"}
            display={{ base: "none", sm: "none", md: "block" }}
          >
            <YouTube videoId={videoId} opts={opts1} />
          </Box>
          <Box
            position={"sticky"}
            top={"0"}
            display={{ base: "block", sm: "block", md: "none" }}
            zIndex={13}
            height={"210px"}
            background={"#2e2c2c"}
          >
            <YouTube videoId={videoId} opts={opts2} />
          </Box>

          <Box>
            <Text
              color={"white"}
              padding={"8px"}
              fontSize={{ base: "lg", md: "22px" }}
            >
              {videoDetails?.snippet?.title}
            </Text>

            <VideoDetails
              videoDetails={videoDetails}
              channelDetails={channelDetails}
            />
          </Box>

          <Box display={{ base: "block", sm: "block", md: "none" }}>
            <RelatedList videoId={videoId} />
          </Box>
        </Box>

        <Box display={{ base: "none", sm: "none", md: "block" }}>
          <RelatedList videoId={videoId} />
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
      <Flex
        direction={{ base: "column", sm: "column", md: "row" }}
        align={{ base: "start", sm: "start", md: "center" }}
        gap={{ md: 5 }}
        justify={"space-between"}
      >
        <Flex
          justify={{ base: "space-between" }}
          padding={"8px"}
          gap={3}
          alignItems={"center"}
        >
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
            alignSelf={"flex-end"}
          >
            Subscribe
          </Button>
        </Flex>
        <Flex padding={"8px"} gap={1}>
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
            display={{ base: "none", md: "block" }}
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
        margin={{ base: "15px 8px", sm: "15px 8px", md: "15px  0" }}
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
