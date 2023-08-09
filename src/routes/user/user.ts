import { Router } from "express";
import { users } from "../../server/controller";
import auth from "../../server/middleware/auth";
import validate from "../../server/middleware/validator";
import { LOGIN, SIGNUP } from "../../validators";


const userRouter = Router();

userRouter.post("/sign_up", validate(SIGNUP), users.signup);

userRouter.post("/log_in", validate(LOGIN), auth.UserAuth, users.login);

export default userRouter;
