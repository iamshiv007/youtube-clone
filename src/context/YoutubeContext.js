import React, { createContext, useState } from "react";
import axios from "axios";

const YoutubeContext = createContext()

export default YoutubeContext

export const ContextProvider = ({ children }) => {
  const [homeVideos, setHomeVideos] = useState([]);
  const [searchVideos, setSearchVideos] = useState([]);
  const [autocomplete, setAutocomplete] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [country, setCountry] = useState('IN');
  const [language, setLanguage] = useState('hi');
  const [isLoading, setIsLoading] = useState(false);

  // // 1. Home Videos
  const getHomeVideos = async () => {
    setIsLoading(true)
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
      console.log(response.data);
      setIsLoading(false)
      setHomeVideos(response.data.contents)
    } catch (error) {

      const options = {
        method: 'GET',
        url: 'https://youtube-v31.p.rapidapi.com/search',
        params: {
          regionCode: country,
          part: 'id,snippet',
          type: 'video',
          maxResults: '50',
          videoDuration: 'medium'
        },
        headers: {
          'X-RapidAPI-Key': '46e102466emsh069eb8e1a1f88bep148650jsn161589bc0004',
          'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setHomeVideos(response.data.items)
        setIsLoading(false)
      } catch (error) {
        console.error(error);
      }
    }
  }

  // 2. Autocomplete Suggetions
  const generateAutocomplete = async (query) => {
    try {
      const res = await axios.get(`https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q=${query}`)
      setAutocomplete(res.data[1])

    } catch (error) {
      console.log(error)
    }
  }

  // 3. Trending Videos
  const getTrendingVideos = async () => {
    setIsLoading(true)
    const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${country}&key=AIzaSyCSg8WrqSPJ475M6NEebNrztvnEgSfosgc&maxResults=5`)
    setTrendingVideos(res.data.items)
    setIsLoading(false)
  }

  // 4. Search videos
  const getSearchVideos = async (query) => {
    setIsLoading(true)
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        q: query,
        part: 'snippet,id',
        regionCode: country,
        maxResults: '50'
      },
      headers: {
        'X-RapidAPI-Key': '46e102466emsh069eb8e1a1f88bep148650jsn161589bc0004',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setIsLoading(false)
      setSearchVideos(response.data.items)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <YoutubeContext.Provider value={{ isLoading, homeVideos, generateAutocomplete, autocomplete, trendingVideos, getTrendingVideos, setTrendingVideos, setHomeVideos, country, setCountry, language, setLanguage, getSearchVideos, searchVideos, setIsLoading, getHomeVideos, getTrendingVideos }}>
      {children}
    </YoutubeContext.Provider>
  )
}

