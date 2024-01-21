import { StatusCodes } from "http-status-codes";
import { lambdaMiddleware } from "../../../../middleware/middy";
import { CustomAPIGatewayProxyEventHandler } from "../../../../middleware/middy-type";
import { awsLambdaResponse } from "../../../../middleware/responses/response";

import { getNote } from "../../../../db/controller/notes-controller";
import { getNoteEventSchema } from "./event/req-validation-schema";

/**
 * Handles AWS Lambda events to get a note .
 *
 * @function lambdaHandler
 * @async
 * @param {object} event - The AWS Lambda event object.
 * @returns {Promise<object>} A promise that resolves with the AWS Lambda response object.
 */
const lambdaHandler: CustomAPIGatewayProxyEventHandler<never> = async (
  event,
) => {
  const id = event.pathParameters.noteId!;
  const userId = event.queryStringParameters.userId!;
  const { Item } = await getNote(userId, id);
  return awsLambdaResponse(StatusCodes.OK, { data: Item });
};

/**
 * AWS Lambda function handler with middleware.
 *
 * @function handler
 * @type {CustomAPIGatewayProxyEventHandler<never>}
 */
export const handler = lambdaMiddleware(lambdaHandler, {
  requestSchema: getNoteEventSchema,
});
