import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faCommentAlt,
  faUsers,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import Participants from './Participants/Participants';
import WaitingQueue from './WaitingQueue/WaitingQueue';
import ChatRoom from './ChatRoom/ChatRoom';
import './DynamicMenu.style.css';

export default function DynamicMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [onTchat, setOnTchat] = useState(false);
  const [onQueue, setOnQueue] = useState(false);
  const [onUserList, setOnUserList] = useState(false);

  return (
    <div className={isOpen ? 'menuContainer openedContainer' : 'menuContainer closedContainer'}>
      <div className={isOpen ? 'menuBar menuBarOpen' : 'menuBar menuBarClose'}>
        {isOpen
          ? (
            <button type="button" onClick={() => setIsOpen(false)} className={isOpen ? 'buttonBarContainer buttonBarContainerOpen' : 'buttonBarContainer buttonBarContainerClose'}>
              <FontAwesomeIcon icon={faAngleRight} className="buttonBarIcon" />
            </button>
          )
          : (
            <button type="button" onClick={() => setIsOpen(true)} className={isOpen ? 'buttonBarContainer buttonBarContainerOpen' : 'buttonBarContainer buttonBarContainerClose'}>
              <FontAwesomeIcon icon={faAngleLeft} className="buttonBarIcon" />
            </button>
          )}
        <button
          type="button"
          onClick={() => {
            setOnTchat(true);
            setOnQueue(false);
            setOnUserList(false);
            setIsOpen(true);
          }}
          className={isOpen ? 'buttonBarContainer buttonBarContainerOpen' : 'buttonBarContainer buttonBarContainerClose'}
        >
          <FontAwesomeIcon icon={faCommentAlt} className="buttonBarIcon" />
        </button>
        <button
          type="button"
          onClick={() => {
            setOnTchat(false);
            setOnQueue(true);
            setOnUserList(false);
            setIsOpen(true);
          }}
          className={isOpen ? 'buttonBarContainer buttonBarContainerOpen' : 'buttonBarContainer buttonBarContainerClose'}
        >
          <FontAwesomeIcon icon={faClock} className="buttonBarIcon" />
        </button>
        <button
          type="button"
          onClick={() => {
            setOnTchat(false);
            setOnQueue(false);
            setOnUserList(true);
            setIsOpen(true);
          }}
          className={isOpen ? 'buttonBarContainer buttonBarContainerOpen' : 'buttonBarContainer buttonBarContainerClose'}
        >
          <FontAwesomeIcon icon={faUsers} className="buttonBarIcon" />
        </button>
      </div>
      {isOpen ? (
        <>
          {onTchat && <ChatRoom />}
          {onQueue && <WaitingQueue />}
          {onUserList && <Participants />}
        </>
      ) : null}

    </div>
  );
}
