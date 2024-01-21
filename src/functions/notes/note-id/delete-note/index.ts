import { StatusCodes } from "http-status-codes";
import { lambdaMiddleware } from "../../../../middleware/middy";
import { CustomAPIGatewayProxyEventHandler } from "../../../../middleware/middy-type";
import { awsLambdaResponse } from "../../../../middleware/responses/response";
import { deleteNote } from "../../../../db/controller/notes-controller";
import { deleteNoteEventSchema } from "./event/req-validation-schema";

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

export const handler = lambdaMiddleware(lambdaHandler, {
  requestSchema: deleteNoteEventSchema,
});
