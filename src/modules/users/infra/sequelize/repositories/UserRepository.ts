import { User } from "../models/User";
import { Repository } from "sequelize-typescript";
import { ICreateUserDTO } from "../../../domain/dtos/ICreateUserDTO";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { sequelizeInstance } from "../../../../../shared/infra/database/sequelize";

export class UserRepository implements IUserRepository {
  // private ormRepository: Repository<User>;

  // constructor() {
  //   const sequelize = sequelizeInstance();
  //   this.ormRepository = sequelize.getRepository(User);
  // }

  async findById(userId: string): Promise<User | null> {
    return User.findOne({ where: { id: userId } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email: email } });
  }

  async create(data: ICreateUserDTO) {
    const { name, email, password } = data;

    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });

    return user;
  }

  async save(user: User) {
    return user.save();
  }
}
