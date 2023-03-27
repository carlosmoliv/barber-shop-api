import { DataSource } from "typeorm";
import { Admin } from "../../../../modules/users/infrastructure/typeorm/entities/Admin";
import { Client } from "../../../../modules/users/infrastructure/typeorm/entities/Client";
import { User } from "../../../../modules/users/infrastructure/typeorm/entities/User";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: "barber-shop-api",
  synchronize: true,
  logging: false,
  entities: [User, Admin, Client],
  subscribers: [],
  migrations: [],
});
