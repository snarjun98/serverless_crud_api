import { Table, Entity } from "dynamodb-toolbox";
import { DocumentClient } from "../client/index";
import crypto from "crypto";
// Instantiate a table
const UsersTable = new Table({
  // Specify table name (used by DynamoDB)
  name: process.env.USERS_TABLE_NAME!,

  // Define partition and sort keys
  partitionKey: "id",

  // Add the DocumentClient
  DocumentClient,
});

export const UserEntity = new Entity({
  name: "User",
  attributes: {
    id: {
      partitionKey: true,
      type: "string",
      default: () => crypto.randomUUID(),
    },
    createdAt: { type: "string", default: () => new Date().toISOString() },
    email: "string",
    name: "string",
    updatedAt: "string",
    isDeleted: { type: "boolean", default: false },
  },

  table: UsersTable,
});
