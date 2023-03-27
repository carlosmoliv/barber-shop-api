import { container } from "tsyringe";
import { IUserRepository } from "../../modules/users/domain/repositories/IUserRepository";
import { UserRepository } from "../../modules/users/infrastructure/typeorm/repositories/UserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
