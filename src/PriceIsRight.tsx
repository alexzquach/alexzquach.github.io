import React, { useContext, useRef } from 'react';

import { Crossword, ThemeProvider } from '@jaredreisinger/react-crossword';
import { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { appContext } from './App';

export default function PriceIsRight() {
    const [done, setDone] = useState(false);
    
    const testData = [
        {itemName: "Porsche 1911 Carrera", itemPrice: 115000, imageName: 'porsche.png'},
        {itemName: "Hermes Birkin Sellier 20 Vert", itemPrice: 105000, imageName: 'dior.png'}
    ]

    const leftData = [
        {itemName: "LV Neverfull MM Leather", itemPrice: 2710, imageName: 'round1Left.png'},
        {itemName: "Vancouver Penthouse", itemPrice: 15000000, imageName: 'round2Left.png'},
        {itemName: "Porsche 1911 Carrera", itemPrice: 115000, imageName: 'porsche.png'},

    ]
    

    const rightData = [
        {itemName: "Gucci Canvas Tote", itemPrice: 2250, imageName: 'round1Right.png'},
        {itemName: "17th Century French Chateaudun", itemPrice: 5000000, imageName: 'round2Right.png'},
        {itemName: "Hermes Birkin Sellier 20 Vert", itemPrice: 105000, imageName: 'dior.png'}
    ]

    const prizing = [5, 10, 25, 60, 100, 500, 1000, 2000];



    // 0 is the beginning
    const [gamePosition, setGamePosition] = useState(0);
    const [imagePath, setImagePath] = useState(leftData[gamePosition].imageName);
    const [imagePath2, setImagePath2] = useState(rightData[gamePosition].imageName);
    const [itemName, setItemName] = useState(leftData[gamePosition].itemName);
    const [itemName2, setItemName2] = useState(rightData[gamePosition].itemName)

    let navigate = useNavigate()
    const { totalWinnings, setTotalWinnings, setCrosswordComplete } = useContext(appContext);


    

    //
    // 5, 10, 25, 60, 100, 500, 1000, 2000, 8 rounds, need 16 items, left side right side dictionary, advance entire game stage by 1? or advance one side by one


    const backClick = () => {
        //setCount(count + 1);

        setTotalWinnings(totalWinnings + 100);

        // For laters
        // navigate('/Games');
    } 

    const leftImageClick = () => {
        // if (leftData[gamePosition].itemPrice > rightData[gamePosition].itemPrice){
            
        // }
        // setImagePath(leftData[gamePosition+1].imageName)
        // setItemName('TEST')
        setGamePosition(gamePosition + 1);

        if (leftData[gamePosition].itemPrice > rightData[gamePosition].itemPrice){
            setTotalWinnings(totalWinnings + prizing[gamePosition]);          
        }else{

        }
        
        setImagePath(leftData[gamePosition + 1].imageName);
        setImagePath2(rightData[gamePosition + 1].imageName);

        setItemName(leftData[gamePosition + 1].itemName)
        setItemName2(rightData[gamePosition + 1].itemName);

    }

    const rightImageClick = () => {
        // if (leftData[gamePosition].itemPrice > rightData[gamePosition].itemPrice){
            
        // }
        // setImagePath(leftData[gamePosition+1].imageName)
        // setItemName('TEST')
        setGamePosition(gamePosition + 1);

        if (leftData[gamePosition].itemPrice < rightData[gamePosition].itemPrice){
            setTotalWinnings(totalWinnings + prizing[gamePosition]);          
        }else{

        }
        
        setImagePath(leftData[gamePosition + 1].imageName);
        setImagePath2(rightData[gamePosition + 1].imageName);

        setItemName(leftData[gamePosition + 1].itemName)
        setItemName2(rightData[gamePosition + 1].itemName);

    }

    return (
        <div className="MainBackground">
            <label className="dollarssmall">Current Prize Dollars: ${totalWinnings}</label>
            <div className='imagecontainer'>
                <h1 className="bottomheader">What item costs more?</h1>
                <label> <em>Guess the correct item to earn prize dollars </em></label>
                <div className="priceisrightwinningscolumn"> 
                    {/* TO DO: CREATE BOXES FOR PRICES */}
                    <div id="0"> <em> $5 </em></div>
                    <div id="1"> <em> $10 </em></div>
                    <div id="2"> <em> $25 </em></div>
                    <div id="3"> <em> $60 </em></div>
                    <div id="4"> <em> $100 </em></div>
                    <div id="5"> <em> $500 </em></div>
                    <div id="6"> <em> $1000 </em></div>
                    <div id="7"> <em> $2000 </em></div>
                </div>
                <div className="priceisrightdisplay">
                    {/* Need two image columns */}
                    <div className="imagecol-2">
                        {/* <img src={require(`./PriceIsRightImages/${testData[0].imageName}`)}/> */}
                        {/* <img src={`./PriceIsRightImages/toronto.png`}/> */}

                        <figure>
                            <input type="image" className="priceisrightgamedisplay" src={require(`./PriceIsRightImages/${imagePath}`)} onClick={() => leftImageClick()} />
                            <figcaption>{itemName}</figcaption>
                        </figure>
                    </div>
                    <div className="imagecol-2">
                        <figure>
                            <input type="image" className="priceisrightgamedisplay" src={require(`./PriceIsRightImages/${imagePath2}`)} onClick={() => rightImageClick()}/>
                            <figcaption>{itemName2}</figcaption>
                        </figure>
                    </div>
                </div>
                <button id="backButton" className="backbuttonTopRight" onClick={() => backClick()}>Back</button>
            </div>
        </div>
    )
}