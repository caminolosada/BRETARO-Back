import "./loadEnvironment.js";
import createDebug from "debug";
import chalk from "chalk";
import { app } from "./server/index.js";
import connectToDataBase from "./database/connectToDataBase.js";

const debug = createDebug("bretaro-api:root");

debug(chalk.greenBright("testing debug"));

const port = process.env.PORT ?? 4000;
const mongoDbConnection = process.env.MONGODB_CONNECTION;

if (!mongoDbConnection) {
  debug(chalk.red("Missing environmen variables"));
  process.exit(1);
}

app.listen(port, () => {
  debug(chalk.greenBright(`Connected to port ${port}`));
});

try {
  await connectToDataBase(mongoDbConnection);
  debug(chalk.greenBright("Connected to database"));
} catch (error: unknown) {
  debug(
    `Error conecting to database: ${chalk.redBright((error as Error).message)}`
  );
}
