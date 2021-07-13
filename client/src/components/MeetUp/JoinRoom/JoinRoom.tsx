/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import RoomService from '../../../services/room.services';
import './JoinRoom.style.css';

export default function JoinRoom() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();
  const [message, setMessage] = useState('');

  function joinRoom(data: any) {
    RoomService.joinRoom(data.roomID).then(
      (res) => {
        history.push(`/room/${res.id}`);
      },
      (error) => {
        const resMessage = (error.response
          && error.response.data
          && error.response.data.message)
          || error.message
          || error.toString();

        setMessage(resMessage);
      },
    );
  }

  return (
    <div className="join-container">
      <h3>Rejoignez une Room !</h3>
      <form onSubmit={handleSubmit(joinRoom)} className="form-container">
        <div className="inputs-container">
          <input placeholder="RoomID" {...register('roomID', { required: true })} />
        </div>
        <button type="submit" className="inputButton">
          <FontAwesomeIcon icon={faDoorOpen} className="submit_icon" />
          <p>Rejoindre</p>
        </button>

        {message && (
          <div className="form-group">
            <div
              className="alert alert-danger"
              role="alert"
            >
              {message}
            </div>
          </div>
        )}

        {errors && (
          <div className="error-container">
            {errors.roomID && <span className="error">* Vous devez entrer un ID</span>}
          </div>
        )}
      </form>
    </div>
  );
}
