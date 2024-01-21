import { StatusCodes } from "http-status-codes";
import { lambdaMiddleware } from "../../../middleware/middy";
import { CustomAPIGatewayProxyEventHandler } from "../../../middleware/middy-type";
import { awsLambdaResponse } from "../../../middleware/responses/response";
import {
  noteEventBodyType,
  noteEventSchema,
} from "./event/req-validation-schema";
import { createNote } from "../../../db/controller/notes-controller";

const lambdaHandler: CustomAPIGatewayProxyEventHandler<
  noteEventBodyType
> = async (event) => {
  const data = await createNote(event.body);
  return awsLambdaResponse(StatusCodes.OK, { message: "record created" });
};

export const handler = lambdaMiddleware(lambdaHandler, {
  requestSchema: noteEventSchema,
});
