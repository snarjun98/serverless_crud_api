import { StatusCodes } from "http-status-codes";
import { lambdaMiddleware } from "../../../../middleware/middy";
import { CustomAPIGatewayProxyEventHandler } from "../../../../middleware/middy-type";
import { awsLambdaResponse } from "../../../../middleware/responses/response";

import { updateNote } from "../../../../db/controller/notes-controller";
import {
  patchNoteEventBodyType,
  patchNoteEventSchema,
} from "./event/req-validation-schema";

/**
 * Handles AWS Lambda events to update a note .
 *
 * @function lambdaHandler
 * @async
 * @param {object} event - The AWS Lambda event object.
 * @returns {Promise<object>} A promise that resolves with the AWS Lambda response object.
 */
const lambdaHandler: CustomAPIGatewayProxyEventHandler<
  patchNoteEventBodyType
> = async (event) => {
  const id = event.pathParameters.noteId!;
  const { Attributes } = await updateNote({ ...event.body, id });
  return awsLambdaResponse(StatusCodes.OK, { data: Attributes });
};

/**
 * AWS Lambda function handler with middleware.
 *
 * @function handler
 * @type {CustomAPIGatewayProxyEventHandler<never>}
 */
export const handler = lambdaMiddleware(lambdaHandler, {
  requestSchema: patchNoteEventSchema,
});
