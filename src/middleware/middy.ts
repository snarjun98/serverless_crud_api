import { injectLambdaContext } from "@aws-lambda-powertools/logger";
import middy from "@middy/core";
import httpJsonBodyParserMiddleware from "@middy/http-json-body-parser";
import httpSecurityHeaders from "@middy/http-security-headers";
import { httpErrorHandlerConfigured } from "./errors/middleware/http-error-handler-configured";
import { inputOutputLoggerConfigured } from "./errors/middleware/input-output-logger-configured";
import { Context, Callback } from "aws-lambda";
import { ZodType, ZodTypeDef } from "zod";
import { logger } from "./logger/logger";
import { zodValidator } from "./validator/zod-validator";
import cors, { Options } from "@middy/http-cors";

/**
 * Middleware function for AWS Lambda handlers.
 * Handles request validation, input-output logging, JSON body parsing, error handling, and CORS configuration.
 * @param {Function} handler - The original Lambda handler function.
 * @param {Object} options - Additional configuration options.
 * @param {ZodType<unknown, ZodTypeDef, unknown>} options.requestSchema - Validation schema for incoming requests.
 * @param {Options} options.corsOption - Configuration options for enabling CORS.
 * @returns {middy.Middy} - Enhanced middleware for the Lambda handler.
 */
export function lambdaMiddleware(
  handler: (
    event: any,
    context: Context,
    callback: Callback<any>,
  ) => void | Promise<any>,
  options?: {
    requestSchema?: ZodType<unknown, ZodTypeDef, unknown>;
    corsOption?: Options;
  },
) {
  // Create a logger instance for logging information
  const _logger = logger("INFO", "function");

  // Create a Middy middleware instance
  const innerHandler = middy()
    .use(inputOutputLoggerConfigured())
    .use(httpJsonBodyParserMiddleware({ disableContentTypeError: true }))
    .use(httpSecurityHeaders())
    .use(injectLambdaContext(_logger, { logEvent: true, clearState: true }))
    .use(httpErrorHandlerConfigured)
    .use(cors(options?.corsOption))
    .handler(handler);

  // Add request schema validation if provided in options
  if (options?.requestSchema) {
    innerHandler.use(zodValidator(options.requestSchema));
  }

  // Return the configured middleware for the Lambda handler
  return innerHandler;
}
