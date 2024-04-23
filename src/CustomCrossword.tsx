import React, { useContext, useRef } from 'react';

import { Crossword, ThemeProvider } from '@jaredreisinger/react-crossword';
import { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { appContext } from './App';


const testData = {
    across: {
        1: {clue: 'Sweetest Dog',answer: 'BUNNY', row: 0,col: 0,},
    },
    down: {
        2: { clue: 'Our First Vacation', answer: 'NIAGARA', row: 0, col: 2,},
    },
}

// const test = {
//     1: {poo: 2},
//     2: {}
// }
//console.log(testData.across[1])

const gameData = {
    across: {
      1: {clue: 'Sweetest Dog',answer: 'BUNNY', row: 0,col: 0,},
      7: { clue: 'Time _____', answer: 'APART', row: 0, col: 6 },
      9: { clue: 'Aphrodite', answer: 'MATCH', row: 0, col: 12 },
      5: { clue: '___ World', answer: 'SEA', row: 6, col: 0 },
      10: { clue: 'Key Ingredient in Meal Prep Chicken', answer: 'ADOBO', row: 6, col: 6 },
      11: { clue: 'Your Heart Is', answer: 'HOME', row: 3, col: 12 },
      12: { clue: 'Me', answer: 'LOVER', row: 6, col: 12 },
      13: { clue: 'Sea Creature on Land', answer: 'WHALE', row: 3, col: 18 },
    },
    down: {
      2: { clue: 'Our First Vacation', answer: 'NIAGARA', row: 0, col: 2,},
      3: { clue: 'I like your', answer: 'ASS', row: 4, col: 0,},
      7: { clue: 'Greatest Country on Gods Green Earth', answer: 'AMERICA', row: 0, col: 6,},
      8: { clue: 'Where we met', answer: 'TORONTO', row: 0, col: 10,},
      9: { clue: 'My brothers name', answer: 'MICHAEL', row: 0, col: 12,},
      10: { clue: 'Machine Date', answer: 'CLAW', row: 0, col: 18,},
      11: { clue: 'You', answer: 'BABE', row: 0, col: 22,},
      12: { clue: 'Austrian', answer: 'ALPS', row: 3, col: 20,},
    },
}


export default function CustomCrossword() {
    const [done, setDone] = useState(false);

    let navigate = useNavigate()

    const { totalWinnings, setTotalWinnings, setCrosswordComplete } = useContext(appContext);

    // Go back to the games selection screen
    const backClick = () => {
        //setCount(count + 1);
        navigate('/Games');
    } 

    // Callback for checking if the crossword is correct
    const onCrosswordCorrect = useCallback(
        (isCorrect: boolean) => {
            console.log(isCorrect);
            if (isCorrect == true){
                setDone(true);
            }
        }, []
    );

    // hook that checks if the games done
    useEffect(() => {
        if (done == true){
            (document.getElementById('backButton') as HTMLButtonElement).hidden = false;
            console.log("DONE GAME");
            setCrosswordComplete(true);
            setTotalWinnings(totalWinnings + 300);
        }
    }, [done]);

    return (
        <div style={{ width: '100%', backgroundColor: '#acf'}}>
            <ThemeProvider
                theme = {{allowNonSquare: true,
                    columnBreakpoint: '0px',
                    gridBackground: '#acf',
                    cellBorder: '#fca',
                    numberColor: '#FFA500',
                    focusBackground: '#f8c8dc',
                    highlightBackground: '#f8c8dc'}}
                
            >
                <Crossword data={testData} onCrosswordCorrect={onCrosswordCorrect} />
            </ThemeProvider>
            <button id="backButton" className="backbutton" onClick={() => backClick()} hidden>Back to Games</button>
        </div>
    ); 
}