import React from 'react';
import socketIOClient from "socket.io-client";

export default function AskTalkingButton() {

const thisUser = {
    id: Math.random(),
    alias: 'Youpi',
    lastName: 'Célafête',
    firstName: 'Youpi',
    role: 'student',
    askTalking: null
}

const sendAskTalking = (e) => {
    if (!talkingAsked) {
        if (thisUser.role != 'student') {
            return alert("C'est aux élèves de demander la parole");
        }
        const askTalking = {
            id: Math.random(),
            user: thisUser,
            interventionType: 'question',
            askingDate: new Date()
        }
        console.log("ASKTALKING ::: ", askTalking);
        thisUser.askTalking = askTalking;
        setTalkingAsked(true);
    } else {
        setTalkingAsked(false);
        thisUser.askTalking = null;
        console.log("THISUSER ::: ", thisUser);
    }

}

// talkingAsked est à true si l'user a demandé une prise de parole (c'est à dire si son 'askTalking' n'est pas null)
const [talkingAsked, setTalkingAsked] = React.useState(thisUser.askTalking);


    return (
        <button onClick={(e) => { sendAskTalking(e) }} className="askTalking">
            {talkingAsked ? "Don't need to blabla anymore"  : "I want to blabla !"}
        </button>
    )
}
