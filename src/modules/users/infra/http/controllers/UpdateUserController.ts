import { container } from "tsyringe";
import { logger } from "@typegoose/typegoose/lib/logSettings";
import { NextFunction, Request, Response } from "express";
import { UpdateUserUseCase } from "@modules/users/application/use-cases/UpdateUserUseCase";

export class UpdateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const updateUserUseCase = container.resolve(UpdateUserUseCase);
      const user = await updateUserUseCase.execute(req.body);

      return res.status(200).json(user);
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  }
}
