import { logger } from "../../logger/logger";

const _logger = logger("ERROR", "error-in-function");

export const httpErrorHandlerOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logger: (error: any) => {
    const message = error.statusCode < 500 ? "HTTP ERROR:" : "INTERNAL ERROR:";
    _logger.error(message, error);
  },
  fallbackMessage: JSON.stringify({
    message: "Internal server error",
  }),
};
