/**
 * DynamoDB Document Client instance for interacting with DynamoDB using Document Conventions.
 * @type {import("@aws-sdk/lib-dynamodb").DynamoDBDocumentClient}
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * Options for marshalling DynamoDB data.
 * @type {object}
 * @property {boolean} convertEmptyValues - Whether to convert empty values.
 */
const marshallOptions = {
  // Specify your client options as usual
  convertEmptyValues: false,
};

/**
 * Configuration for translating DynamoDB data.
 * @type {object}
 * @property {object} marshallOptions - Options for marshalling DynamoDB data.
 */
const translateConfig = { marshallOptions };

/**
 * DynamoDB client configuration based on the execution environment.
 * @type {object}
 * @property {string} region - AWS region for the DynamoDB client.
 * @property {string} [endpoint] - Endpoint for the DynamoDB client (used in local development).
 * @property {string} [accessKeyId] - Access key ID for local development (if AWS credentials are not present).
 * @property {string} [secretAccessKey] - Secret access key for local development (if AWS credentials are not present).
 */
const config = process.env.IS_OFFLINE
  ? {
      region: "localhost",
      endpoint: `http://localhost:8000`,
      accessKeyId: "DEFAULT_ACCESS_KEY", // needed if you don't have AWS credentials at all in env
      secretAccessKey: "DEFAULT_SECRET", // needed if you don't have AWS credentials at all in env
    }
  : {
      region: process.env.AWS_REGION,
    };

/**
 * DynamoDB Document Client instance.
 * @type {import("@aws-sdk/lib-dynamodb").DynamoDBDocumentClient}
 */
export const DocumentClient = DynamoDBDocumentClient.from(
  new DynamoDBClient(config),
  translateConfig,
);
