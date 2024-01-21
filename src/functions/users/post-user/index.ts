import { StatusCodes } from "http-status-codes";
import { lambdaMiddleware } from "../../../middleware/middy";
import { CustomAPIGatewayProxyEventHandler } from "../../../middleware/middy-type";
import { awsLambdaResponse } from "../../../middleware/responses/response";
import {
  userEventSchema,
  userEventBodyType,
} from "./event/req-validation-schema";
import { addUser, getUsers } from "../../../db/controller/users-controller";

/**
 * Handles AWS Lambda events to add user.
 *
 * @function lambdaHandler
 * @async
 * @param {object} event - The AWS Lambda event object.
 * @returns {Promise<object>} A promise that resolves with the AWS Lambda response object.
 */
const lambdaHandler: CustomAPIGatewayProxyEventHandler<
  userEventBodyType
> = async (event) => {
  await addUser(event.body);
  return awsLambdaResponse(StatusCodes.OK, { message: "user created" });
};

/**
 * AWS Lambda function handler with middleware.
 *
 * @function handler
 * @type {CustomAPIGatewayProxyEventHandler<never>}
 */
export const handler = lambdaMiddleware(lambdaHandler, {
  requestSchema: userEventSchema,
});
