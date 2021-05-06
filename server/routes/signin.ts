import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/users/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // * Check if email exist
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).send('Email is wrong !');
  }

  // * Check Password is correct
  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) {
    return res.status(400).send('Password is wrong !');
  }

  // * Generate JWT

  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email
    },
    process.env.JWT_KEY!
  );

  // * Store JWT on session ?

  // req.session = {
  //   jwt: userJwt
  // };

  res.status(200).send(existingUser);
});

export { router as signinRouter };