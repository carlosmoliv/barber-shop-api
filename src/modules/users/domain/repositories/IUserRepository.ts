import { User } from "../../infrastructure/typeorm/entities/User";
import { ICreateUser } from "../dtos/ICreateUser.dto";

export interface IUserRepository {
  findById(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  createUser(data: ICreateUser): Promise<User>;
}
