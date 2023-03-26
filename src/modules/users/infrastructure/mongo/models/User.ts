import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref,
} from "@typegoose/typegoose";

import { Admin } from "./Admin";
import { Role } from "../../../domain/user.enums";
import { BaseModel } from "../../../../../shared/infrastructure/database/mongo/BaseModel";

@modelOptions({ schemaOptions: { timestamps: true } })
export class User extends BaseModel {
  token?: string;

  @prop({ unique: true })
  email!: string;

  @prop({ select: false })
  password!: string;

  @prop()
  name!: string;

  @prop({ default: true })
  active!: boolean;

  @prop({ default: Role.student })
  role!: Role;

  @prop({ ref: () => Admin })
  admin?: Ref<Admin>;
}
