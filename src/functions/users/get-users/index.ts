import { StatusCodes } from "http-status-codes";
import { lambdaMiddleware } from "../../../middleware/middy";
import { CustomAPIGatewayProxyEventHandler } from "../../../middleware/middy-type";
import { awsLambdaResponse } from "../../../middleware/responses/response";
import { getUsersEventSchema } from "./event/req-validation-schema";
import { getUsers } from "../../../db/controller/users-controller";

/**
 * Handles AWS Lambda events to retrieve list of Users.
 *
 * @function lambdaHandler
 * @async
 * @param {object} event - The AWS Lambda event object.
 * @returns {Promise<object>} A promise that resolves with the AWS Lambda response object.
 */
const lambdaHandler: CustomAPIGatewayProxyEventHandler<never> = async (
  event,
) => {
  const { Items, LastEvaluatedKey } = await getUsers(
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
  requestSchema: getUsersEventSchema,
});
