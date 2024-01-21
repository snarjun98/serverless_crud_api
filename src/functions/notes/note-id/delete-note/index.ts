import { StatusCodes } from "http-status-codes";
import { lambdaMiddleware } from "../../../../middleware/middy";
import { CustomAPIGatewayProxyEventHandler } from "../../../../middleware/middy-type";
import { awsLambdaResponse } from "../../../../middleware/responses/response";
import { deleteNote } from "../../../../db/controller/notes-controller";
import { deleteNoteEventSchema } from "./event/req-validation-schema";

/**
 * Handles AWS Lambda events to delete a note for a particular user.
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
  await deleteNote(userId, id);
  return awsLambdaResponse(StatusCodes.OK, {
    message: "note deleted successfully",
  });
};
/**
 * AWS Lambda function handler with middleware.
 *
 * @function handler
 * @type {CustomAPIGatewayProxyEventHandler<never>}
 */
export const handler = lambdaMiddleware(lambdaHandler, {
  requestSchema: deleteNoteEventSchema,
});
