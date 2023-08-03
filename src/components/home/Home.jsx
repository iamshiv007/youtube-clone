import React, { Fragment, useContext } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Box, Flex, Select } from "@chakra-ui/react";
import VideoList from "../list/VideoList";
import { useParams } from "react-router-dom";
import TrendingList from "../list/TrendingList";
import YoutubeContext from "../../context/YoutubeContext";

const Home = () => {
  const { category } = useParams();
  const { setLanguage, setCountry } = useContext(YoutubeContext);

  return (
    <Fragment>
      <Box bg={"#0f0f0f"}>
        <Header />

        <Flex>
          <Box minWidth={"fit-content"} width="15%">
            <Sidebar />
          </Box>

          <Box>
            <Box width={"95%"} margin={"auto"}>
              <Select
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                defaultValue={"IN"}
              >
                <option value="IN">India</option>
                <option value="US">America</option>
                <option value={"JP"}>Japan</option>
                <option value={"DE"}>Germany</option>
              </Select>
              <Select
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="Language"
                defaultValue={"hi"}
              >
                <option value="hi">Hindi</option>
                <option value="en">English</option>
              </Select>

              {category ? <TrendingList /> : <VideoList />}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Fragment>
  );
};

export default Home;
