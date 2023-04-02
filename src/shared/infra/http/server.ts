import "dotenv/config";
import { sequelizeInstance } from "../database/sequelize";
import { logger } from "../utils/logger.utils";
import app from "./app";

const PORT = process.env.PORT || 4000;

sequelizeInstance()
  .authenticate()
  .then(() => {
    logger.info("Database connection has been established successfully.");

    sequelizeInstance()
      .sync()
      .then(async () =>
        app.listen(PORT, () => logger.info(`Server running on port ${PORT}`))
      );
  })
  .catch((error: Error) => {
    logger.error("Unable to connect to the database:", error);
    process.exit(1);
  });
