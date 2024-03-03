import React from 'react';
import BackgroundConfetti from './Confetti1536.svg';
import test from './logo192.png';
import { BrowserRouter, Route, Link, Routes, Navigate} from 'react-router-dom';
import './App.css';
import MainScreen from './MainScreen';

import { useEffect, useMemo, useState } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const birthday = "28 April 2024 00:00:00 GMT+8"
const testTime = "03 March 2024 14:19:40 GMT-5"

export const WaitingScreen = ({ deadline = testTime }) => {
    const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
    const [time, setTime] = useState(parsedDeadline - Date.now());

    useEffect(() => {
        const interval = setInterval(
            () => setTime(parsedDeadline - Date.now()),
            1000,
        );

        //console.log(Math.floor((time / SECOND) % 60));

        return () => clearInterval(interval);
    }, [parsedDeadline, time]);

    if (Math.floor((time / SECOND) % 60) / SECOND == 0){
        return <Navigate to='/Games'  />
    }
    // if (Math.floor((time / SECOND) % 60) / SECOND > 0){
        return (
            <div className="MainBackground">
                <div className='timercontainer'>
                    <h1 className="timerheader">New Age Loading...</h1>
                    <div className="timer">
                        {Object.entries({
                            Days: time / DAY,
                            Hours: (time / HOUR) % 24,
                            Minutes: (time / MINUTE) % 60,
                            Seconds: (time / SECOND) % 60,
                        }).map(([label, value]) => (
                            <div key={label} className="timercol-4">
                                <div className="timerbox">
                                    <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
                                    <span className="timertext">{label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>  
        );  
    // }else{
    //     return (  
    //         <div>
    //           Success
    //         </div>
    //     );
    // }
};
