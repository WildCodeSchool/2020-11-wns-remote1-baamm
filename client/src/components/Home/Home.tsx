/* eslint-disable max-len */
import React from 'react';
import './Home.style.css';
import WelcomeOwl from '../../pictures/welcomeOwl.png';

export default function Home() {
  return (
    <div className="homeContainer">
      <div className="welcome_container">
        <img src={WelcomeOwl} alt="WelcomeLogo" className="welcomeLogo" />
        <div className="welcome_textContainer">
          <p>Bonjour à toi, </p>
          <p id="paraTwo">jeune chouette en devenir !</p>

          <p id="paraThree">Ici tu vas pouvoir partager ton savoir avec un tas d&apos;autres personnes, alors inscris toi vite et rejoins une de nos rooms !</p>

          <p>A bientôt !</p>
        </div>
      </div>
    </div>
  );
}
