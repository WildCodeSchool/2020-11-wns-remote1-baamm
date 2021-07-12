import React, { useState, useEffect } from 'react';
import RoomService from '../../../services/room.services';
import './ListRooms.style.css';
import owlLogo from '../../../pictures/owlStudent.png';

export default function ListRooms() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    RoomService.getAllRooms().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        setContent((error.response
          && error.response.data
          && error.response.data.message)
          || error.message
          || error.toString());
      },
    );
  }, []);

  return (
    <div className="blocContainer">
      <h3>Vos Rooms</h3>

      {content && content.map((room: any) => (
        <div className="room-Block">
          <div className="logo-Block">
            <img src={owlLogo} alt="Logo" className="logo" />
          </div>
          <div className="room-info-container">
            <p>
              Nom :
              {' '}
              {room.name}
            </p>
            <p>
              Session :
              {' '}
              {room.session}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
