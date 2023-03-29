import { inject, injectable } from "tsyringe";
import { EmailAlreadyExistsError } from "../../../../shared/errors/users/EmailAlreadyExistsError";
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

    const findUserWithEmail = await this.userRepository.findByEmail(email);
    if (findUserWithEmail && findUserWithEmail.id != userId)
      throw new EmailAlreadyExistsError();

    user.name = name;
    user.email = email;

    return this.userRepository.save(user);
  }
}
