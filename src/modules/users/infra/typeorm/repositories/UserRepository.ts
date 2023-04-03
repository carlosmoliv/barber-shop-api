import { Repository } from "typeorm";
import { dataSource } from "@shared/infra/database/typeorm";
import { ICreateUserDTO } from "@modules/users/domain/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import { User } from "@modules/users/infra/typeorm/entities/User";

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  async findById(userId: string): Promise<User | null> {
    return this.ormRepository.findOne({ where: { id: userId } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.ormRepository.findOne({ where: { email: email } });
  }

  async create(data: ICreateUserDTO) {
    const user = this.ormRepository.create({
      ...data,
    });

    await this.ormRepository.save(user);
    return user;
  }

  async save(user: User) {
    return this.ormRepository.save(user);
  }
}
