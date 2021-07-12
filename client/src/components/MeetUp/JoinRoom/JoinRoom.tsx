/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import RoomService from '../../../services/room.services';

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
    <div>
      <form onSubmit={handleSubmit(joinRoom)}>
        <div>
          <div className="form-group">
            <input placeholder="RoomID" {...register('roomID', { required: true })} />
            {errors.roomID && <span>This field is required</span>}
          </div>
          <div>
            <input type="submit" value="Rejoindre" />
          </div>
        </div>

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
      </form>
    </div>
  );
}
