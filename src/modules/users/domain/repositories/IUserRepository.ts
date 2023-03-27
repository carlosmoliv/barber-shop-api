import { User } from "../../infrastructure/typeorm/entities/User";
import { ICreateUser } from "../dtos/ICreateUser.dto";
import { UserRole } from "../user.enums";

export interface IUserRepository {
  findById(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByIdAndRole(userId: string, role: UserRole): Promise<User | null>;
  findByEmailAndRole(email: string, role: UserRole): Promise<User | null>;
  createUserAdmin(data: ICreateUser): Promise<User>;
}
