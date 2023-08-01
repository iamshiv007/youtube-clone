import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import './App.css';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
