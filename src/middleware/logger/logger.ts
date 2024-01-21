import { Logger } from "@aws-lambda-powertools/logger";
import { LogLevel } from "@aws-lambda-powertools/logger/lib/types";

export const logger = (logLevel: LogLevel, serviceName: string) =>
  new Logger({
    logLevel,
    serviceName,
  });
