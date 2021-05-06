import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export default function (req: Request, res: Response, next: NextFunction) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied !!!');
    console.log(token);

    try {
      // TODO Faire le token proprement
        process.env.TOKEN_SECRET = 'prout';
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        // req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}