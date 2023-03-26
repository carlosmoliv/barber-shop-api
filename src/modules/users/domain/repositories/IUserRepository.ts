import { User } from "../../infrastructure/mongo/models/User";
import { ICreateUser } from "../dtos/ICreateUser.dto";
import { Role } from "../user.enums";

export interface IUserRepository {
  findByIdAndRole(userId: string, role: Role): Promise<User | null>;
  findByEmailAndRole(email: string, role: Role): Promise<User | null>;
  createUserAdmin(data: ICreateUser): Promise<User>;
}
