import React from 'react';
import './App.css';
import NewsPage from './pages/NewsPage';
import {BrowserRouter, Route, Routes}  from "react-router-dom"; 
import SignInPage from './pages/SignInPage';


function App() {
  return (
<>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<NewsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="*" element={<h2>NotFound </h2>} />
    </Routes>
</BrowserRouter>

  </>);
}

export default App;



