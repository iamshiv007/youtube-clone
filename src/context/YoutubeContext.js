import React, { createContext, useState } from "react";
import axios from "axios";

import { errorhandling } from "../utils/utils";

const YoutubeContext = createContext()

export default YoutubeContext

export const ContextProvider = ({ children }) => {
  const [homeVideos, setHomeVideos] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [searchVideos, setSearchVideos] = useState([]);
  const [autocomplete, setAutocomplete] = useState([]);
  const [country, setCountry] = useState("IN");
  const [isLoading, setIsLoading] = useState(false);

  // 1. Home Videos
  const getHomeVideos = async () => {
    setIsLoading(true)

    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/search",
      params: {
        regionCode: country,
        part: "id,snippet",
        type: "video",
        maxResults: "50",
        videoDuration: "medium"
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPId_API_KEY,
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com"
      }
    };

    try {
      const response = await axios.request(options);
      setHomeVideos(response.data.items) /
        setIsLoading(false)
    } catch (error) {
      errorhandling(error)
    }
  }


  // 2. Autocomplete Suggetions
  const generateAutocomplete = async (query) => {
    try {
      const res = await axios.get(`https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q=${query}`)
      setAutocomplete(res.data[1])

    } catch (error) {
      errorhandling(error)
    }
  }

  // 3. Trending Videos
  const getTrendingVideos = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${country}&key=${process.env.REACT_APP_YOUTUBE_API_GOOGLE2}&maxResults=10`)
      setTrendingVideos(res.data.items)
      setIsLoading(false)
    } catch (error) {
      errorhandling(error)
    }
  }

  // 4. Search videos
  const getSearchVideos = async (query) => {
    setIsLoading(true)

    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/search",
      params: {
        q: query,
        part: "snippet,id",
        regionCode: country,
        maxResults: "50"
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPId_API_KEY,
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com"
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setIsLoading(false)
      setSearchVideos(response.data.items)
    } catch (error) {
      errorhandling(error)
    }
  }



  return (
    <YoutubeContext.Provider value={{ isLoading, homeVideos, generateAutocomplete, autocomplete, trendingVideos, getTrendingVideos, setTrendingVideos, setHomeVideos, country, setCountry, getSearchVideos, searchVideos, setIsLoading, getHomeVideos }}>
      {children}
    </YoutubeContext.Provider>
  )
}

