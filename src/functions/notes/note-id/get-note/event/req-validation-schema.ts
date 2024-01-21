import { z } from "zod";

const getNoteEventPathSchema = z.object({
  noteId: z.string(),
});

const getNoteEventQuerySchema = z.object({
  userId: z.string(),
});

// for validation we need the wrapper
export const getNoteEventSchema = z.object({
  pathParameters: getNoteEventPathSchema,
  queryStringParameters: getNoteEventQuerySchema,
});
