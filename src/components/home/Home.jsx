import React, { Fragment } from "react";
import VideoList from "../list/VideoList";
import { useParams } from "react-router-dom";
import TrendingList from "../list/TrendingList";
import Layout from "../layout/Layout";

const Home = () => {
  const { category } = useParams();

  return <Fragment>{category ? <TrendingList /> : <VideoList />}</Fragment>;
};

export default Home;
