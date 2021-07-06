import { RequestHandler } from 'express';
import jwt from "jsonwebtoken";
import config from "../config/auth.config";

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

const authJwt = {
  verifyToken,
};

export default authJwt;