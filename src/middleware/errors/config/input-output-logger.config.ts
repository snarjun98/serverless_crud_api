import { logger } from "../../logger/logger";

const _logger = logger("INFO", "input-output-function-log");
export const loggerOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logger: (request: any) => {
    const log = request.event ?? request.response;
    _logger.info(log);
  },
};
