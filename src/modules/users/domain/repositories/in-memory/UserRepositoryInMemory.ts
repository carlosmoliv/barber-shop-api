import crypto from "node:crypto";

import { Role } from "../../user.enums";
import { User } from "../../../infrastructure/mongo/models/User";
import { Admin } from "../../../infrastructure/mongo/models/Admin";
import { ICreateUser } from "../../dtos/ICreateUser.dto";
import { IUserRepository } from "../IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];
  private admins: Admin[] = [];

  async findByEmailAndRole(email: string, role: Role): Promise<User | null> {
    return (
      this.users.find(
        (user) => user.email === email && user.role === role && user.active
      ) ?? null
    );
  }

  async findByIdAndRole(userId: string, role: Role): Promise<User | null> {
    return (
      this.users.find(
        (user) => user.id === userId && user.role === role && user.active
      ) ?? null
    );
  }

  async createUserAdmin(data: ICreateUser) {
    const userId = crypto.randomUUID();
    const adminId = crypto.randomUUID();

    const user = new User();
    const admin = new Admin();

    Object.assign(user, {
      ...data,
      active: true,
      role: Role.admin,
      admin: adminId,
    });

    this.users.push(user);

    Object.assign(admin, {
      _id: adminId,
      userId: userId,
    });

    this.admins.push(admin);

    return user;
  }
}
