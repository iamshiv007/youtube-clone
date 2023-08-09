import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Video from "./pages/video/Video";
import Home from "./pages/home/Home";
import "./App.css";

function App() {

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
