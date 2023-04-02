import { User } from "../../infra/sequelize/models/User";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

export interface IUserRepository {
  findById(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
