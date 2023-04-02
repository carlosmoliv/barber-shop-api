import { DataTypes } from "sequelize";
import {
  Table,
  Column,
  Default,
  HasMany,
  HasOne,
  DataType,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
} from "sequelize-typescript";
import { v4 as uuidV4 } from "uuid";
import { Address } from "../../../../../shared/infra/database/sequelize/models/Address";
import { Appointment } from "../../../../appointments/infra/sequelize/models/Appointment";
import { UserRole } from "../../../domain/user.enums";

@Table({ timestamps: true, tableName: "users" })
export class User extends Model {
  @PrimaryKey
  @Column({
    defaultValue: () => uuidV4(),
    type: DataTypes.UUID,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Default(true)
  @Column
  active: boolean;

  token: string;

  @Default(UserRole.client)
  @Column(DataType.ENUM({ values: Object.values(UserRole) }))
  role: UserRole;

  @HasOne(() => Address)
  address: Address;

  @HasMany(() => Appointment)
  appointments: Appointment[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updateAt: Date;
}
