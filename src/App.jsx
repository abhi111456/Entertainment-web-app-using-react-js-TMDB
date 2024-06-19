import * as React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes,Route } from 'react-router-dom';
import MoviesIcon from './components/MoviesIcon';
import Layout from './components/Layout';
import LiveTv from './components/LiveTv';
import Bookmark from './components/Bookmark';
function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Layout/>}/>
      <Route path='/tv' element={<MoviesIcon/>}/>
      <Route path='/latest' element={<LiveTv/>}/>
      <Route path='/bookmark' element={<Bookmark/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
