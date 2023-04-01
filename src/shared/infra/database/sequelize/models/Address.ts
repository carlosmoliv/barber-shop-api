import { Column, ForeignKey, Table } from "sequelize-typescript";
import { OneToOne } from "typeorm";
import { User } from "../../../../../modules/users/infra/sequelize/models/User";
import { BaseModel } from "./BaseModel";

@Table({ timestamps: false, tableName: "addresses" })
export class Address extends BaseModel {
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

  @OneToOne(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column
  userId: string;
}
