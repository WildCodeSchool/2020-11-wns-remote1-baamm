import { Request, Response, Router } from 'express';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authRoute = Router();
authRoute.post('/register', async (req: Request, res: Response) => {

  // * Check if User is already in database
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('Email already exist')

  // * Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // * Create New User 
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

authRoute.post('/login', async (req: Request, res: Response) => {

  // * Check if email exist
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send('Email is wrong !');

  // * Check Password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Password is wrong !');

  // * Create and assign token
  // TODO Faire le token proprement
  process.env.TOKEN_SECRET = 'prout';
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET!);
  res.send(token)
});

export default authRoute;
