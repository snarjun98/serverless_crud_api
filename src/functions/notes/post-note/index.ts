import { StatusCodes } from "http-status-codes";
import { lambdaMiddleware } from "../../../middleware/middy";
import { CustomAPIGatewayProxyEventHandler } from "../../../middleware/middy-type";
import { awsLambdaResponse } from "../../../middleware/responses/response";
import {
  noteEventBodyType,
  noteEventSchema,
} from "./event/req-validation-schema";
import { createNote } from "../../../db/controller/notes-controller";

/**
 * Handles AWS Lambda events to add a note for a particular user.
 *
 * @function lambdaHandler
 * @async
 * @param {object} event - The AWS Lambda event object.
 * @returns {Promise<object>} A promise that resolves with the AWS Lambda response object.
 */
const lambdaHandler: CustomAPIGatewayProxyEventHandler<
  noteEventBodyType
> = async (event) => {
  const data = await createNote(event.body);
  return awsLambdaResponse(StatusCodes.OK, { message: "record created" });
};

/**
 * AWS Lambda function handler with middleware.
 *
 * @function handler
 * @type {CustomAPIGatewayProxyEventHandler<never>}
 */
export const handler = lambdaMiddleware(lambdaHandler, {
  requestSchema: noteEventSchema,
});
