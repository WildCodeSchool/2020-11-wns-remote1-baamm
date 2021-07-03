import { RequestHandler } from 'express';

const allAccess :RequestHandler = (req, res) => {
  res.status(200).send("Public Content.");
};

const userBoard :RequestHandler = (req, res) => {
  res.status(200).send("User Content.");
};

const adminBoard :RequestHandler = (req, res) => {
  res.status(200).send("Admin Content.");
};

const moderatorBoard :RequestHandler = (req, res) => {
  res.status(200).send("Moderator Content.");
};

const UserController = {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard
}

export default UserController;