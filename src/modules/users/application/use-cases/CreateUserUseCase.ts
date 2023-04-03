import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { hashPassword } from "@shared/infra/utils/bcrypt.utils";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";

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

  async execute(data: ICreateUserRequest) {
    const { email, password } = data;

    const user = await this.userRepository.findByEmail(email);

    if (user)
      throw new AppError(
        "UserConflictError",
        "User already exists with the provided email address.",
        409
      );

    return this.userRepository.create({
      ...data,
      password: await hashPassword(password),
    });
  }
}
