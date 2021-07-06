import { Request, Response } from 'express';
import config from "../config/auth.config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from '../models/user.model';


const signup = (req: Request, res: Response) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role,
  });

  user.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "User was registered successfully!" });
  });
};

const signin = (req: Request, res: Response) => {
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        fullname: `${user.firstname} ${user.lastname}`,
        role: user.role,
        accessToken: token
      });
    });
};

const AuthController = {
  signin,
  signup
}
export default AuthController;

