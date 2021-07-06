import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/room/`;

const getAllRooms = () => axios.get(`${API_URL}all`);

const createRoom = async (name: String, type: String, session: String) => axios
  .post(`${API_URL}create`, {
    name,
    type,
    session,
  })
  .then((response) => response.data);

const joinRoom = async (roomName: String) => axios
  .post(`${API_URL}join`, { roomName })
  .then((response) => response.data);

const RoomService = {
  getAllRooms,
  createRoom,
  joinRoom,
};

export default RoomService;
