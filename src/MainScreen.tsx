import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { appContext } from './App';
import { useNavigate } from 'react-router-dom';

export default function MainScreen(this: any) {

  // Declarations
  let navigate = useNavigate()

  const [imagePath, setImagePath] = useState('./toronto.png');
  const [imagePath2, setImagePath2] = useState('./dior.png');

  const { totalWinnings, setTotalWinnings, isCrosswordCompleted, setCrosswordComplete, isPriceIsRightCompleted, setPriceIsRightComplete } = useContext(appContext);
  // End Declarations

  // Game Clicks
  const crossWordClick = () => {
    navigate('/Crossword');
  } 

  const priceIsRightClick = () => {
    navigate('/PriceIsRight');
  } 
  // End Game Clicks

    // Game completion trackers
    useEffect(() => {
      if (isCrosswordCompleted == true){
          // Disable the button
          (document.getElementById('crosswordButton') as HTMLInputElement)!.disabled = true;
          setImagePath('./done.png')
          console.log("Done Crossword");
      }

      if (isPriceIsRightCompleted == true){
        // Disable the button
        (document.getElementById('priceButton') as HTMLInputElement)!.disabled = true;
        setImagePath2('./done.png')
        console.log("Done Price is Right");
      }

      if (isCrosswordCompleted == true && isPriceIsRightCompleted == true){
        (document.getElementById('nextButton') as HTMLButtonElement).hidden = false;
      }
  }, [isCrosswordCompleted, isPriceIsRightCompleted]);

  const NextClick = () => {
    //setCount(count + 1);
    navigate('/FinalScreen');
} 

  //   useEffect(() => {
      
  // }, [isPriceIsRightCompleted]);
  // // End Game Completion trackers

  return (  
      <div className="MainBackground">
        <label className="dollars">Current Prize Dollars: ${totalWinnings}</label>
        <div className='imagecontainer'>
          <h1 className="middleheader">Finish both games to unlock a gift</h1>
          <div className="imagedisplay">
            <div className="imagecol-2">
              <figure>
                <input type="image" id="crosswordButton" className="gamedisplay" src={require(`${imagePath}`)} onClick={() => crossWordClick()} title="Complete a puzzle about love" />
                <figcaption>Crossword Puzzle</figcaption>
              </figure>
            </div>
            <div className="imagecol-2">
            <figure>
                <input type="image" id="priceButton" className="gamedisplay" src={require(`${imagePath2}`)} onClick={() => priceIsRightClick()} title="Earn dollars for your birthday"/>
                <figcaption>The Price is Right</figcaption>
              </figure>
            </div>
          </div>
        </div>
        {/* put hidden */}
        <button id="nextButton" className="backbuttonTopRight" onClick={() => NextClick()} >Next</button>
      </div>
  );
}