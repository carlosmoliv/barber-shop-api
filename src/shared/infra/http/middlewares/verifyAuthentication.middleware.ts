import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { UserRole } from "@modules/users/domain/user.enums";
import { UserRepository } from "@modules/users/infra/typeorm/repositories/UserRepository";
import { verifyToken } from "@shared/infra/utils/jwt.utils";
import { logger } from "@shared/infra/utils/logger.utils";

export const verifyAuthentication =
  (allowedRoles: UserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    try {
      const token = authorization?.replace("Bearer ", "");
      if (!token)
        return res.status(401).json({
          name: "AuthorizationError",
          status: "error",
          message: "Token is missing.",
        });

      const decoded = verifyToken(token) as JwtPayload;

      const userRepository = new UserRepository();
      return userRepository.findById(decoded.userId).then((user) => {
        if (!user)
          return res.status(401).json({
            name: "AuthorizationError",
            status: "error",
            message:
              "Unauthorized request. The user associated with the provided authentication token was not found in the system.",
          });

        req.user = {
          id: user.id,
          role: user.role,
        };

        if (!allowedRoles.includes(user.role))
          return res.status(401).json({
            name: "AuthorizationError",
            status: "error",
            message:
              "Unauthorized request. User role is not authorized for this action.",
          });

        return next();
      });
    } catch (error) {
      logger.error(error);

      const errorMessage =
        error instanceof JsonWebTokenError ? "Invalid Token" : "Unauthorized";

      return res
        .status(401)
        .json({ name: "InvalidToken", status: "error", message: errorMessage });
    }
  };
