import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { logger } from "../../../../../shared/infra/utils/logger.utils";
import { CreateUserUseCase } from "../../../application/use-cases/CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const createUserUseCase = container.resolve(CreateUserUseCase);

      const user = await createUserUseCase.execute(req.body);
      return res.status(200).json(user);
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  }
}
