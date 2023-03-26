import { getModelForClass } from "@typegoose/typegoose";

import { Admin } from "./users/infrastructure/mongo/models/Admin";
import { User } from "./users/infrastructure/mongo/models/User";

const userModel = getModelForClass(User);
const adminModel = getModelForClass(Admin);

export { userModel, adminModel };
