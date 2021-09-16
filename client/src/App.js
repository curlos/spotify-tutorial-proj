import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import './style.scss';

function App() {

  const fetchFromAPI = () => {

  }

  return (
    <div>
      <div className="header">Spotify 2.0</div>
      <button onClick={fetchFromAPI}>Login with spotify</button>
      <SearchBar />
    </div>
  );
}

export default App;
