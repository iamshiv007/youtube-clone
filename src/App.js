import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import './App.css';
import Search from './components/search/Search';
import Layout from './components/layout/Layout';
import Video from './components/video/Video';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/category/:category' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='video/:videoId' element={<Video />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
