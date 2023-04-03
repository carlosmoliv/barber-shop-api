import { Sequelize } from "sequelize-typescript";
import { Appointment } from "@modules/appointments/infra/sequelize/models/Appointment";
import { User } from "@modules/users/infra/sequelize/models/User";
import { Address } from "./models/Address";

export const sequelizeInstance = () => {
  const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    logging: false,
    models: [User, Address, Appointment],
  });

  return sequelize;
};
