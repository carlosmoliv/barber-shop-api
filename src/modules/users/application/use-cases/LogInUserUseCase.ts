import { inject, injectable } from "tsyringe";

import { comparePasswords } from "../../../../shared/infra/utils/bcrypt.utils";
import { AppError } from "../../../../shared/errors/AppError";
import { createToken } from "../../../../shared/infra/utils/jwt.utils";

import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { ILoginUserByEmail } from "../../domain/dtos/ILoginUserByEmail.dto";

@injectable()
export class LogInUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(data: ILoginUserByEmail) {
    const { email, password } = data;

    const user = await this.userRepository.findByEmail(email);

    if (!user)
      throw new AppError("AuthenticationError", "Invalid credentials.", 401);

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid)
      throw new AppError("AuthenticationError", "Invalid credentials.", 401);

    const token = createToken({ userId: user.id });
    user.token = token;

    return {
      user: {
        email: user.email,
        name: user.name,
      },
      token: token,
    };
  }
}
