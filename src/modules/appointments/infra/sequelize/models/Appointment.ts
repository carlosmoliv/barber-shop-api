import { DataTypes } from "sequelize";
import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { v4 as uuidV4 } from "uuid";
import { User } from "../../../../users/infra/sequelize/models/User";

@Table({ timestamps: true, tableName: "appointments" })
export class Appointment extends Model {
  @PrimaryKey
  @Column({
    defaultValue: () => uuidV4(),
    type: DataTypes.UUID,
  })
  id: string;

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
