import express, { Router } from "express";
import usersRouter from "./users.routes";

const api: Router = express.Router();

api.use("/users", usersRouter);

export default api;
