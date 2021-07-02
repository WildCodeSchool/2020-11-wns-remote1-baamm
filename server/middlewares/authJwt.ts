import { RequestHandler } from 'express';
import jwt from "jsonwebtoken";
import config from "../config/auth.config";
import User from '../models/user.model';
import Role from '../models/role.model';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const verifyToken: RequestHandler = (req, res, next) => {
  let token = req.headers["x-access-token"] as string;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  const payload = jwt.verify(token, config.secret) as { id: string }
  req.userId = payload.id
  next();
};

const isAdmin: RequestHandler = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      res.status(500).send({ message: 'User not found' });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

const isModerator: RequestHandler = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      res.status(500).send({ message: 'User not found' });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};

export default authJwt;