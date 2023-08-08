import React, { createContext, useState } from "react";
import axios from "axios";

import { errorHandling } from "../utils/utils";

const YoutubeContext = createContext()
export default YoutubeContext

export const ContextProvider = ({ children }) => {
  const [homeVideos, setHomeVideos] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [searchVideos, setSearchVideos] = useState([]);
  const [trendingVideosLength, setTrendingVideosLength] = useState(15);
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
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com"
      }
    };

    try {
      const response = await axios.request(options);
      setHomeVideos(response.data.items) /
        setIsLoading(false)
    } catch (error) {
      errorHandling(error)
    }
  }


  // 2. Autocomplete Suggetions
  const generateAutocomplete = async (query) => {
    try {
      const res = await axios.get(`https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q=${query}`)
      setAutocomplete(res.data[1])

    } catch (error) {
      errorHandling(error)
    }
  }

  // 3. Trending Videos
  const getTrendingVideos = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${country}&key=${process.env.REACT_APP_YOUTUBE_API_GOOGLE2}&maxResults=15`)
      setTrendingVideos(res.data.items)
      setTrendingVideosLength(res.data.pageInfo.totalResults)
      setIsLoading(false)
    } catch (error) {
      
      try {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${country}&key=${process.env.REACT_APP_YOUTUBE_API_GOOGLE1}&maxResults=15`)
        setTrendingVideos(res.data.items)
        setTrendingVideosLength(res.data.pageInfo.totalResults)
        setIsLoading(false)
      } catch (error) {
        errorHandling(error)
      }

    }
  }

  // 4. Search videos
  const getSearchVideos = async (query) => {
    setIsLoading(true)
    console.log(process.env.REACT_APP_RAPId_API_KEY)

    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/search",
      params: {
        q: query,
        part: "snippet,id",
        regionCode: country,
        maxResults: "50",
        type: "video",
        videoDuration: "medium"
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com"
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setIsLoading(false)
      setSearchVideos(response.data.items)
    } catch (error) {
      alert("Rapid api not working using alternate api")

      try {
        const response2 = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=business&key=${process.env.REACT_APP_YOUTUBE_API_GOOGLE1}&maxResults=50&type=video&videoDuration=medium`)
        console.log(response2.data);
        setIsLoading(false)
        setSearchVideos(response2.data.items)
      } catch (error) {
        errorHandling(error)
      }

    }
  }

  return (
    <YoutubeContext.Provider value={{ isLoading, homeVideos, generateAutocomplete, autocomplete, trendingVideos, getTrendingVideos, setTrendingVideos, setHomeVideos, country, setCountry, getSearchVideos, searchVideos, setIsLoading, getHomeVideos, trendingVideosLength }}>
      {children}
    </YoutubeContext.Provider>
  )
}

