import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
// middy validator & http-json-body-parser gives us a parsed, validated body in the APIGatewayProxyEvent with type of <S>
// middy http-event-normalizer makes several fields on our ValidatedEvent NonNullable
export interface NormalizedValidatedEvent<S>
  extends Omit<APIGatewayProxyEvent, "body"> {
  queryStringParameters: NonNullable<
    APIGatewayProxyEvent["queryStringParameters"]
  >;
  pathParameters: NonNullable<APIGatewayProxyEvent["pathParameters"]>;
  body: S;
}

// APIGatewayProxyEventHandler for our NormalizedValidatedEvent
export type CustomAPIGatewayProxyEventHandler<S> = Handler<
  NormalizedValidatedEvent<S>,
  APIGatewayProxyResult
>;
