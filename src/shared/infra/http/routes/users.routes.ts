import express, { NextFunction, Request, Response, Router } from "express";
import { validator } from "../middlewares/validator.middleware";
import { createUserSchema } from "../../../../modules/users/domain/user.validations";
import { CreateUserController } from "../../../../modules/users/infra/http/controllers/CreateUserController";
import { LoginUserController } from "../../../../modules/users/infra/http/controllers/LoginUserController";

const usersRouter: Router = express.Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();

usersRouter.post("/login", (req: Request, res: Response, next: NextFunction) =>
  loginUserController.handle(req, res, next)
);

usersRouter.post(
  "/register",
  validator(createUserSchema),
  (req: Request, res: Response, next: NextFunction) =>
    createUserController.handle(req, res, next)
);

export default usersRouter;
