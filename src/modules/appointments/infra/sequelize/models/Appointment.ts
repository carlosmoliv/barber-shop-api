import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { BaseModel } from "../../../../../shared/infra/database/sequelize/models/BaseModel";
import { User } from "../../../../users/infra/sequelize/models/User";

@Table({ timestamps: true, tableName: "appointments" })
export class Appointment extends BaseModel {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updateAt: Date;
}
