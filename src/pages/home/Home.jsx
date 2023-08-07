import React from "react";
import { useLocation } from "react-router-dom";

// import VideoList from "../../components/list/HomeList";
import TrendingList from "../../components/list/TrendingList";
import SearchVideoList from "../../components/list/SearchList";
import Layout from "../../components/layout/Layout";

const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Access query parameters
  const query = queryParams.get("query");

  if (query) {
    return (
      <Layout>
        <SearchVideoList />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <TrendingList />
      </Layout>
    );
  }
};

export default Home;
