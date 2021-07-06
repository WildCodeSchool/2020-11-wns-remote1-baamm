import React, { useState, useEffect } from 'react';
import RoomService from '../../../services/room.services';

export default function ListRooms() {
  const [content, setContent] = useState([]);
  console.log(content);

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
      <h3>Liste de vos rooms</h3>

      {content && content.map((room: any) => (
        <div className="roomBlock">
          <div className="room-mainBlock">
            <p>
              Nom :
              {' '}
              {room.name}
            </p>
            <p style={{ alignSelf: 'flex-end' }}>{room.type}</p>
          </div>
          <p>
            Session :
            {' '}
            {room.session}
          </p>
        </div>
      ))}
    </div>
  );
}
