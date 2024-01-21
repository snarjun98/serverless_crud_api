import { StatusCodes } from "http-status-codes";
import { lambdaMiddleware } from "../../../middleware/middy";
import { CustomAPIGatewayProxyEventHandler } from "../../../middleware/middy-type";
import { awsLambdaResponse } from "../../../middleware/responses/response";
import { getNotesEventSchema } from "./event/req-validation-schema";
import { getNotes } from "../../../db/controller/notes-controller";

/**
 * Handles AWS Lambda events to retrieve list of notes based on userId.
 *
 * @function lambdaHandler
 * @async
 * @param {object} event - The AWS Lambda event object.
 * @returns {Promise<object>} A promise that resolves with the AWS Lambda response object.
 */
const lambdaHandler: CustomAPIGatewayProxyEventHandler<never> = async (
  event,
) => {
  const { Items, LastEvaluatedKey } = await getNotes(
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    event.queryStringParameters?.userId!,
    event.queryStringParameters?.nextToken,
  );

  return awsLambdaResponse(StatusCodes.OK, { data: Items, LastEvaluatedKey });
};

/**
 * AWS Lambda function handler with middleware.
 *
 * @function handler
 * @type {CustomAPIGatewayProxyEventHandler<never>}
 */
export const handler = lambdaMiddleware(lambdaHandler, {
  requestSchema: getNotesEventSchema,
});
