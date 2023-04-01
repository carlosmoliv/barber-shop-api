import {
  Table,
  Column,
  Default,
  HasMany,
  HasOne,
  DataType,
} from "sequelize-typescript";
import { Address } from "../../../../../shared/infra/database/sequelize/models/Address";
import { BaseModel } from "../../../../../shared/infra/database/sequelize/models/BaseModel";
import { Appointment } from "../../../../appointments/infra/sequelize/models/Appointment";
import { UserRole } from "../../../domain/user.enums";

@Table({ timestamps: true, tableName: "users" })
export class User extends BaseModel {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Default(true)
  @Column
  active: boolean;

  @Default(UserRole.client)
  @Column(DataType.ENUM({ values: Object.values(UserRole) }))
  role: UserRole;

  @HasOne(() => Address)
  address: Address;

  @HasMany(() => Appointment)
  appointments: Appointment[];
}
