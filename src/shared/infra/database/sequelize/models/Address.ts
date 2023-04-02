import { DataTypes } from "sequelize";
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as uuidV4 } from "uuid";
import { User } from "../../../../../modules/users/infra/sequelize/models/User";

@Table({ timestamps: false, tableName: "addresses" })
export class Address extends Model {
  @PrimaryKey
  @Column({
    defaultValue: () => uuidV4(),
    type: DataTypes.UUID,
  })
  id: string;

  @Column
  street: string;

  @Column
  number: number;

  @Column
  complement: string;

  @Column
  neighborhood: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  country: string;

  @Column
  zipCode: string;

  @ForeignKey(() => User)
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
