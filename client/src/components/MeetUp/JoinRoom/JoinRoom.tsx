/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import RoomService from '../../../services/room.services';

export default function JoinRoom() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();

  function joinRoom(data: any) {
    RoomService.joinRoom(data.roomID).then(
      () => {
        history.push(`/room/${data.roomID}`);
        window.location.reload();
      },
      (error) => {
        console.log(error);
      },
    );
  }

  return (
    <div className="blocContainer">
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
      </form>
    </div>
  );
}
