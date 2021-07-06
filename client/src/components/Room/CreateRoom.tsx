import React from 'react';
import { v1 as uuid } from 'uuid';

const CreateRoom = (props: any) => {
  function create() {
    const id = uuid();
    // eslint-disable-next-line react/prop-types
    props.history.push(`/room/${id}`);
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <button onClick={create}>Create room</button>
  );
};

export default CreateRoom;
