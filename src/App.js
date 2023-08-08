import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Video from "./pages/video/Video";
import Home from "./pages/home/Home";
import "./App.css";

function App() {
  console.log(process.env.REACT_APP_YOUTUBE_API_GOOGLE1)
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/video/:videoId/:channelId' element={<Video />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
