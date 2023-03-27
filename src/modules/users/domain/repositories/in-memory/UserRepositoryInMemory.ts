import crypto from "node:crypto";

import { UserRole } from "../../user.enums";
import { ICreateUser } from "../../dtos/ICreateUser.dto";
import { IUserRepository } from "../IUserRepository";
import { User } from "../../../infrastructure/typeorm/entities/User";
import { Admin } from "../../../infrastructure/typeorm/entities/Admin";

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];
  private admins: Admin[] = [];

  async findById(userId: string): Promise<User | null> {
    return this.users.find((user) => user.id === userId) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async findByEmailAndRole(
    email: string,
    role: UserRole
  ): Promise<User | null> {
    return (
      this.users.find(
        (user) => user.email === email && user.role === role && user.active
      ) ?? null
    );
  }

  async findByIdAndRole(userId: string, role: UserRole): Promise<User | null> {
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
      role: UserRole.admin,
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
