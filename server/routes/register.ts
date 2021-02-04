import { Router, Request, Response } from 'express';
const User = require('../models/User');
const userRouter = Router()
const connexion = require('../conf');

userRouter.post('/register', async (req: Request,res: Response) => { 
   // Create New User 
  const user = new User({
     name: req.body.name,
     email: req.body.email,
     password: req.body.password 
   });
   try {
       const savedUser = await user.save();
       res.status(201).send(savedUser);
   } catch (err) {
       res.status(400).send(err);
   } 
});

export default userRouter;