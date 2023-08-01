import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const YoutubeContext = createContext()

export default YoutubeContext

export const ContextProvider = ({ children }) => {
  const [homeVideos, setHomeVideos] = useState([]);
  const [categoryVideos, setCategoryVideos] = useState([]);

  useEffect(() => {
    loadHomeVideos()
  }, []);

  // 1. Home Videos
  const loadHomeVideos = async () => {
    const options = {
      method: 'GET',
      url: 'https://youtube138.p.rapidapi.com/home/',
      params: { hl: 'en', gl: 'US' },
      headers: {
        'X-RapidAPI-Key': '46e102466emsh069eb8e1a1f88bep148650jsn161589bc0004',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
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

  return (
    <YoutubeContext.Provider value={{ homeVideos, categoryVideos, loadCategoryVideos }}>
      {children}
    </YoutubeContext.Provider>
  )
}

