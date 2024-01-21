import httpErrorHandler from "@middy/http-error-handler";
import { httpErrorHandlerOptions } from "../config/http-error-handler.config";

export const httpErrorHandlerConfigured = httpErrorHandler(
  httpErrorHandlerOptions,
);
