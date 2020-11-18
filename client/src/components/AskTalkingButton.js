import React, { useEffect } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";


export default function AskTalkingButton() {

    

    const [askTalking, setAskTalking] = React.useState(null);
    // talkingAsked est à true si l'user a demandé une prise de parole (c'est à dire si son 'askTalking' n'est pas null)

    const thisUser = {
        id: Math.random(),
        alias: 'Youpi',
        lastName: 'Célafête',
        firstName: 'Youpi',
        role: 'student',
        askTalking: askTalking
    }

    const [talkingAsked, setTalkingAsked] = React.useState(thisUser.askTalking);


    useEffect(() => {
        const socket = socketIOClient(ENDPOINT, {
            transports: ['websocket']
        });
        socket.on("AskTalking", () => {
            console.log("SOCKET ASK TALKING EVENT DATA", askTalking);
            // socket.emit('Hello from client', "data")
        });
    }, [askTalking]);

    const sendAskTalking = (e) => {
        if (!talkingAsked) {
            if (thisUser.role !== 'student') {
                return alert("C'est aux élèves de demander la parole");
            }
            setAskTalking({
                id: Math.random(),
                user: thisUser,
                interventionType: 'question',
                askingDate: new Date()
            });
            console.log("ASKTALKING ::: ", askTalking);
            thisUser.askTalking = askTalking;
            setTalkingAsked(true);
        } else {
            setAskTalking(null);
            setTalkingAsked(false);
            thisUser.askTalking = null;
            console.log("THISUSER ::: ", thisUser);
        }

    }

    return (
        <button onClick={(e) => { sendAskTalking(e) }} className="askTalking">
            {talkingAsked ? "Don't need to blabla anymore" : "I want to blabla !"}
        </button>
    )
}
