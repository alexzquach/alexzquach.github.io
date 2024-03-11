import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import './App.css';
import { appContext } from './App';
import { useLocation, useNavigate, Outlet, useOutletContext } from 'react-router-dom';

export default function MainScreen(this: any) {

    // Declarations
    let navigate = useNavigate()

    const { totalWinnings, setTotalWinnings, isCrosswordCompleted, setCrosswordComplete } = useContext(appContext);
    // End Declarations

    console.log(totalWinnings);

    // Game Clicks
    const crossWordClick = () => {
      navigate('/Crossword');
    } 

    const priceIsRightClick = () => {
      navigate('/Crossword');
    } 
    // End Game Clicks

    // Game completion trackers()
    useEffect(() => {
      if (isCrosswordCompleted == true){
          // Disable the button
          (document.getElementById('crosswordButton') as HTMLInputElement)!.disabled = true;
          console.log("Done Crossword");
      }
  }, [isCrosswordCompleted]);

  return (  
      <div className="MainBackground">
        <div className='imagecontainer'>
          <h1>Finish all 3 games to unlock your gift</h1>
          <div className="imagedisplay">
            <div className="imagecol-3">
              <figure>
                <input type="image" id="crosswordButton" className="gamedisplay" src={require('./toronto.png')} onClick={() => crossWordClick()} title="Complete a puzzle about love" />
                <figcaption>Crossword Puzzle</figcaption>
              </figure>
            </div>
            <div className="imagecol-3">
              <figure>
                <img className="gamedisplay" src={require('./toronto.png')} />
                <figcaption>Crossword Puzzle</figcaption>
              </figure>
            </div>
            <div className="imagecol-3">
            <figure>
                <input type="image" id="priceButton" className="gamedisplay" src={require('./dior.png')} onClick={() => priceIsRightClick()} title="Earn dollars for your birthday"/>
                <figcaption>The Price is Right</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
  );
}