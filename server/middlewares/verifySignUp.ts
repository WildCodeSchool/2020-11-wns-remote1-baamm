import { RequestHandler } from 'express';
import User from '../models/user.model'

const allRoles = ["admin", "moderator", "student", "teacher"];

const checkDuplicateEmail :RequestHandler = (req, res, next) => {
  // Email
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail
};

export default verifySignUp;