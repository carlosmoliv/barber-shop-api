import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { logger } from "../../../../../shared/infrastructure/utils/logger.utils";
import { LogInUserUseCase } from "../../../application/use-cases/LogInUserUseCase";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { Role } from "../../../domain/user.enums";

export class LoginUserByRoleController {
  async handle(req: Request, res: Response, next: NextFunction, role: Role) {
    try {
      const loginUserUseCase = container.resolve(LogInUserUseCase);
      const user = await loginUserUseCase.execute(req.body, role);

      return res.status(200).json(user);
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  }
}
