import React from 'react';
import BackgroundConfetti from './Confetti1536.svg';
import test from './logo192.png';
import { BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import './App.css';
import MainScreen from './MainScreen';
import { WaitingScreen } from './WaitingScreen';
import { Timer } from './test';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Main screen, routes */}
        <Routes>
          <Route path="/" element={<WaitingScreen />} />
          <Route path="/Games" element={<MainScreen />} />
        </Routes>     
      </div>
    </BrowserRouter>
  );
}

export default App;
