import crypto from "node:crypto";

import { UserRole } from "../../user.enums";
import { ICreateUser } from "../../dtos/ICreateUser.dto";
import { IUserRepository } from "../IUserRepository";
import { User } from "../../../infrastructure/typeorm/entities/User";

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async findById(userId: string): Promise<User | null> {
    return this.users.find((user) => user.id === userId) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async createUser(data: ICreateUser) {
    const userId = crypto.randomUUID();
    const user = new User();

    Object.assign(user, {
      ...data,
      active: true,
    });

    this.users.push(user);
    return user;
  }
}
