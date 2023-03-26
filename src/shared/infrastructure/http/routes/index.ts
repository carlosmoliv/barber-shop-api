import express, { Router } from "express";
import adminsRouter from "./admin.routes";

const api: Router = express.Router();

api.use("/admins", adminsRouter);

export default api;
