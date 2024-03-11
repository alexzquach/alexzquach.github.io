import React, { Dispatch, SetStateAction, useState } from 'react';
import BackgroundConfetti from './Confetti1536.svg';
import test from './logo192.png';
import { BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import './App.css';
import MainScreen from './MainScreen';
import CustomCrossword from './CustomCrossword';
import { WaitingScreen } from './WaitingScreen';
import { Timer } from './test';

// Global context for the amount of games completed
export type GlobalContent = {
  totalWinnings: number
  setTotalWinnings: Dispatch<SetStateAction<number>>
  isCrosswordCompleted: Boolean
  setCrosswordComplete: Dispatch<SetStateAction<boolean>>
}

// Default values set on app launch
export const appContext = React.createContext<GlobalContent>(
  {totalWinnings: 0,  setTotalWinnings: () => {}, isCrosswordCompleted: false, setCrosswordComplete: () => {}
});

// Global context for 

function App() {
  const [totalWinnings, setTotalWinnings] = useState(0);

  const [isCrosswordCompleted, setCrosswordComplete] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        {/* Main screen, routes */}
        <appContext.Provider value={{totalWinnings: totalWinnings, setTotalWinnings: setTotalWinnings, isCrosswordCompleted: isCrosswordCompleted, setCrosswordComplete: setCrosswordComplete}}>
          <Routes>
            <Route path="/" element={<WaitingScreen />} />
            <Route path="/Games" element={<MainScreen />} />
            <Route path="/Crossword" element={<CustomCrossword />} />
          </Routes>
        </appContext.Provider>     
      </div>
    </BrowserRouter>
  );
}

export default App;
