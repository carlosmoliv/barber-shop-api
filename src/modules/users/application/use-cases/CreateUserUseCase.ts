import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { hashPassword } from "../../../../shared/infrastructure/utils/bcrypt.utils";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserRole } from "../../domain/user.enums";

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(data: ICreateUserRequest, role: UserRole = UserRole.student) {
    switch (role) {
      case UserRole.admin:
        return this.userRepository.createUserAdmin({
          ...data,
          password: await hashPassword(data.password),
        });

      default:
        throw new AppError(
          "InvalidUserRoleError",
          "Invalid user role provided."
        );
    }
  }
}
