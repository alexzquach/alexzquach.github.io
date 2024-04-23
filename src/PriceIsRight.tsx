import React, { useContext, useRef } from 'react';

import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { appContext } from './App';


export default function PriceIsRight() {
    const [done, setDone] = useState(false);

    const leftData = [
        {itemName: "LV Neverfull MM Leather", itemPrice: 2710, imageName: 'round1Left.png'},
        {itemName: "Vancouver Penthouse", itemPrice: 15000000, imageName: 'round2Left.png'},
        {itemName: "Gold Tomahawk steak", itemPrice: 2000, imageName: 'round3Left.png'},
        {itemName: "Bleu De Chanel", itemPrice: 220, imageName: 'round4Left.png'},
        {itemName: "Fake Yeezy Slides", itemPrice: 10, imageName: 'round5Left.png'}, //easy
        {itemName: "Northface Supreme Puffer", itemPrice: 700, imageName: 'round6Left.png'}, //easy
        {itemName: "Petronas Twin Towers", itemPrice: 1600000000, imageName: 'round7Left.png'},
        {itemName: "Porsche 1911 Carrera", itemPrice: 115000, imageName: 'round8Left.png'},

    ]
    

    const rightData = [
        {itemName: "Gucci Canvas Tote", itemPrice: 2250, imageName: 'round1Right.png'}, //medium
        {itemName: "17th Century French Chateaudun", itemPrice: 5000000, imageName: 'round2Right.png'}, //hard
        {itemName: "1kg of Caviar", itemPrice: 6100, imageName: 'round3Right.png'}, //medium
        {itemName: "Axe Body Spray", itemPrice: 10, imageName: 'round4Right.png'}, //easy
        {itemName: "NB 550 Pink", itemPrice: 100, imageName: 'round5Right.png'}, //easy
        {itemName: "Moncler Black Puffer", itemPrice: 2000, imageName: 'round6Right.png'}, //medium
        {itemName: "History Supreme", itemPrice: 4600000000, imageName: 'round7Right.png'}, //medium
        {itemName: "Hermes Birkin Sellier 20 Vert", itemPrice: 105000, imageName: 'round8Right.png'}, //hard
    ]

    const prizing = [5, 10, 25, 60, 100, 500, 1000, 1000];



    // 0 is the beginning
    const [gamePosition, setGamePosition] = useState(0);
    const [imagePath, setImagePath] = useState('round1Left.png');
    const [imagePath2, setImagePath2] = useState('round1Right.png');

    const [color1, setColor1] = useState('#acf');
    const [color2, setColor2] = useState('#acf');
    const [color3, setColor3] = useState('#acf');
    const [color4, setColor4] = useState('#acf');
    const [color5, setColor5] = useState('#acf');
    const [color6, setColor6] = useState('#acf');
    const [color7, setColor7] = useState('#acf');
    const [color8, setColor8] = useState('#acf');


    const [itemName, setItemName] = useState("LV Neverfull MM Leather");
    const [itemName2, setItemName2] = useState("Gucci Canvas Tote");

    let navigate = useNavigate()
    const { totalWinnings, setTotalWinnings, setPriceIsRightComplete } = useContext(appContext);

    // 5, 10, 25, 60, 100, 500, 1000, 1000, 8 rounds, need 16 items, left side right side dictionary, advance entire game stage by 1? or advance one side by one


    const backClick = () => {
        //setCount(count + 1);
        navigate('/Games');
    } 

    const setColorOfPrizing = (color: string, gamePosition: number) => {
        if (gamePosition == 0){
            setColor1(color);
        }else if (gamePosition == 1){
            setColor2(color);
        }else if (gamePosition == 2){
            setColor3(color);
        }else if (gamePosition == 3){
            setColor4(color);
        }else if (gamePosition == 4){
            setColor5(color);
        }else if (gamePosition == 5){
            setColor6(color);
        }else if (gamePosition == 6){
            setColor7(color);
        }else if (gamePosition == 7){
            setColor8(color);
        }
    }

    const leftImageClick = () => {
        // if (leftData[gamePosition].itemPrice > rightData[gamePosition].itemPrice){
            
        // }
        // setImagePath(leftData[gamePosition+1].imageName)
        // setItemName('TEST')
        setGamePosition(gamePosition + 1);

        if (leftData[gamePosition].itemPrice > rightData[gamePosition].itemPrice){
            setTotalWinnings(totalWinnings + prizing[gamePosition]);   
            setColorOfPrizing("lightgreen", gamePosition);
            toast.success("Correct!", {
                position: 'top-center'
            });  
        }else{
            setColorOfPrizing("#f1807e", gamePosition);
            toast.error("Wrong!", {
                position: 'top-center'
            });
        }
        
        if (gamePosition + 1 < leftData.length){
            setImagePath(leftData[gamePosition + 1].imageName);
            setImagePath2(rightData[gamePosition + 1].imageName);
    
            setItemName(leftData[gamePosition + 1].itemName);
            setItemName2(rightData[gamePosition + 1].itemName);
        }
    }

    const rightImageClick = () => {
        setGamePosition(gamePosition + 1);
        // console.log(leftData.length);
        // console.log(gamePosition);
        
        if (leftData[gamePosition].itemPrice < rightData[gamePosition].itemPrice){
            setTotalWinnings(totalWinnings + prizing[gamePosition]);    
            setColorOfPrizing("lightgreen", gamePosition);

            toast.success("Correct!", {
                position: 'top-center'
            });    
        }else{
            setColorOfPrizing("#f1807e", gamePosition);
            toast.error("Wrong!", {
                position: 'top-center'
            });; 
        }
        
        if (gamePosition + 1 < leftData.length){
            setImagePath(leftData[gamePosition + 1].imageName);
            setImagePath2(rightData[gamePosition + 1].imageName);
    
            setItemName(leftData[gamePosition + 1].itemName);
            setItemName2(rightData[gamePosition + 1].itemName);
        }
    }

    useEffect(() => {
        if (gamePosition === leftData.length){
            toast.info("Game over!", {
                position: 'top-center'
            });
            (document.getElementById('backButton') as HTMLButtonElement).hidden = false;
            (document.getElementById('left') as HTMLInputElement)!.disabled = true;
            (document.getElementById('right') as HTMLInputElement)!.disabled = true;
            setImagePath('done.png')
            setImagePath2('done.png')
            setItemName('GAME OVER')
            setItemName2('GAME OVER')
            setPriceIsRightComplete(true);
        }
    }, [gamePosition]);

    return (
        <div className="MainBackground">
            <ToastContainer  />
            <label className="dollarssmall">Current Prize Dollars: ${totalWinnings}</label>
            <div className='imagecontainer'>
                <h1 className="bottomheader">What item costs more?</h1>
                <label> <em>Guess the correct item to earn prize dollars </em></label>
                <div className="priceisrightwinningscolumn"> 
                    {/* TO DO: CREATE BOXES FOR PRICES */}
                    <div id="0" className="winningscolumnrow" style={{backgroundColor: color1}}> <em> $5 </em></div>
                    <div id="1" className="winningscolumnrow" style={{backgroundColor: color2}}> <em> $10 </em></div>
                    <div id="2" className="winningscolumnrow" style={{backgroundColor: color3}}> <em> $25 </em></div>
                    <div id="3" className="winningscolumnrow" style={{backgroundColor: color4}}> <em> $60 </em></div>
                    <div id="4" className="winningscolumnrow" style={{backgroundColor: color5}}> <em> $100 </em></div>
                    <div id="5" className="winningscolumnrow" style={{backgroundColor: color6}}> <em> $500 </em></div>
                    <div id="6" className="winningscolumnrow" style={{backgroundColor: color7}}> <em> $1000 </em></div>
                    <div id="7" className="winningscolumnrow" style={{backgroundColor: color8}}> <em> $2000 </em></div>
                </div>
                <div className="priceisrightdisplay">
                    {/* Need two image columns */}
                    <div className="imagecol-2">
                        <figure>
                            <input type="image" id="left" className="priceisrightgamedisplay" src={require(`./PriceIsRightImages/${imagePath}`)} onClick={() => leftImageClick()} />
                            <figcaption>{itemName}</figcaption>
                        </figure>
                    </div>
                    <div className="imagecol-2">
                        <figure>
                            <input type="image" id="right" className="priceisrightgamedisplay" src={require(`./PriceIsRightImages/${imagePath2}`)} onClick={() => rightImageClick()}/>
                            <figcaption>{itemName2}</figcaption>
                        </figure>
                    </div>
                </div>
                <button id="backButton" className="backbuttonTopRight" onClick={() => backClick()} hidden>Back</button>
            </div>
        </div>
    )
}