import { StatusCodes } from "http-status-codes";
import { lambdaMiddleware } from "../../../../middleware/middy";
import { CustomAPIGatewayProxyEventHandler } from "../../../../middleware/middy-type";
import { awsLambdaResponse } from "../../../../middleware/responses/response";
import { getUserEventSchema } from "./event/req-validation-schema";
import { getUser } from "../../../../db/controller/users-controller";

/**
 * Handles AWS Lambda events to get user data..
 *
 * @function lambdaHandler
 * @async
 * @param {object} event - The AWS Lambda event object.
 * @returns {Promise<object>} A promise that resolves with the AWS Lambda response object.
 */
const lambdaHandler: CustomAPIGatewayProxyEventHandler<never> = async (
  event,
) => {
  const userId = event.pathParameters.userId!;
  const { Item } = await getUser(userId);
  return awsLambdaResponse(StatusCodes.OK, { data: Item });
};

/**
 * AWS Lambda function handler with middleware.
 *
 * @function handler
 * @type {CustomAPIGatewayProxyEventHandler<never>}
 */
export const handler = lambdaMiddleware(lambdaHandler, {
  requestSchema: getUserEventSchema,
});
