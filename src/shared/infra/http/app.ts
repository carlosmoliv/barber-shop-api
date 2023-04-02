import "reflect-metadata";
import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";

import "../container";
import api from "./routes";
import { expressLogger } from "../utils/logger.utils";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import swaggerDocs from "../../../swagger.json";

const app: express.Application = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// app.use(expressLogger);
app.use("/v1", api);
app.use(errorHandler);

// export default () => connection().sync().then(configureExpress);

export default app;
