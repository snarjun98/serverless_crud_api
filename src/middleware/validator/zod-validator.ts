import { MiddlewareObj } from "@middy/core";
import { ZodTypeAny } from "zod";
import { HttpError } from "../errors/http.error";
import { StatusCodes } from "http-status-codes";

/**
 * Validates incoming request data using a Zod schema.
 * @function zodValidator
 * @template T - The Zod schema type.
 * @param {T} schema - The Zod schema to validate against.
 * @returns {Required<Pick<MiddlewareObj<any, any>, "before">>} - Middleware function for request validation.
 * @throws {HttpError} - Throws an HTTP error with a BAD_REQUEST status code if validation fails.
 */
export const zodValidator = <T extends ZodTypeAny>(
  schema: T,
): Required<Pick<MiddlewareObj<any, any>, "before">> => ({
  before: async (request) => {
    if (!schema) return;

    const { event } = request;
    const parserResult = schema.safeParse(event);

    if (!parserResult.success) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      throw new HttpError(parserResult.error.issues, StatusCodes.BAD_REQUEST);
    }

    event.body = parserResult.data?.body ?? event.body;
    event.queryStringParameters =
      parserResult.data?.queryStringParameters ?? event.queryStringParameters;
    event.headers = parserResult.data?.headers ?? event.headers;
  },
});
