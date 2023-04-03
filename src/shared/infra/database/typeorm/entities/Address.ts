import { Column, JoinColumn, OneToOne } from "typeorm";
import { User } from "@modules/users/infra/typeorm/entities/User";

export class Address {
  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  zipCode: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
