/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RoomService from '../../../services/room.services';

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
    <div className="">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <div className="form-group">
            <input placeholder="Name" {...register('name', { required: true })} />
            {errors.name && <span>This field is required</span>}

            <input type="type" placeholder="Type" {...register('type', { required: true })} />
            {errors.type && <span>This field is required</span>}

            <input type="type" placeholder="Session" {...register('session', { required: true })} />
            {errors.session && <span>This field is required</span>}
          </div>
          <div>
            <input type="submit" value="Ajouter" />
          </div>
        </div>

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
      </form>
    </div>
  );
}
