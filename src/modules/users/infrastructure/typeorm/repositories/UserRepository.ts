import { Repository } from "typeorm";
import { dataSource } from "../../../../../shared/infrastructure/database/typeorm";
import { ICreateUser } from "../../../domain/dtos/ICreateUser.dto";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserRole } from "../../../domain/user.enums";
import { Admin } from "../entities/Admin";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;
  private adminRepository: Repository<Admin>;

  constructor() {
    this.userRepository = dataSource.getRepository(User);
    this.adminRepository = dataSource.getRepository(Admin);
  }

  async findById(userId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async findByEmailAndRole(
    email: string,
    role: UserRole
  ): Promise<User | null> {
    return this.userRepository.findOne({ where: { email: email, role: role } });
  }

  async findByIdAndRole(userId: string, role: UserRole): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: userId, active: true, role },
    });
  }

  async createUserAdmin(data: ICreateUser) {
    const user = this.userRepository.create({
      ...data,
      role: UserRole.admin,
    });
    await this.userRepository.save(user);

    const admin = this.adminRepository.create({ user });
    await this.adminRepository.save(admin);

    return user;
  }
}
