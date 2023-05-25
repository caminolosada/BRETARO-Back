import "./loadEnvironment.js";
import createDebug from "debug";
import chalk from "chalk";
import { app } from "./server/index.js";

const debug = createDebug("bretaro-api:root");

debug(chalk.greenBright("testing debug"));

const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  debug(chalk.greenBright(`Connected to port ${port}`));
});
