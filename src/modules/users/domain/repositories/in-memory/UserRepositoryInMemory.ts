import crypto from "node:crypto";
import { IUserRepository } from "../IUserRepository";
import { ICreateUserDTO } from "@modules/users/domain/dtos/ICreateUserDTO";
import { User } from "@modules/users/infra/typeorm/entities/User";

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async findById(userId: string): Promise<User | null> {
    return this.users.find((user) => user.id === userId) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async create(data: ICreateUserDTO) {
    const userId = crypto.randomUUID();
    const user = new User();

    Object.assign(user, {
      ...data,
      id: userId,
      active: true,
    });

    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id
    );

    this.users[findIndex] = user;

    return user;
  }
}
