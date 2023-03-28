import { inject, injectable } from "tsyringe";
import { hashPassword } from "../../../../shared/infrastructure/utils/bcrypt.utils";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

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
    return this.userRepository.createUser({
      ...data,
      password: await hashPassword(data.password),
    });
  }
}
