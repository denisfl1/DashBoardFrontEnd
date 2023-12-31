import React from 'react';
import logo from './logo.svg';
import './App.css';
import LateralBar from './components/LatateralBar'
import HomePage from './Homepage';
import Header from './components/Header';

function App() {
  return (
    <div className="App">

        <LateralBar></LateralBar>
   
        <HomePage></HomePage>
    </div>
  );
}

export default App;
