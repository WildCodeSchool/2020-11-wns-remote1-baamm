import express from 'express';
import mongoose from 'mongoose';
import registerRoute from './register';

const router = express.Router();

router.use("/user", registerRoute);

export default router;
