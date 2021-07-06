import express, { Request, Response, NextFunction } from 'express';
import controller from "../controllers/room.controller";

const router = express.Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/api/room/all", controller.allRooms);

router.post("/api/room/create", controller.createRoom);

export { router as roomRouter }