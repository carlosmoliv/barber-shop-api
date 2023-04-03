import { DataSource } from "typeorm";
import { Appointment } from "@modules/appointments/infra/typeorm/entities/Appointment";
import { User } from "@modules/users/infra/typeorm/entities/User";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "barber-shop-api",
  synchronize: true,
  logging: false,
  entities: [User, Appointment],
  subscribers: [],
  migrations: [],
});
