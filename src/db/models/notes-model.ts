import { Table, Entity } from "dynamodb-toolbox";
import { DocumentClient } from "../client";
import crypto from "crypto";
// Instantiate a table
const NotesTable = new Table({
  // Specify table name (used by DynamoDB)
  name: process.env.NOTES_TABLE_NAME!,

  // Define partition and sort keys
  partitionKey: "userId",
  sortKey: "id",

  // Add the DocumentClient
  DocumentClient,
});

export const NoteEntity = new Entity({
  name: "Note",
  attributes: {
    userId: { partitionKey: true, type: "string" }, // flag as partitionKey
    id: { sortKey: true, type: "string", default: () => crypto.randomUUID() },
    title: "string",
    createdAt: { type: "string", default: () => new Date().toISOString() },
    content: "string",
    updatedAt: "string",
    updatedBy: "string",
    isDeleted: { type: "boolean", default: false },
  },

  table: NotesTable,
});
