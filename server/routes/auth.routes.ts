import express, { Response, Request, NextFunction } from 'express';
import verifySignUp from "../middlewares/verifySignUp";
import controller from "../controllers/auth.controller";

const router = express.Router();

router.use(function (req: Request, res: Response, next: NextFunction) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/api/auth/signup",
  [
    verifySignUp.checkDuplicateEmail,
    verifySignUp.checkRolesExisted
  ],
  controller.signup
);

router.post("/api/auth/signin", controller.signin);

export { router as authRouter};

// module.exports = function(app) {
//   app.use(function (req :Request, res :Response, next :NextFunction) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   app.post(
//     "/api/auth/signup",
//     [
//       verifySignUp.checkDuplicateEmail,
//       verifySignUp.checkRolesExisted
//     ],
//     controller.signup
//   );

//   app.post("/api/auth/signin", controller.signin);
// };