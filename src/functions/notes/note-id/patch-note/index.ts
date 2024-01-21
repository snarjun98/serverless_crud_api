import { StatusCodes } from "http-status-codes";
import { lambdaMiddleware } from "../../../../middleware/middy";
import { CustomAPIGatewayProxyEventHandler } from "../../../../middleware/middy-type";
import { awsLambdaResponse } from "../../../../middleware/responses/response";

import { updateNote } from "../../../../db/controller/notes-controller";
import {
  patchNoteEventBodyType,
  patchNoteEventSchema,
} from "./event/req-validation-schema";

const lambdaHandler: CustomAPIGatewayProxyEventHandler<
  patchNoteEventBodyType
> = async (event) => {
  const id = event.pathParameters.noteId!;
  const { Attributes } = await updateNote({ ...event.body, id });
  return awsLambdaResponse(StatusCodes.OK, { data: Attributes });
};

export const handler = lambdaMiddleware(lambdaHandler, {
  requestSchema: patchNoteEventSchema,
});
