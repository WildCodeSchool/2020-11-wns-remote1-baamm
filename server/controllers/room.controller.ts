import { RequestHandler } from 'express';
import Room from '../models/room.model';

const allRooms :RequestHandler = async (req, res) => {
  const allRooms = await Room.find({});
  res.status(200).send(allRooms);
};

const createRoom :RequestHandler = (req, res) => {
  const room = new Room({
    name: req.body.name,
    type: req.body.type,
    session: req.body.session
  });

  room.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Room créée avec succès!" });
  });
};

const joinRoom :RequestHandler = (req, res) => {
  Room.findOne({
    name: req.body.roomName
  })
    .exec((err, room) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!room) {
        return res.status(404).send({ message: "Room introuvable" });
      }

      res.status(200).send({
        id: room._id,
      });
    });
};

const RoomController = {
  allRooms,
  createRoom,
  joinRoom,
}

export default RoomController;