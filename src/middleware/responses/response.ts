import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/app.error";
import { HttpError } from "../errors/http.error";
import { APIGatewayProxyResult } from "aws-lambda";

/**
 * Generates an AWS Lambda API Gateway Proxy response object.
 * @function awsLambdaResponse
 * @param {number} statusCode - The HTTP status code for the response.
 * @param {any} [body] - The response body data (optional).
 * @returns {APIGatewayProxyResult} - The API Gateway Proxy result object.
 */
export const awsLambdaResponse = (
  statusCode: number,
  body: string,
): APIGatewayProxyResult => {
  return {
    isBase64Encoded: false,
    statusCode,
    body: body ? JSON.stringify(body) : body,
  };
};

/**
 * Creates an error response based on the provided error object.
 * @function createErrorResponse
 * @param {any} error - The error object to generate a response for.
 * @returns {APIGatewayProxyResult} - The API Gateway Proxy result object representing the error response.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createErrorResponse = (error: any): APIGatewayProxyResult => {
  if (error instanceof HttpError) {
    return awsLambdaResponse(error.status, error.message);
  }

  if (error instanceof AppError) {
    return awsLambdaResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }

  return awsLambdaResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Unknown error");
};
