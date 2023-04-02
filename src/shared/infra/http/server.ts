import "dotenv/config";
import { dataSource } from "../database/typeorm";
import { logger } from "../utils/logger.utils";
import app from "./app";

const PORT = process.env.PORT || 4000;

dataSource
  .initialize()
  .then(() => {
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  });
