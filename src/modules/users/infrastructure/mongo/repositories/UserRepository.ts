import mongoose from "mongoose";
import { adminModel, userModel } from "../../../../models";
import { ICreateUser } from "../../../domain/dtos/ICreateUser.dto";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { Role } from "../../../domain/user.enums";
import { User } from "../models/User";

export class UserRepository implements IUserRepository {
  async findByEmailAndRole(email: string, role: Role): Promise<User | null> {
    return userModel.findOne({ email, active: true, role }).select("+password");
  }

  async findByIdAndRole(userId: string, role: Role): Promise<User | null> {
    return userModel.findOne({ _id: userId, active: true, role });
  }

  async createUserAdmin(data: ICreateUser) {
    const adminId = new mongoose.Types.ObjectId();

    return userModel
      .create({ ...data, role: Role.admin, admin: adminId })
      .then(async (user: User) => {
        if (user) {
          await adminModel.create({
            _id: adminId,
            user: user._id,
          });
        }

        return user;
      });
  }
}
