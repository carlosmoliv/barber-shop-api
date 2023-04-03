import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRole } from "@modules/users/domain/user.enums";
import { Appointment } from "@modules/appointments/infra/typeorm/entities/Appointment";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
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
}
