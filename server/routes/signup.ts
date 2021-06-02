import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/users/signup', async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  // * Check if User is already in database
  const emailExist = await User.findOne({ email })

  if (emailExist) {
    return res.status(400).send('Email already exist')
  }

  // * Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // * Create New User 
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    role: 'student',
  });
  await user.save();

  // * Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_KEY!
  );

  console.log(userJwt);

  // * Store the jwt on session ?

  // req.session = {
  //   jwt: userJwt
  // };

  res.status(201).send(user);
});

export { router as signupRouter };
