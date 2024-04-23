import { useNavigate } from 'react-router-dom';
import './App.css';

import waitingRoomMusic from './waitingroom.mp3'

import { useEffect, useMemo, useState, useRef } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const birthday = "28 April 2024 00:00:00 GMT+8"
const testTime = "11 April 2024 11:00:00 GMT-4"

export const WaitingScreen = ({ deadline = birthday }) => {
    const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
    const [time, setTime] = useState(parsedDeadline - Date.now());
    const [playing, setPlaying] = useState(false);

    const audio = useRef(new Audio(waitingRoomMusic));

    let navigate = useNavigate()
    
    const play = () => {
        setPlaying(true);
        audio.current.play();
        audio.current.loop = true;
    };
    
    const pause = () => {
        setPlaying(false);
        audio.current.pause();
    };

    useEffect(() => {
        const interval = setInterval(
            () => setTime(parsedDeadline - Date.now()),
            1000,
        );

        // Auto navigate on timer expiration
        if (parsedDeadline - Date.now() <= 0){
            audio.current.pause();
            navigate('./Games');
        }

        return () => clearInterval(interval);
    }, [parsedDeadline, time]);

    return (
        <div className="MainBackground">
            <div className='timercontainer'>
                <button className="music" onClick={playing ? pause : play}>Play Waiting Room Music</button>
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
};
