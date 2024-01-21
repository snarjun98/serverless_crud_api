import { z } from "zod";

const deleteNoteEventPathSchema = z.object({
  noteId: z.string(),
});

const deleteNoteEventQuerySchema = z.object({
  userId: z.string(),
});

// for validation we need the wrapper
export const deleteNoteEventSchema = z.object({
  pathParameters: deleteNoteEventPathSchema,
  queryStringParameters: deleteNoteEventQuerySchema,
});
