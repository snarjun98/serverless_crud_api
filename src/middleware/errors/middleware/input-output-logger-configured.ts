import inputOutputLogger from "@middy/input-output-logger";
import { loggerOptions } from "../config/input-output-logger.config";

export const inputOutputLoggerConfigured = () =>
  inputOutputLogger(loggerOptions);
