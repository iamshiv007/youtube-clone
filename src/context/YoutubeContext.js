import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

const YoutubeContext = createContext()

export default YoutubeContext

export const ContextProvider = ({ children }) => {
  const [homeVideos, setHomeVideos] = useState([]);
  const [categoryVideos, setCategoryVideos] = useState([]);
  const [searchVideos, setSearchVideos] = useState();
  const [autocomplete, setAutocomplete] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [country, setCountry] = useState('IN');
  const [language, setLanguage] = useState('hi');

  // useEffect(() => {
  //   loadHomeVideos()
  //   getTrendingVideos();

  // }, [country, language]);

  // 1. Home Videos
  const loadHomeVideos = async () => {
    try {
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCSg8WrqSPJ475M6NEebNrztvnEgSfosgc&part=snippet&maxResults=5&regionCode=${country}&relevanceLanguage=${language}&type=video`)
      setHomeVideos(res.data.items)

    } catch (error) {
      console.log(error)
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
    const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${country}&key=AIzaSyCSg8WrqSPJ475M6NEebNrztvnEgSfosgc&maxResults=5`)
    setTrendingVideos(res.data.items)
  }


  return (
    <YoutubeContext.Provider value={{ homeVideos, categoryVideos, loadCategoryVideos, generateAutocomplete, autocomplete, trendingVideos, getTrendingVideos, setTrendingVideos, setHomeVideos, country, setCountry, language, setLanguage }}>
      {children}
    </YoutubeContext.Provider>
  )
}

