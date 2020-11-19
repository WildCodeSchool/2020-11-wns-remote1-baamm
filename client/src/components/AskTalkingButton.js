import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

const socket = socketIOClient(ENDPOINT, {
    transports: ['websocket']
});

export default function AskTalkingButton() {


    // correspond à l'objet askingTalk qui sera la demande de prise de parole (avec l'utilisateur, le type d'intervention et la date de demande)
    const [askingTalk, setAskingTalk] = React.useState(null);

    // correspond à l'utilisateur connecté -- écrit en dur pour le moment
    const thisUser =
    {
        id: Math.floor(Math.random() * 101),
        alias: 'Youpi',
        lastName: 'Célafête',
        firstName: 'Youpi',
        role: 'student',
        askTalking: askingTalk
    }

    useEffect(() => {
        // A chaque fois qu'on reçoit un asktalking depuis le serveur
        socket.on('askingtalk from server', askingTalk => {
            console.log("Réception d'un nouvel askingTalk depuis le serveur ::: ", askingTalk);
        });
        // A chaque fois qu'on supprime un asktalking depuis le serveur
        socket.on('askingtalk deleted', askingTalkId => {
            console.log("Suppression d'un askingTalk depuis le serveur - id ::: ", askingTalkId);
        });
    }, []);  

    // useEffect(() => {

    // }, [askingTalk]);

    // fonction appelée par le clic sur le bouton quand on n'a pas encore demandé la parole
    const sendAskTalking = (e) => {
        console.log("ASKING TALK WHEN CLICK ON I WANT TO BLABLA ::: ", askingTalk)

        // seul les élèves ont une raison de demander la parole 
        // TODO : retirer ce if et n'afficher le bouton que si l'user est un élève
        if (thisUser.role !== 'student') {
            return alert("C'est aux élèves de demander la parole");
        }

        // on "crée" notre demande de parole (plus tard : gérer le type d'intervention)
        setAskingTalk(
            {
                id: Math.floor(Math.random() * 101),
                user: thisUser,
                interventionType: 'question',
                askingDate: new Date()
            }
        );

        console.log(askingTalk);
        socket.emit('askingtalk from client', askingTalk);
    }

    // fonction appelée par le clic sur le bouton quand on a déjà demandé la parole
    const cancelAskTalking = (e) => {
        console.log("ASKTALKING TO CANCEL ::: ", askingTalk);
        setAskingTalk(null);
        socket.emit('cancel askingtalk', askingTalk.id);
    }



    return (
        <div>
            { askingTalk &&
                <button onClick={(e) => { cancelAskTalking(e) }} className="cancelAskTalking">Don't need to blabla anymore</button>
            }

            { askingTalk === null &&
                <button onClick={(e) => { sendAskTalking(e) }} className="askTalking">I want to blabla</button>
            }
        </div>
    )
}
