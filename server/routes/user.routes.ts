import express, { Request, Response, NextFunction } from 'express';
import authJwt from "../middlewares/authJwt";
import controller from "../controllers/user.controller";

const router = express.Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/api/test/all", controller.allAccess);

router.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

router.get(
  "/api/test/mod",
  [authJwt.verifyToken],
  controller.moderatorBoard
);

router.get(
  "/api/test/admin",
  [authJwt.verifyToken],
  controller.adminBoard
);

export { router as userRouter }