import { StatusCodes } from "http-status-codes";
import { lambdaMiddleware } from "../../../../middleware/middy";
import { CustomAPIGatewayProxyEventHandler } from "../../../../middleware/middy-type";
import { awsLambdaResponse } from "../../../../middleware/responses/response";

import { getNote } from "../../../../db/controller/notes-controller";
import { getNoteEventSchema } from "./event/req-validation-schema";

const lambdaHandler: CustomAPIGatewayProxyEventHandler<never> = async (
  event,
) => {
  const id = event.pathParameters.noteId!;
  const userId = event.queryStringParameters.userId!;
  const { Item } = await getNote(userId, id);
  return awsLambdaResponse(StatusCodes.OK, { data: Item });
};

export const handler = lambdaMiddleware(lambdaHandler, {
  requestSchema: getNoteEventSchema,
});
