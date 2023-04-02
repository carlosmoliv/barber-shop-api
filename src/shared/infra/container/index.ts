import { container } from "tsyringe";
import { IUserRepository } from "../../../modules/users/domain/repositories/IUserRepository";
import { UserRepository } from "../../../modules/users/infra/sequelize/repositories/UserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
