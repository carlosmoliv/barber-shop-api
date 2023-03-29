import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRole } from "../../../domain/user.enums";
import { v4 as uuidV4 } from "uuid";
import { Appointment } from "../../../../appointments/infra/typeorm/entities/Appointment";

@Entity("users")
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({})
  password: string;

  token: string;

  @Column({ default: true })
  active: boolean;

  @Column({ type: "enum", enum: UserRole, default: UserRole.client })
  role: UserRole;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  constructor() {
    if (!this.id) this.id = uuidV4();
  }
}
