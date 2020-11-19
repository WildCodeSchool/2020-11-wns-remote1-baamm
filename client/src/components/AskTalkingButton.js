import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

const socket = socketIOClient(ENDPOINT, {
            transports: ['websocket']
        });

        export default function AskTalkingButton() {


    // correspond à l'objet askingTalk qui sera la demande de prise de parole (avec l'utilisateur, le type d'intervention et la date de demande)
    const [askingTalk, setAskingTalk] = React.useState(null);

    // A chaque fois qu'on reçoit un asktalking depuis le serveur
    useEffect(() => {
        socket.on('receive askingtalk', payload => {
            console.log("Réception d'un nouvel askingTalk");
        });
      }, []);

    // correspond à l'utilisateur connecté -- écrit en dur pour le moment
    const thisUser =
    {
        id: Math.random(),
        alias: 'Youpi',
        lastName: 'Célafête',
        firstName: 'Youpi',
        role: 'student',
        askTalking: askingTalk
    }

    // fonction appelée par le clic sur le bouton
    const sendAskTalking = (e) => {
        socket.emit('askingtalk from client', askingTalk);
        // si on n'a pas de askingTalk, c'est que l'utilisateur n'a pas encore demandé la parole
        if (!askingTalk) {

            console.log("ASKING TALK WHEN CLICK ON I WANT TO BLABLA ::: ", askingTalk)

            // seul les élèves ont une raison de demander la parole 
            // TODO : retirer ce if et n'afficher le bouton que si l'user est un élève
            if (thisUser.role !== 'student') {
                return alert("C'est aux élèves de demander la parole");
            }

            // on "crée" notre demande de parole (plus tard : gérer le type d'intervention)
            setAskingTalk(
                {
                    id: Math.random(),
                    user: thisUser,
                    interventionType: 'question',
                    askingDate: new Date()
                }
            );

            // on ajoute cette demande de prise de parole à l'user
            thisUser.askTalking = askingTalk;

        } else {
            console.log("ASKINGTALK WHEN CLICK ON DONT NEED ::: ", askingTalk);
            // si on a une askingTalk, c'est que l'utilisateur a déjà demandé la parole et qu'il veut annuler sa demande; on vide tout !
            setAskingTalk(null);
            thisUser.askTalking = null;

        }

    }




    return (
        <button onClick={(e) => { sendAskTalking(e) }} className="askTalking">
            {askingTalk ? "Don't need to blabla anymore" : "I want to blabla !"}
        </button>
    )
}
