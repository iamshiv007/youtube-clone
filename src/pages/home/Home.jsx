import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import TrendingList from "../../components/list/TrendingList";
import SearchVideoList from "../../components/list/SearchList";
import Layout from "../../components/layout/Layout";

const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
