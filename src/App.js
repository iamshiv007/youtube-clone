import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Video from "./pages/video/Video";
import Home from "./pages/home/Home";
import "./App.css";
import MobileSearch from "./components/layout/MobileSearch";

function App() {

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/video/:videoId/:channelId' element={<Video />} />
          <Route path='/search/mobile' element={<MobileSearch />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
