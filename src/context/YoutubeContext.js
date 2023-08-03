import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

const YoutubeContext = createContext()

export default YoutubeContext

export const ContextProvider = ({ children }) => {
  const [homeVideos, setHomeVideos] = useState([]);
  const [categoryVideos, setCategoryVideos] = useState([]);
  const [autocomplete, setAutocomplete] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");

  const nextPageTokenRef = useRef(nextPageToken)

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }
      fetchMoreData(nextPageToken);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadHomeVideos()

    getTrendingVideos();

  }, []);

  useEffect(() => {
    nextPageTokenRef.current = nextPageToken; // Update the ref when nextPageToken changes
  }, [nextPageToken]);

  // 1. Home Videos
  const loadHomeVideos = async () => {
    const options = {
      method: 'GET',
      url: 'https://youtube138.p.rapidapi.com/home/',
      params: { hl: 'hi', gl: 'IN' },
      headers: {
        'X-RapidAPI-Key': '46e102466emsh069eb8e1a1f88bep148650jsn161589bc0004',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setHomeVideos(response.data.contents)
    } catch (error) {
      console.error(error);
    }
  }

  // 2. Category videos
  const loadCategoryVideos = async (category) => {
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        q: category,
        part: 'snippet,id',
        regionCode: 'US',
        maxResults: '50',
        order: 'date'
      },
      headers: {
        'X-RapidAPI-Key': '46e102466emsh069eb8e1a1f88bep148650jsn161589bc0004',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // 3. Autocomplete Suggetions
  const generateAutocomplete = async (query) => {

    try {

      const res = await axios.get(`https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q=${query}`)
      setAutocomplete(res.data[1])

    } catch (error) {
      console.log(error)
    }
  }

  // 4. Trending Videos
  const getTrendingVideos = async () => {
    const res = await axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&key=AIzaSyCSg8WrqSPJ475M6NEebNrztvnEgSfosgc&maxResults=6')
    setTrendingVideos(res.data.items)
  }

  // Trending Image Scrolling
  const fetchMoreData = async (token) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&key=AIzaSyCSg8WrqSPJ475M6NEebNrztvnEgSfosgc&maxResults=9&pageToken=${nextPageTokenRef.current}`
      );

      const newNextPageToken = res.data.nextPageToken;

      const res2 = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&key=AIzaSyCSg8WrqSPJ475M6NEebNrztvnEgSfosgc&maxResults=9&pageToken=${newNextPageToken}`
      );
      setTrendingVideos((prevTrendingVideos) => [
        ...prevTrendingVideos,
        ...res2.data.items,
      ]);

      setNextPageToken(() => newNextPageToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <YoutubeContext.Provider value={{ homeVideos, categoryVideos, loadCategoryVideos, generateAutocomplete, autocomplete, trendingVideos, getTrendingVideos, setTrendingVideos }}>
      {children}
    </YoutubeContext.Provider>
  )
}

