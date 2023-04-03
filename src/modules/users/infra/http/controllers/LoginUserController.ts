import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { logger } from "@shared/infra/utils/logger.utils";
import { LogInUserUseCase } from "@modules/users/application/use-cases/LogInUserUseCase";

export class LoginUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const loginUserUseCase = container.resolve(LogInUserUseCase);
      const user = await loginUserUseCase.execute(req.body);

      return res.status(200).json(user);
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  }
}
