/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import RoomService from '../../../services/room.services';
import './CreateRoom.style.css';

export default function CreateRoom() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState('');

  function handleLogin(data: any) {
    setMessage('');

    RoomService.createRoom(data.name, data.type, data.session).then(
      (response) => {
        setMessage(response.data.message);
        setStatus(true);
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
    <div className="create-container">
      <h3>Créez une Room !</h3>
      <form onSubmit={handleSubmit(handleLogin)} className="form-container">
        <div className="inputs-container">
          <input placeholder="Name" {...register('name', { required: true })} />
          <input type="type" placeholder="Type" {...register('type', { required: true })} />
          <input type="type" placeholder="Session" {...register('session', { required: true })} />
        </div>
        <button type="submit" className="inputButton">
          <FontAwesomeIcon icon={faPlusCircle} className="submit_icon" />
          <p>Ajouter</p>
        </button>

        {message && (
          <div className="form-group">
            <div
              className={
                status
                  ? 'alert alert-success'
                  : 'alert alert-danger'
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}

        {errors && (
          <div className="error-container">
            {errors.name && <span className="error">* Un nom est requis</span>}
            {errors.type && <span className="error">* Un type est requis</span>}
            {errors.session && <span className="error">* Une session est requise</span>}
          </div>
        )}
      </form>
    </div>
  );
}
