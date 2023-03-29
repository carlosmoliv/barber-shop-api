import { inject, injectable } from "tsyringe";
import { UserNotFoundError } from "../../../../shared/errors/users/UserNotFoundError";
import { IUpdateUserDTO } from "../../domain/dtos/IUpdateUserDTO";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(data: IUpdateUserDTO) {
    const { userId, name, email } = data;

    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFoundError();

    user.name = name;

    return this.userRepository.save(user);
  }
}
