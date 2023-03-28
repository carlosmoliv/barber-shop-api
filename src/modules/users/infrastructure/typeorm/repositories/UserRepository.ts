import { Repository } from "typeorm";
import { dataSource } from "../../../../../shared/infrastructure/database/typeorm";
import { ICreateUser } from "../../../domain/dtos/ICreateUser.dto";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserRole } from "../../../domain/user.enums";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = dataSource.getRepository(User);
  }

  async findById(userId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async createUser(data: ICreateUser) {
    const user = this.userRepository.create({
      ...data,
    });

    await this.userRepository.save(user);
    return user;
  }
}
